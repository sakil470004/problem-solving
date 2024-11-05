# examples/status_check_example.py
import sys
from pathlib import Path
import json
from datetime import datetime

# Add the parent directory to sys.path
sys.path.insert(0, str(Path(__file__).parent.parent))

from interface.status_check import SystemStatus
from interface.config import DashboardConfig
from utils.task_manager import TaskManager
from utils.encoder import SecureEncoder

def display_metrics(metrics: dict) -> None:
    """Display metrics in a readable format"""
    print("\n=== System Health Report ===")
    print(f"Timestamp: {metrics['timestamp']}")
    
    print("\nSystem Metrics:")
    sys_metrics = metrics['system_metrics']
    print(f"CPU Usage: {sys_metrics['cpu_usage']:.1f}%")
    print(f"Memory Usage: {sys_metrics['memory_usage']:.1f}%")
    print(f"Disk Usage: {sys_metrics['disk_usage']:.1f}%")
    print(f"Active Tasks: {sys_metrics['active_tasks']}")
    print(f"Pending Tasks: {sys_metrics['pending_tasks']}")
    print(f"Errors (24h): {sys_metrics['errors_24h']}")
    print(f"System Uptime: {sys_metrics['system_uptime']/3600:.1f} hours")
    
    print("\nStorage Metrics:")
    storage = metrics['storage_metrics']
    print(f"Total Space: {storage['total_space']:.1f} GB")
    print(f"Used Space: {storage['used_space']:.1f} GB")
    print(f"Free Space: {storage['free_space']:.1f} GB")
    print(f"Encoded Files: {storage['encoded_files']}")
    print(f"Response Files: {storage['response_files']}")
    print(f"Temporary Files: {storage['temp_files']}")
    
    print("\nSystem Status:")
    status = metrics['status']
    print(f"Level: {status['level'].upper()}")
    if status['warnings']:
        print("Warnings:")
        for warning in status['warnings']:
            print(f"- {warning}")

def main():
    """Example usage of SystemStatus"""
    try:
        # Initialize components
        config = DashboardConfig()
        encoder = SecureEncoder(encryption_key="your_secure_key")
        task_manager = TaskManager(encoder, config)
        system_status = SystemStatus(config, task_manager)
        
        print("System Status Monitor Example")
        
        # Perform system health check
        health_metrics = system_status.check_system_health()
        
        # Display metrics
        display_metrics(health_metrics)
        
        # Show where metrics are saved
        print(f"\nDetailed metrics saved to: {config.get_path('logs')}/metrics/")
        
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    main()