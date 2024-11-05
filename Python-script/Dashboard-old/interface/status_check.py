# interface/status_check.py
from typing import Dict, List, Any, Optional
import psutil
import logging
import json
from datetime import datetime
from pathlib import Path
import shutil
import os
from dataclasses import dataclass, asdict
import time

@dataclass
class SystemMetrics:
    """System performance metrics"""
    cpu_usage: float
    memory_usage: float
    disk_usage: float
    active_tasks: int
    pending_tasks: int
    last_backup: Optional[str]
    errors_24h: int
    system_uptime: float

@dataclass
class StorageMetrics:
    """Storage usage metrics"""
    total_space: float
    used_space: float
    free_space: float
    encoded_files: int
    response_files: int
    temp_files: int

class SystemStatus:
    """Monitors and reports system health"""
    
    def __init__(self, config: 'DashboardConfig', task_manager: 'TaskManager'):
        """
        Initialize SystemStatus
        Args:
            config: DashboardConfig instance
            task_manager: TaskManager instance
        """
        self._setup_logging()
        self.config = config
        self.task_manager = task_manager
        self.metrics_path = self.config.get_path('logs') / 'metrics'
        self.metrics_path.mkdir(exist_ok=True)
        self.logger.info("SystemStatus initialized successfully")
        
    def _setup_logging(self) -> None:
        """Configure logging for SystemStatus"""
        self.logger = logging.getLogger('SystemStatus')
        
    def check_system_health(self) -> Dict[str, Any]:
        """
        Perform comprehensive system health check
        Returns:
            Dict[str, Any]: System health status
        """
        try:
            system_metrics = self._collect_system_metrics()
            storage_metrics = self._collect_storage_metrics()
            
            health_status = {
                'timestamp': datetime.now().isoformat(),
                'system_metrics': asdict(system_metrics),
                'storage_metrics': asdict(storage_metrics),
                'status': self._evaluate_system_status(system_metrics, storage_metrics)
            }
            
            self._save_metrics(health_status)
            return health_status
            
        except Exception as e:
            self.logger.error(f"Error checking system health: {str(e)}")
            raise
            
    def _collect_system_metrics(self) -> SystemMetrics:
        """
        Collect system performance metrics
        Returns:
            SystemMetrics: Current system metrics
        """
        try:
            # Get CPU and memory usage
            cpu_usage = psutil.cpu_percent(interval=1)
            memory = psutil.virtual_memory()
            memory_usage = memory.percent
            
            # Get task statistics
            tasks = self.task_manager.list_tasks()
            active_tasks = len([t for t in tasks if t['status'] == 'in_progress'])
            pending_tasks = len([t for t in tasks if t['status'] == 'pending'])
            
            # Get last backup time
            backup_path = self.config.get_path('backups')
            last_backup = None
            if any(backup_path.iterdir()):
                latest_backup = max(backup_path.iterdir(), key=lambda p: p.stat().st_mtime)
                last_backup = datetime.fromtimestamp(latest_backup.stat().st_mtime).isoformat()
                
            # Count recent errors
            errors_24h = self._count_recent_errors()
            
            # System uptime
            uptime = time.time() - psutil.boot_time()
            
            return SystemMetrics(
                cpu_usage=cpu_usage,
                memory_usage=memory_usage,
                disk_usage=psutil.disk_usage('/').percent,
                active_tasks=active_tasks,
                pending_tasks=pending_tasks,
                last_backup=last_backup,
                errors_24h=errors_24h,
                system_uptime=uptime
            )
            
        except Exception as e:
            self.logger.error(f"Error collecting system metrics: {str(e)}")
            raise
            
    def _collect_storage_metrics(self) -> StorageMetrics:
        """
        Collect storage usage metrics
        Returns:
            StorageMetrics: Current storage metrics
        """
        try:
            encoded_path = self.config.get_path('encoded')
            response_path = self.config.get_path('responses')
            temp_path = self.config.get_path('temp')
            
            # Get storage usage
            disk_usage = shutil.disk_usage(str(self.config.base_path))
            
            return StorageMetrics(
                total_space=disk_usage.total / (1024 * 1024 * 1024),  # GB
                used_space=disk_usage.used / (1024 * 1024 * 1024),    # GB
                free_space=disk_usage.free / (1024 * 1024 * 1024),    # GB
                encoded_files=len(list(encoded_path.glob('*.enc'))),
                response_files=len(list(response_path.glob('*.enc'))),
                temp_files=len(list(temp_path.glob('*')))
            )
            
        except Exception as e:
            self.logger.error(f"Error collecting storage metrics: {str(e)}")
            raise
            
    def _evaluate_system_status(self, 
                              system_metrics: SystemMetrics,
                              storage_metrics: StorageMetrics) -> str:
        """
        Evaluate overall system status
        Returns:
            str: System status (healthy/warning/critical)
        """
        try:
            status = "healthy"
            warnings = []
            
            # Check CPU usage
            if system_metrics.cpu_usage > 80:
                warnings.append("High CPU usage")
                status = "warning"
            
            # Check memory usage
            if system_metrics.memory_usage > 85:
                warnings.append("High memory usage")
                status = "warning"
                
            # Check disk space
            if storage_metrics.free_space < 10:  # Less than 10GB free
                warnings.append("Low disk space")
                status = "warning"
                
            # Check error count
            if system_metrics.errors_24h > 100:
                warnings.append("High error rate")
                status = "critical"
                
            # Check backup status
            if not system_metrics.last_backup:
                warnings.append("No backup found")
                status = "warning"
            elif (datetime.now() - datetime.fromisoformat(system_metrics.last_backup)).days > 7:
                warnings.append("Backup is outdated")
                status = "warning"
                
            return {
                'level': status,
                'warnings': warnings if warnings else None
            }
            
        except Exception as e:
            self.logger.error(f"Error evaluating system status: {str(e)}")
            raise
            
    def _count_recent_errors(self) -> int:
        """
        Count errors in the last 24 hours
        Returns:
            int: Number of errors
        """
        try:
            log_path = self.config.get_path('logs')
            current_log = log_path / f"dashboard_{datetime.now().strftime('%Y%m%d')}.log"
            
            if not current_log.exists():
                return 0
                
            error_count = 0
            with current_log.open() as f:
                for line in f:
                    if 'ERROR' in line:
                        error_count += 1
                        
            return error_count
            
        except Exception as e:
            self.logger.error(f"Error counting recent errors: {str(e)}")
            return 0
            
    def _save_metrics(self, metrics: Dict[str, Any]) -> None:
        """
        Save metrics to file
        Args:
            metrics: Metrics data to save
        """
        try:
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            metrics_file = self.metrics_path / f"metrics_{timestamp}.json"
            
            with metrics_file.open('w') as f:
                json.dump(metrics, f, indent=2)
                
            # Clean up old metrics files
            self._cleanup_old_metrics()
            
        except Exception as e:
            self.logger.error(f"Error saving metrics: {str(e)}")
            raise
            
    def _cleanup_old_metrics(self, max_age_days: int = 7) -> None:
        """
        Clean up old metrics files
        Args:
            max_age_days: Maximum age of metrics files to keep
        """
        try:
            current_time = datetime.now()
            for metrics_file in self.metrics_path.glob('metrics_*.json'):
                file_age = current_time - datetime.fromtimestamp(metrics_file.stat().st_mtime)
                if file_age.days > max_age_days:
                    metrics_file.unlink()
                    
        except Exception as e:
            self.logger.error(f"Error cleaning up old metrics: {str(e)}")