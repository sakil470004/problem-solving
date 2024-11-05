# Secure Dashboard System

A secure interface system for managing tasks and interacting with Claude AI, featuring encrypted data storage, task management, and system monitoring.

## Project Structure
```
Dashboard/
├── interface/
│   ├── __init__.py
│   ├── quick_menu.py     # User interface
│   ├── status_check.py   # System monitoring
│   ├── config.py         # Configuration management
│   └── claude_interface.py # Claude AI integration
├── utils/
│   ├── __init__.py
│   ├── task_manager.py   # Task handling
│   ├── encoder.py        # Data security
│   └── config_generator.py # Config file generator
├── data/
│   ├── encoded/          # Encrypted data storage
│   ├── responses/        # Claude responses
│   └── temp/            # Temporary files
├── tests/
│   ├── __init__.py
│   ├── test_config.py
│   ├── test_encoder.py
│   └── test_task_manager.py
├── examples/
│   ├── encoder_example.py
│   ├── task_manager_example.py
│   └── quick_menu_example.py
├── logs/                 # System logs
├── setup.py             # Package setup
├── requirements.txt     # Dependencies
├── README.md           # Documentation
├── .env               # Environment configuration
└── launcher.py        # System entry point
```

## Features

### 1. Security
- Encrypted data storage
- Secure message handling
- Access control
- Data validation
- Secure configuration management

### 2. Task Management
- Multiple task categories (Business, Personal, Urgent)
- Priority levels
- Status tracking
- Task history
- Encrypted storage

### 3. Claude AI Integration
- Secure message handling
- Context management
- Response storage
- Token optimization
- History tracking

### 4. System Monitoring
- Real-time system metrics
- Storage monitoring
- Error tracking
- Health status reporting
- Automated cleanup

### 5. User Interface
- Command-line menu system
- Status displays
- Task management interface
- System monitoring views
- Error notifications

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dashboard.git
cd dashboard
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Generate configuration:
```bash
python utils/config_generator.py --output custom_config.env
```

4. Update configuration:
- Edit custom_config.env
- Add your Claude API key
- Adjust paths and settings as needed

## Usage

### Starting the System

Windows:
```batch
start_dashboard.bat
```

Linux/Mac:
```bash
./start_dashboard.sh
```

Or directly:
```bash
python launcher.py --config custom_config.env
```

### Command-line Options
```
--config    Path to configuration file
--debug     Enable debug mode
```

## Core Components

### 1. Configuration (config.py)
- Environment management
- Path configuration
- System settings
- Secure key storage

### 2. Encoder (encoder.py)
- Data encryption
- Secure storage
- Key management
- File operations

### 3. Task Manager (task_manager.py)
- Task creation/modification
- Status management
- Priority handling
- History tracking

### 4. Status Check (status_check.py)
- System monitoring
- Health checks
- Resource tracking
- Performance metrics

### 5. Quick Menu (quick_menu.py)
- User interface
- Command processing
- Status display
- Navigation

### 6. Claude Interface (claude_interface.py)
- Message handling
- Response processing
- Context management
- History tracking

## Security Considerations

1. Data Protection
- All sensitive data is encrypted
- Secure key storage
- Access control
- Data validation

2. File Security
- Encrypted storage
- Secure file operations
- Temporary file cleanup
- Access logging

3. Configuration Security
- Environment variable protection
- Secure key generation
- Configuration validation
- Access control

## Development

### Running Tests
```bash
pytest tests/
```

### Adding New Features
1. Create new module in appropriate directory
2. Add tests in tests/
3. Update documentation
4. Run test suite

### Code Style
- Follow PEP 8
- Use type hints
- Include docstrings
- Add logging

## Maintenance

### Backups
- Automated daily backups
- Encrypted backup storage
- Version control
- Recovery procedures

### Monitoring
- System health checks
- Resource monitoring
- Error tracking
- Performance metrics

### Cleanup
- Temporary file removal
- Old data archival
- Log rotation
- Storage optimization

## Troubleshooting

### Common Issues

1. Configuration Errors
- Check custom_config.env
- Verify paths
- Check permissions
- Validate API keys

2. System Access
- Verify permissions
- Check paths
- Validate credentials
- Review logs

3. Performance Issues
- Monitor system metrics
- Check storage space
- Review error logs
- Optimize settings

### Error Logs
- Located in logs/
- Daily rotation
- Level-based logging
- Detailed tracing

## Support

- Report issues on GitHub
- Check documentation
- Review examples
- Contact maintenance team

## Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Create pull request

## License

MIT License - See LICENSE file