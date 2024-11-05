# run_internet_monitor.bat
@echo off
echo Starting Internet Speed Monitor...
cd /d "%~dp0"
title Internet Speed Monitor
python -m pip install speedtest-cli
python internet_monitor.py
pause