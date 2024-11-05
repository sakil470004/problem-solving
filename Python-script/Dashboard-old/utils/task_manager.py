# utils/task_manager.py
from datetime import datetime
from typing import Dict, List, Optional, Union
import json
from pathlib import Path
import logging
import uuid
from enum import Enum

class TaskPriority(Enum):
    """Task priority levels"""
    LOW = 1
    MEDIUM = 2
    HIGH = 3
    URGENT = 4

class TaskCategory(Enum):
    """Task categories"""
    PERSONAL = "personal"
    BUSINESS = "business"
    URGENT = "urgent"
    GENERAL = "general"

class TaskStatus(Enum):
    """Task status states"""
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    ARCHIVED = "archived"
    DELETED = "deleted"

class TaskManager:
    """Manages task creation, storage, and retrieval"""
    
    def __init__(self, encoder: 'SecureEncoder', config: 'DashboardConfig'):
        """
        Initialize TaskManager
        Args:
            encoder: SecureEncoder instance for data security
            config: DashboardConfig instance for system settings
        """
        self._setup_logging()
        self.encoder = encoder
        self.config = config
        self.task_path = self.config.get_path('encoded')
        self.logger.info("TaskManager initialized successfully")
        
    def _setup_logging(self) -> None:
        """Configure logging for TaskManager"""
        self.logger = logging.getLogger('TaskManager')
        
    def create_task(self, 
                   title: str,
                   category: Union[TaskCategory, str],
                   priority: Union[TaskPriority, int],
                   description: str,
                   due_date: Optional[str] = None) -> Dict:
        """
        Create a new task
        Args:
            title: Task title
            category: Task category
            priority: Task priority level
            description: Task description
            due_date: Optional due date (ISO format)
        Returns:
            Dict: Created task data
        """
        try:
            # Convert string inputs to enums if necessary
            if isinstance(category, str):
                category = TaskCategory(category.lower())
            if isinstance(priority, int):
                priority = TaskPriority(priority)
                
            # Create task structure
            task = {
                'id': str(uuid.uuid4()),
                'title': title,
                'category': category.value,
                'priority': priority.value,
                'description': description,
                'status': TaskStatus.PENDING.value,
                'due_date': due_date,
                'created_at': datetime.now().isoformat(),
                'modified_at': datetime.now().isoformat(),
                'completed_at': None
            }
            
            # Save task
            self._save_task(task)
            self.logger.info(f"Created task: {task['id']}")
            return task
            
        except Exception as e:
            self.logger.error(f"Error creating task: {str(e)}")
            raise
            
    def update_task(self, task_id: str, updates: Dict) -> Dict:
        """
        Update existing task
        Args:
            task_id: Task identifier
            updates: Dictionary of updates to apply
        Returns:
            Dict: Updated task data
        """
        try:
            task = self.get_task(task_id)
            if not task:
                raise ValueError(f"Task not found: {task_id}")
                
            # Update fields
            for key, value in updates.items():
                if key in task:
                    task[key] = value
                    
            task['modified_at'] = datetime.now().isoformat()
            
            # Handle status changes
            if 'status' in updates:
                if updates['status'] == TaskStatus.COMPLETED.value:
                    task['completed_at'] = datetime.now().isoformat()
                    
            # Save updated task
            self._save_task(task)
            self.logger.info(f"Updated task: {task_id}")
            return task
            
        except Exception as e:
            self.logger.error(f"Error updating task: {str(e)}")
            raise
            
    def get_task(self, task_id: str) -> Optional[Dict]:
        """
        Retrieve task by ID
        Args:
            task_id: Task identifier
        Returns:
            Optional[Dict]: Task data if found
        """
        try:
            task_file = self.task_path / f"{task_id}.enc"
            if not task_file.exists():
                return None
                
            return self.encoder.secure_file_read(task_file)
            
        except Exception as e:
            self.logger.error(f"Error retrieving task: {str(e)}")
            raise
            
    def list_tasks(self, 
                   status: Optional[Union[TaskStatus, str]] = None,
                   category: Optional[Union[TaskCategory, str]] = None,
                   priority: Optional[Union[TaskPriority, int]] = None) -> List[Dict]:
        """
        List tasks with optional filters
        Args:
            status: Filter by status
            category: Filter by category
            priority: Filter by priority
        Returns:
            List[Dict]: List of matching tasks
        """
        try:
            tasks = []
            for task_file in self.task_path.glob("*.enc"):
                task = self.encoder.secure_file_read(task_file)
                
                # Apply filters
                if status and task['status'] != getattr(status, 'value', status):
                    continue
                if category and task['category'] != getattr(category, 'value', category):
                    continue
                if priority and task['priority'] != getattr(priority, 'value', priority):
                    continue
                    
                tasks.append(task)
                
            return sorted(tasks, key=lambda x: (
                x['priority'],
                x['created_at']
            ), reverse=True)
            
        except Exception as e:
            self.logger.error(f"Error listing tasks: {str(e)}")
            raise
            
    def delete_task(self, task_id: str, permanent: bool = False) -> bool:
        """
        Delete task
        Args:
            task_id: Task identifier
            permanent: If True, permanently delete; if False, mark as deleted
        Returns:
            bool: True if successful
        """
        try:
            if permanent:
                task_file = self.task_path / f"{task_id}.enc"
                if task_file.exists():
                    task_file.unlink()
                    self.logger.info(f"Permanently deleted task: {task_id}")
            else:
                task = self.get_task(task_id)
                if task:
                    task['status'] = TaskStatus.DELETED.value
                    task['modified_at'] = datetime.now().isoformat()
                    self._save_task(task)
                    self.logger.info(f"Marked task as deleted: {task_id}")
                    
            return True
            
        except Exception as e:
            self.logger.error(f"Error deleting task: {str(e)}")
            raise
            
    def _save_task(self, task: Dict) -> None:
        """
        Save task to storage
        Args:
            task: Task data to save
        """
        try:
            task_file = self.task_path / f"{task['id']}.enc"
            self.encoder.secure_file_write(task, task_file)
            
        except Exception as e:
            self.logger.error(f"Error saving task: {str(e)}")
            raise
            
    def cleanup_deleted_tasks(self, days: int = 30) -> int:
        """
        Permanently remove old deleted tasks
        Args:
            days: Number of days to keep deleted tasks
        Returns:
            int: Number of tasks cleaned up
        """
        try:
            cleanup_count = 0
            for task_file in self.task_path.glob("*.enc"):
                task = self.encoder.secure_file_read(task_file)
                
                if task['status'] == TaskStatus.DELETED.value:
                    deleted_date = datetime.fromisoformat(task['modified_at'])
                    age = (datetime.now() - deleted_date).days
                    
                    if age > days:
                        task_file.unlink()
                        cleanup_count += 1
                        
            self.logger.info(f"Cleaned up {cleanup_count} old deleted tasks")
            return cleanup_count
            
        except Exception as e:
            self.logger.error(f"Error during task cleanup: {str(e)}")
            raise