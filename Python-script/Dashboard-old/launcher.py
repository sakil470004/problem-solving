# launcher.py
import os
import sys
from pathlib import Path
import logging
from typing import Optional, Dict, Any
import argparse
import json
from datetime import datetime
import traceback
from colorama import init, Fore, Style

class DashboardLauncher:
    """Main system launcher and initializer"""
    
    def __init__(self):
        """Initialize the launcher"""
        self.base_path = Path(os.path.dirname(os.path.abspath(__file__)))
        self._setup_logging()
        self.components = {}
        self.logger.info("Launcher initialized")
        
    def _setup_logging(self) -> None:
        """Configure system-wide logging"""
        try:
            log_dir = self.base_path / 'logs'
            log_dir.mkdir(exist_ok=True)
            
            log_file = log_dir / f"dashboard_{datetime.now().strftime('%Y%m%d')}.log"
            
            logging.basicConfig(
                level=logging.INFO,
                format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                handlers=[
                    logging.FileHandler(log_file),
                    logging.StreamHandler()
                ]
            )
            
            self.logger = logging.getLogger('DashboardLauncher')
            
        except Exception as e:
            print(f"Error setting up logging: {str(e)}")
            sys.exit(1)
            
    def initialize_system(self, config_path: Optional[str] = None) -> bool:
        """
        Initialize all system components
        Args:
            config_path: Optional path to config file
        Returns:
            bool: True if initialization successful
        """
        try:
            self.logger.info("Starting system initialization")
            
            # Import components
            from interface.config import DashboardConfig
            from utils.encoder import SecureEncoder
            from utils.task_manager import TaskManager
            from interface.claude_interface import ClaudeInterface
            from interface.status_check import SystemStatus
            from interface.quick_menu import QuickMenu
            
            # Initialize components
            self.components['config'] = DashboardConfig(config_path or '.env')
            self.components['encoder'] = SecureEncoder(
                encryption_key=self.components['config'].encryption_key
            )
            
            self.components['task_manager'] = TaskManager(
                encoder=self.components['encoder'],
                config=self.components['config']
            )
            
            self.components['claude_interface'] = ClaudeInterface(
                config=self.components['config'],
                encoder=self.components['encoder']
            )
            
            self.components['system_status'] = SystemStatus(
                config=self.components['config'],
                task_manager=self.components['task_manager']
            )
            
            self.components['menu'] = QuickMenu(
                config=self.components['config'],
                task_manager=self.components['task_manager'],
                claude_interface=self.components['claude_interface'],
                system_status=self.components['system_status']
            )
            
            # Verify system status
            if not self._verify_system():
                raise RuntimeError("System verification failed")
                
            self.logger.info("System initialization completed successfully")
            return True
            
        except Exception as e:
            self.logger.error(f"Error during system initialization: {str(e)}")
            self._handle_startup_error(e)
            return False
            
    def _verify_system(self) -> bool:
        """
        Verify system components and configuration
        Returns:
            bool: True if system verification successful
        """
        try:
            # Check component initialization
            required_components = [
                'config', 'encoder', 'task_manager',
                'claude_interface', 'system_status', 'menu'
            ]
            
            for component in required_components:
                if component not in self.components:
                    self.logger.error(f"Missing required component: {component}")
                    return False
                    
            # Check system paths
            paths = self.components['config'].paths
            for path_name, path in paths.items():
                if not path.exists():
                    self.logger.error(f"Required path does not exist: {path_name}")
                    return False
                    
            # Check system health
            health_status = self.components['system_status'].check_system_health()
            if health_status['status']['level'] == 'critical':
                self.logger.error("System health check failed")
                return False
                
            return True
            
        except Exception as e:
            self.logger.error(f"Error during system verification: {str(e)}")
            return False
            
    def _handle_startup_error(self, error: Exception) -> None:
        """
        Handle system startup errors
        Args:
            error: Exception that occurred
        """
        error_info = {
            'timestamp': datetime.now().isoformat(),
            'error_type': type(error).__name__,
            'error_message': str(error),
            'traceback': traceback.format_exc()
        }
        
        # Save error information
        error_file = self.base_path / 'logs' / f"startup_error_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with error_file.open('w') as f:
            json.dump(error_info, f, indent=2)
            
        # Display error message
        print(f"\n{Fore.RED}Error during system startup:{Style.RESET_ALL}")
        print(f"Type: {error_info['error_type']}")
        print(f"Message: {error_info['error_message']}")
        print(f"\nError details saved to: {error_file}")
        
    def start(self) -> None:
        """Start the dashboard system"""
        if not self.initialize_system():
            sys.exit(1)
            
        try:
            # Display startup banner
            self._display_banner()
            
            # Start the menu interface
            self.components['menu'].start()
            
        except KeyboardInterrupt:
            self.logger.info("System shutdown initiated by user")
            self._handle_shutdown()
        except Exception as e:
            self.logger.error(f"Error during system operation: {str(e)}")
            self._handle_shutdown(error=e)
            
    def _display_banner(self) -> None:
        """Display system startup banner"""
        banner = f"""
{Fore.GREEN}==============================
    Dashboard System v1.0
=============================={Style.RESET_ALL}
Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
Status: {Fore.GREEN}Running{Style.RESET_ALL}
"""
        print(banner)
        
    def _handle_shutdown(self, error: Optional[Exception] = None) -> None:
        """
        Handle system shutdown
        Args:
            error: Optional exception that caused shutdown
        """
        print(f"\n{Fore.YELLOW}Shutting down Dashboard System...{Style.RESET_ALL}")
        
        try:
            # Perform cleanup
            self._cleanup()
            
            if error:
                print(f"\n{Fore.RED}System shutdown due to error:{Style.RESET_ALL}")
                print(f"Error: {str(error)}")
            else:
                print(f"\n{Fore.GREEN}System shutdown completed successfully{Style.RESET_ALL}")
                
        except Exception as e:
            print(f"\n{Fore.RED}Error during shutdown: {str(e)}{Style.RESET_ALL}")
        finally:
            sys.exit(1 if error else 0)
            
    def _cleanup(self) -> None:
        """Perform system cleanup before shutdown"""
        try:
            # Clean temporary files
            temp_path = self.components['config'].get_path('temp')
            for temp_file in temp_path.glob('*'):
                temp_file.unlink()
                
            self.logger.info("System cleanup completed")
            
        except Exception as e:
            self.logger.error(f"Error during cleanup: {str(e)}")

def parse_arguments():
    """Parse command line arguments"""
    parser = argparse.ArgumentParser(description='Dashboard System Launcher')
    parser.add_argument('--config', type=str, help='Path to configuration file')
    parser.add_argument('--debug', action='store_true', help='Enable debug mode')
    return parser.parse_args()

def main():
    """Main entry point"""
    # Initialize colorama for cross-platform color support
    init()
    
    # Parse command line arguments
    args = parse_arguments()
    
    # Set debug mode if requested
    if args.debug:
        logging.getLogger().setLevel(logging.DEBUG)
        
    # Create and start launcher
    launcher = DashboardLauncher()
    launcher.start()

if __name__ == "__main__":
    main()