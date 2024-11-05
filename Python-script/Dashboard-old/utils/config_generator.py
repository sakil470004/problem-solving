# utils/config_generator.py
import os
import secrets
import string
from pathlib import Path

def generate_secure_key(length: int = 32) -> str:
    """Generate a secure random key"""
    alphabet = string.ascii_letters + string.digits + string.punctuation
    return ''.join(secrets.choice(alphabet) for _ in range(length))

def create_config_file(filepath: str = "custom_config.env", base_path: str = None):
    """
    Create a new configuration file with secure defaults
    Args:
        filepath: Path to create the config file
        base_path: Base path for the dashboard system
    """
    if base_path is None:
        base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    
    config_template = f"""# API Configuration
CLAUDE_API_KEY=your_claude_api_key_here
ENCRYPTION_KEY={generate_secure_key()}

# System Settings
DEBUG_MODE=False
MAX_STORAGE_DAYS=30
BACKUP_ENABLED=True
AUTO_CLEANUP=True

# Path Configuration
BASE_PATH={base_path}
LOGS_PATH={os.path.join(base_path, 'logs')}
DATA_PATH={os.path.join(base_path, 'data')}
BACKUP_PATH={os.path.join(base_path, 'backups')}

# Security Settings
ENCRYPTION_LEVEL=high
MAX_LOGIN_ATTEMPTS=3
SESSION_TIMEOUT=3600

# Task Management
MAX_TASKS_PER_USER=100
TASK_BACKUP_INTERVAL=24

# System Monitoring
HEALTH_CHECK_INTERVAL=300
ALERT_CPU_THRESHOLD=80
ALERT_MEMORY_THRESHOLD=85
ALERT_DISK_THRESHOLD=90

# Logging Configuration
LOG_LEVEL=INFO
MAX_LOG_SIZE=10485760
MAX_LOG_BACKUPS=5

# Claude Integration Settings
CLAUDE_MODEL=claude-3-opus-20240229
MAX_TOKENS=1024
CONTEXT_WINDOW=100000
"""
    
    try:
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        
        # Write configuration file
        with open(filepath, 'w') as f:
            f.write(config_template)
            
        print(f"Configuration file created successfully: {filepath}")
        print("\nIMPORTANT:")
        print("1. Update CLAUDE_API_KEY with your actual API key")
        print("2. Review and adjust other settings as needed")
        print("3. Keep this file secure and do not share it")
        
    except Exception as e:
        print(f"Error creating configuration file: {str(e)}")

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description='Generate Dashboard configuration file')
    parser.add_argument('--output', type=str, default='custom_config.env',
                      help='Output path for the configuration file')
    parser.add_argument('--base-path', type=str,
                      help='Base path for the Dashboard system')
    
    args = parser.parse_args()
    create_config_file(args.output, args.base_path)