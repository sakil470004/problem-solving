# interface/config.py
from pathlib import Path
from typing import Dict, Any
import json
import os
from dotenv import load_dotenv
import logging
from datetime import datetime

class DashboardConfig:
    """Configuration management for the Dashboard system"""
    
    def __init__(self, config_path: str = ".env"):
        """
        Initialize dashboard configuration
        Args:
            config_path (str): Path to .env file
        """
        # Setup logging first
        self._setup_logging()
        
        # Initialize paths and configuration
        self.base_path = Path("C:/Projects/Dashboard")
        self.load_env(config_path)
        self.initialize_paths()
        
        self.logger.info("Dashboard configuration initialized successfully")
        
    def _setup_logging(self) -> None:
        """Configure logging system"""
        log_dir = Path("C:/Projects/Dashboard/logs")
        log_dir.mkdir(parents=True, exist_ok=True)
        
        log_file = log_dir / f"dashboard_{datetime.now().strftime('%Y%m%d')}.log"
        
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(log_file),
                logging.StreamHandler()
            ]
        )
        
        self.logger = logging.getLogger('DashboardConfig')
        
    def load_env(self, config_path: str) -> None:
        """
        Load environment variables
        Args:
            config_path (str): Path to .env file
        """
        try:
            load_dotenv(config_path)
            
            # Required environment variables
            self.claude_key = os.getenv("CLAUDE_API_KEY")
            self.encryption_key = os.getenv("ENCRYPTION_KEY")
            
            # Optional environment variables with defaults
            self.debug_mode = os.getenv("DEBUG_MODE", "False").lower() == "true"
            self.max_storage_days = int(os.getenv("MAX_STORAGE_DAYS", "30"))
            
            if not self.claude_key or not self.encryption_key:
                raise ValueError("Missing required environment variables")
                
            self.logger.info("Environment variables loaded successfully")
            
        except Exception as e:
            self.logger.error(f"Error loading environment variables: {str(e)}")
            raise
            
    def initialize_paths(self) -> None:
        """Initialize system directory structure"""
        try:
            self.paths = {
                "encoded": self.base_path / "data/encoded",
                "responses": self.base_path / "data/responses",
                "temp": self.base_path / "data/temp",
                "logs": self.base_path / "logs",
                "backups": self.base_path / "data/backups"
            }
            
            # Create directories if they don't exist
            for path_name, path in self.paths.items():
                path.mkdir(parents=True, exist_ok=True)
                self.logger.debug(f"Initialized path: {path_name} at {path}")
                
            self.logger.info("All system paths initialized successfully")
            
        except Exception as e:
            self.logger.error(f"Error initializing paths: {str(e)}")
            raise
            
    def get_path(self, path_type: str) -> Path:
        """
        Get system path by type
        Args:
            path_type (str): Type of path to retrieve
        Returns:
            Path: System path
        """
        if path_type not in self.paths:
            self.logger.error(f"Invalid path type requested: {path_type}")
            raise ValueError(f"Invalid path type: {path_type}")
        return self.paths[path_type]
        
    def validate_system(self) -> bool:
        """
        Validate system configuration and paths
        Returns:
            bool: True if system is properly configured
        """
        try:
            # Check environment variables
            if not self.claude_key or not self.encryption_key:
                self.logger.error("Missing required environment variables")
                return False
                
            # Verify all paths exist and are writable
            for path_name, path in self.paths.items():
                if not path.exists():
                    self.logger.error(f"Path does not exist: {path_name}")
                    return False
                    
                # Test write access by creating and removing a test file
                test_file = path / ".test_access"
                try:
                    test_file.touch()
                    test_file.unlink()
                except Exception as e:
                    self.logger.error(f"Path not writable: {path_name}")
                    return False
                    
            self.logger.info("System validation completed successfully")
            return True
            
        except Exception as e:
            self.logger.error(f"Error during system validation: {str(e)}")
            return False