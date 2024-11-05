# tests/test_task_manager.py
import pytest
from datetime import datetime, timedelta
from pathlib import Path
from utils.task_manager import (
    TaskManager,
    TaskPriority,
    TaskCategory,
    TaskStatus
)

@pytest.fixture
def task_manager(tmp_path):
    """Create TaskManager instance for testing"""
    from utils.encoder import SecureEncoder
    from interface.config import DashboardConfig
    
    class MockConfig:
        def get_path(self, _):
            return tmp_path
            
    encoder = SecureEncoder("test_key")
    config = MockConfig()
    return TaskManager(encoder, config)

def test_create_task(task_manager):
    """Test task creation"""
    task = task_manager.create_task(
        title="Test Task",
        category=TaskCategory.BUSINESS,
        priority=TaskPriority.HIGH,
        description="Test description",
        due_date="2024-12-31"
    )
    
    assert task['title'] == "Test Task"
    assert task['category'] == TaskCategory.BUSINESS.value
    assert task['priority'] == TaskPriority.HIGH.value
    assert task['status'] == TaskStatus.PENDING.value

def test_update_task(task_manager):
    """Test task updating"""
    task = task_manager.create_task(
        title="Test Task",
        category=TaskCategory.BUSINESS,
        priority=TaskPriority.HIGH,
        description="Test description"
    )
    
    updated = task_manager.update_task(task['id'], {
        'title': "Updated Task",
        'priority': TaskPriority.URGENT.value
    })
    
    assert updated['title'] == "Updated Task"
    assert updated['priority'] == TaskPriority.URGENT.value

def test_list_tasks(task_manager):
    """Test task listing with filters"""
    # Create multiple tasks
    task_manager.create_task(
        title="Task 1",
        category=TaskCategory.BUSINESS,
        priority=TaskPriority.HIGH,
        description="Test"
    )
    task_manager.create_task(
        title="Task 2",
        category=TaskCategory.PERSONAL,
        priority=TaskPriority.LOW,
        description="Test"
    )
    
    # Test filters
    business_tasks = task_manager.list_tasks(category=TaskCategory.BUSINESS)
    assert len(business_tasks) == 1
    assert business_tasks[0]['title'] == "Task 1"
    
    high_priority = task_manager.list_tasks(priority=TaskPriority.HIGH)
    assert len(high_priority) == 1
    assert high_priority[0]['priority'] == TaskPriority.HIGH.value

def test_delete_task(task_manager):
    """Test task deletion"""
    task = task_manager.create_task(
        title="Test Task",
        category=TaskCategory.BUSINESS,
        priority=TaskPriority.HIGH,
        description="Test description"
    )
    
    # Test soft delete
    task_manager.delete_task(task['id'], permanent=False)
    updated_task = task_manager.get_task(task['id'])
    assert updated_task['status'] == TaskStatus.DELETED.value
    
    # Test permanent delete
    task_manager.delete_task(task['id'], permanent=True)
    assert task_manager.get_task(task['id']) is None

def test_cleanup_deleted_tasks(task_manager):
    """Test cleanup of old deleted tasks"""
    # Create and delete a task
    task = task_manager.create_task(
        title="Old Task",
        category=TaskCategory.BUSINESS,
        priority=TaskPriority.HIGH,
        description="Test description"
    )
    task_manager.delete_task(task['id'], permanent=False)
    
    # Modify the task's modified_at date to be old
    task = task_manager.get_task(task['id'])
    old_date = datetime.now() - timedelta(days=31)
    task_manager.update_task(task['id'], {
        'modified_at': old_date.isoformat()
    })
    
    # Run cleanup
    cleaned = task_manager.cleanup_deleted_tasks(days=30)
    assert cleaned == 1
    assert task_manager.get_task(task['id']) is None

if __name__ == "__main__":
    pytest.main([__file__])