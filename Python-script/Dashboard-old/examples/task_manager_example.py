# examples/task_manager_example.py
import sys
from pathlib import Path
from datetime import datetime, timedelta

# Add the parent directory to sys.path to allow imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from utils.task_manager import TaskManager, TaskCategory, TaskPriority, TaskStatus
from utils.encoder import SecureEncoder
from interface.config import DashboardConfig

def main():
    """Example usage of TaskManager"""
    try:
        # Initialize required components
        config = DashboardConfig()
        encoder = SecureEncoder(encryption_key="your_secure_key")
        task_manager = TaskManager(encoder, config)
        
        print("Task Management System Example\n")
        
        # 1. Create different types of tasks
        print("1. Creating tasks...")
        
        # Business task
        business_task = task_manager.create_task(
            title="Quarterly Review Meeting",
            category=TaskCategory.BUSINESS,
            priority=TaskPriority.HIGH,
            description="Prepare and present Q1 results",
            due_date=(datetime.now() + timedelta(days=7)).isoformat()
        )
        print(f"Created business task: {business_task['title']}")
        
        # Personal task
        personal_task = task_manager.create_task(
            title="Gym Session",
            category=TaskCategory.PERSONAL,
            priority=TaskPriority.MEDIUM,
            description="Weekly workout routine",
            due_date=datetime.now().isoformat()
        )
        print(f"Created personal task: {personal_task['title']}")
        
        # Urgent task
        urgent_task = task_manager.create_task(
            title="Client Proposal",
            category=TaskCategory.URGENT,
            priority=TaskPriority.URGENT,
            description="Finish and send client proposal",
            due_date=(datetime.now() + timedelta(hours=4)).isoformat()
        )
        print(f"Created urgent task: {urgent_task['title']}\n")
        
        # 2. List all tasks
        print("2. Listing all tasks...")
        all_tasks = task_manager.list_tasks()
        for task in all_tasks:
            print(f"- {task['title']} (Priority: {task['priority']}, Category: {task['category']})")
        print()
        
        # 3. Update task status
        print("3. Updating task status...")
        updated_task = task_manager.update_task(
            personal_task['id'],
            {'status': TaskStatus.COMPLETED.value}
        )
        print(f"Updated task '{updated_task['title']}' to status: {updated_task['status']}\n")
        
        # 4. Filter tasks
        print("4. Filtering high priority tasks...")
        high_priority = task_manager.list_tasks(priority=TaskPriority.HIGH)
        for task in high_priority:
            print(f"- {task['title']} (Priority: {task['priority']})")
        print()
        
        # 5. Delete task
        print("5. Deleting task...")
        task_manager.delete_task(business_task['id'], permanent=False)
        print(f"Marked task '{business_task['title']}' as deleted")
        
        # 6. List remaining active tasks
        print("\n6. Listing remaining active tasks...")
        active_tasks = task_manager.list_tasks(status=TaskStatus.PENDING)
        for task in active_tasks:
            print(f"- {task['title']} (Status: {task['status']})")
        
        print("\nTask management operations completed successfully!")
        
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    main()