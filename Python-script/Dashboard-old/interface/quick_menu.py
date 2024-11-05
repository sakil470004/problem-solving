# interface/quick_menu.py
from typing import Dict, List, Any, Optional, Callable
import logging
from datetime import datetime
import os
import sys
from enum import Enum
import time
from colorama import init, Fore, Style
from simple_term_menu import TerminalMenu

class MenuOption(Enum):
    """Menu options for the interface"""
    TASKS = "Task Management"
    SYSTEM = "System Status"
    CLAUDE = "Claude Interaction"
    BACKUP = "Backup & Maintenance"
    EXIT = "Exit"

class TaskOption(Enum):
    """Task management options"""
    CREATE = "Create New Task"
    LIST = "List Tasks"
    UPDATE = "Update Task"
    DELETE = "Delete Task"
    BACK = "Back to Main Menu"

class QuickMenu:
    """Command-line interface for system interaction"""
    
    def __init__(self, 
                 config: 'DashboardConfig',
                 task_manager: 'TaskManager',
                 claude_interface: 'ClaudeInterface',
                 system_status: 'SystemStatus'):
        """
        Initialize QuickMenu
        Args:
            config: DashboardConfig instance
            task_manager: TaskManager instance
            claude_interface: ClaudeInterface instance
            system_status: SystemStatus instance
        """
        init()  # Initialize colorama
        self._setup_logging()
        self.config = config
        self.task_manager = task_manager
        self.claude_interface = claude_interface
        self.system_status = system_status
        self.logger.info("QuickMenu initialized successfully")
        
    def _setup_logging(self) -> None:
        """Configure logging for QuickMenu"""
        self.logger = logging.getLogger('QuickMenu')
        
    def start(self) -> None:
        """Start the menu interface"""
        try:
            while True:
                self._clear_screen()
                self._print_header()
                
                # Create main menu
                options = [option.value for option in MenuOption]
                terminal_menu = TerminalMenu(
                    options,
                    title="Dashboard Main Menu",
                    menu_cursor="→ ",
                    menu_cursor_style=("fg_green", "bold"),
                    menu_highlight_style=("bg_green", "fg_black")
                )
                
                menu_index = terminal_menu.show()
                if menu_index is None or options[menu_index] == MenuOption.EXIT.value:
                    break
                    
                self._handle_menu_option(MenuOption(options[menu_index]))
                
        except KeyboardInterrupt:
            self._handle_exit()
        except Exception as e:
            self.logger.error(f"Error in menu interface: {str(e)}")
            self._print_error(f"An error occurred: {str(e)}")
            input("\nPress Enter to continue...")
            
    def _handle_menu_option(self, option: MenuOption) -> None:
        """
        Handle main menu option selection
        Args:
            option: Selected menu option
        """
        handlers = {
            MenuOption.TASKS: self._show_task_menu,
            MenuOption.SYSTEM: self._show_system_status,
            MenuOption.CLAUDE: self._show_claude_interface,
            MenuOption.BACKUP: self._show_backup_menu,
            MenuOption.EXIT: self._handle_exit
        }
        
        handler = handlers.get(option)
        if handler:
            handler()
            
    def _show_task_menu(self) -> None:
        """Display task management menu"""
        while True:
            self._clear_screen()
            self._print_header("Task Management")
            
            options = [option.value for option in TaskOption]
            terminal_menu = TerminalMenu(
                options,
                title="Task Management Menu",
                menu_cursor="→ ",
                menu_cursor_style=("fg_blue", "bold"),
                menu_highlight_style=("bg_blue", "fg_black")
            )
            
            menu_index = terminal_menu.show()
            if menu_index is None or options[menu_index] == TaskOption.BACK.value:
                break
                
            self._handle_task_option(TaskOption(options[menu_index]))
            
    def _handle_task_option(self, option: TaskOption) -> None:
        """
        Handle task menu option selection
        Args:
            option: Selected task option
        """
        handlers = {
            TaskOption.CREATE: self._create_task,
            TaskOption.LIST: self._list_tasks,
            TaskOption.UPDATE: self._update_task,
            TaskOption.DELETE: self._delete_task
        }
        
        handler = handlers.get(option)
        if handler:
            handler()
            input("\nPress Enter to continue...")
            
    def _create_task(self) -> None:
        """Handle task creation"""
        try:
            self._print_header("Create New Task")
            
            # Get task details
            title = input(f"{Fore.CYAN}Title: {Style.RESET_ALL}")
            description = input(f"{Fore.CYAN}Description: {Style.RESET_ALL}")
            
            # Select category
            categories = [cat.value for cat in TaskCategory]
            category_menu = TerminalMenu(
                categories,
                title="Select Category"
            )
            category_index = category_menu.show()
            if category_index is None:
                return
                
            # Select priority
            priorities = [f"{p.name} ({p.value})" for p in TaskPriority]
            priority_menu = TerminalMenu(
                priorities,
                title="Select Priority"
            )
            priority_index = priority_menu.show()
            if priority_index is None:
                return
                
            # Create task
            task = self.task_manager.create_task(
                title=title,
                description=description,
                category=TaskCategory(categories[category_index]),
                priority=TaskPriority(priority_index + 1)
            )
            
            self._print_success(f"Task created successfully: {task['id']}")
            
        except Exception as e:
            self._print_error(f"Error creating task: {str(e)}")
            
    def _list_tasks(self) -> None:
        """Display task list"""
        try:
            self._print_header("Task List")
            
            tasks = self.task_manager.list_tasks()
            if not tasks:
                print(f"{Fore.YELLOW}No tasks found.{Style.RESET_ALL}")
                return
                
            for task in tasks:
                status_color = {
                    'pending': Fore.YELLOW,
                    'in_progress': Fore.BLUE,
                    'completed': Fore.GREEN,
                    'deleted': Fore.RED
                }.get(task['status'], '')
                
                print(f"\n{Fore.CYAN}ID: {Style.RESET_ALL}{task['id']}")
                print(f"{Fore.CYAN}Title: {Style.RESET_ALL}{task['title']}")
                print(f"{Fore.CYAN}Status: {status_color}{task['status']}{Style.RESET_ALL}")
                print(f"{Fore.CYAN}Priority: {Style.RESET_ALL}{task['priority']}")
                print("-" * 50)
                
        except Exception as e:
            self._print_error(f"Error listing tasks: {str(e)}")
            
    def _show_system_status(self) -> None:
        """Display system status"""
        try:
            self._print_header("System Status")
            
            health_metrics = self.system_status.check_system_health()
            system_metrics = health_metrics['system_metrics']
            storage_metrics = health_metrics['storage_metrics']
            status = health_metrics['status']
            
            # Display metrics with colors based on thresholds
            print(f"\n{Fore.CYAN}System Metrics:{Style.RESET_ALL}")
            self._print_metric("CPU Usage", f"{system_metrics['cpu_usage']}%", 80)
            self._print_metric("Memory Usage", f"{system_metrics['memory_usage']}%", 85)
            self._print_metric("Disk Usage", f"{system_metrics['disk_usage']}%", 90)
            
            print(f"\n{Fore.CYAN}Storage Metrics:{Style.RESET_ALL}")
            print(f"Total Space: {storage_metrics['total_space']:.1f} GB")
            print(f"Free Space: {storage_metrics['free_space']:.1f} GB")
            
            # Display warnings if any
            if status['warnings']:
                print(f"\n{Fore.YELLOW}Warnings:{Style.RESET_ALL}")
                for warning in status['warnings']:
                    print(f"- {warning}")
                    
            input("\nPress Enter to continue...")
            
        except Exception as e:
            self._print_error(f"Error displaying system status: {str(e)}")
            
    def _show_claude_interface(self) -> None:
        """Display Claude interaction interface"""
        try:
            self._print_header("Claude Interaction")
            
            print(f"{Fore.CYAN}Enter your message (or 'exit' to return):{Style.RESET_ALL}")
            while True:
                message = input("\n> ")
                if message.lower() == 'exit':
                    break
                    
                # Send message to Claude
                response = self.claude_interface.send_secure_message(
                    content={"message": message}
                )
                
                print(f"\n{Fore.GREEN}Claude:{Style.RESET_ALL} {response['content']}")
                
        except Exception as e:
            self._print_error(f"Error in Claude interaction: {str(e)}")
            
    def _show_backup_menu(self) -> None:
        """Display backup and maintenance menu"""
        try:
            self._print_header("Backup & Maintenance")
            
            options = [
                "Create Backup",
                "Restore from Backup",
                "Clean Temporary Files",
                "View Backup History",
                "Back to Main Menu"
            ]
            
            terminal_menu = TerminalMenu(
                options,
                title="Backup & Maintenance Menu"
            )
            
            menu_index = terminal_menu.show()
            if menu_index is None or options[menu_index] == "Back to Main Menu":
                return
                
            # Handle backup options
            # (Implementation details would go here)
            self._print_info("Backup functionality to be implemented")
            input("\nPress Enter to continue...")
            
        except Exception as e:
            self._print_error(f"Error in backup menu: {str(e)}")
            
    def _print_header(self, subtitle: Optional[str] = None) -> None:
        """Print menu header"""
        self._clear_screen()
        print(f"{Fore.GREEN}=== Dashboard System ==={Style.RESET_ALL}")
        if subtitle:
            print(f"{Fore.CYAN}{subtitle}{Style.RESET_ALL}")
        print()
        
    def _print_metric(self, name: str, value: str, threshold: float) -> None:
        """Print metric with color based on threshold"""
        try:
            value_num = float(value.rstrip('%'))
            color = Fore.GREEN if value_num < threshold else Fore.RED
            print(f"{name}: {color}{value}{Style.RESET_ALL}")
        except ValueError:
            print(f"{name}: {value}")
            
    def _clear_screen(self) -> None:
        """Clear terminal screen"""
        os.system('cls' if os.name == 'nt' else 'clear')
        
    def _print_success(self, message: str) -> None:
        """Print success message"""
        print(f"{Fore.GREEN}{message}{Style.RESET_ALL}")
        
    def _print_error(self, message: str) -> None:
        """Print error message"""
        print(f"{Fore.RED}{message}{Style.RESET_ALL}")
        
    def _print_info(self, message: str) -> None:
        """Print info message"""
        print(f"{Fore.CYAN}{message}{Style.RESET_ALL}")
        
    def _handle_exit(self) -> None:
        """Handle system exit"""
        self._print_info("\nExiting Dashboard System...")
        time.sleep(1)
        sys.exit(0)