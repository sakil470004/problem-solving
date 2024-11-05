# Dashboard/tests/test_config.py
import pytest
from pathlib import Path
import os
import sys
from os.path import dirname, abspath

# Add the parent directory to sys.path
sys.path.insert(0, dirname(dirname(abspath(__file__))))

from interface.config import DashboardConfig

def test_config_initialization():
    """Test basic configuration initialization"""
    config = DashboardConfig()
    assert config is not None
    assert isinstance(config.base_path, Path)
    
def test_environment_variables():
    """Test environment variable loading"""
    config = DashboardConfig()
    assert config.claude_key is not None
    assert config.encryption_key is not None
    assert isinstance(config.debug_mode, bool)
    assert isinstance(config.max_storage_days, int)
    
def test_path_initialization():
    """Test system paths initialization"""
    config = DashboardConfig()
    required_paths = ['encoded', 'responses', 'temp', 'logs', 'backups']
    
    for path_name in required_paths:
        path = config.get_path(path_name)
        assert path.exists(), f"Path {path_name} does not exist"
        assert path.is_dir(), f"Path {path_name} is not a directory"
        
def test_path_permissions():
    """Test path write permissions"""
    config = DashboardConfig()
    
    for path_name in config.paths:
        path = config.get_path(path_name)
        test_file = path / ".test_access"
        
        # Test write permission
        try:
            test_file.touch()
            assert test_file.exists(), f"Could not create test file in {path_name}"
            test_file.unlink()
            assert not test_file.exists(), f"Could not remove test file in {path_name}"
        except Exception as e:
            pytest.fail(f"Permission test failed for {path_name}: {str(e)}")
            
def test_system_validation():
    """Test system validation function"""
    config = DashboardConfig()
    assert config.validate_system() is True

def test_invalid_path_request():
    """Test error handling for invalid path requests"""
    config = DashboardConfig()
    with pytest.raises(ValueError):
        config.get_path("invalid_path_type")

if __name__ == "__main__":
    pytest.main([__file__])