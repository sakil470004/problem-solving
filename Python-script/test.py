# secure_share.py
import os
import socket
import json
import hashlib
from datetime import datetime
from pathlib import Path

class SecureShare:
    def __init__(self):
        self.share_path = "C:\\Users\\shmue\\Downloads\\secure_share"
        self.machine_id = socket.gethostname()
        self.known_machines = {
            '192.168.0.10': 'Shalom',
            '192.168.0.23': 'TikkunOlam'
        }
        
    def setup_share(self):
        """Create secure sharing directory"""
        if not os.path.exists(self.share_path):
            os.makedirs(self.share_path)
            print(f"Created share directory: {self.share_path}")
            
        # Create log file
        log_file = os.path.join(self.share_path, 'transfer_log.json')
        if not os.path.exists(log_file):
            with open(log_file, 'w') as f:
                json.dump([], f)
                
    def log_transfer(self, filename, destination):
        """Log file transfers with hash for verification"""
        log_file = os.path.join(self.share_path, 'transfer_log.json')
        with open(log_file, 'r') as f:
            logs = json.load(f)
            
        file_path = os.path.join(self.share_path, filename)
        if os.path.exists(file_path):
            with open(file_path, 'rb') as f:
                file_hash = hashlib.sha256(f.read()).hexdigest()
        
        transfer_info = {
            'timestamp': datetime.now().isoformat(),
            'filename': filename,
            'source': self.machine_id,
            'destination': destination,
            'file_hash': file_hash
        }
        
        logs.append(transfer_info)
        
        with open(log_file, 'w') as f:
            json.dump(logs, f, indent=4)

def main():
    share = SecureShare()
    print(f"Setting up secure sharing for: {share.machine_id}")
    share.setup_share()
    
    # Show current status
    print("\nConnected Machines:")
    for ip, name in share.known_machines.items():
        status = "Connected" if os.system(f"ping -n 1 {ip}") == 0 else "Not Connected"
        print(f"{name} ({ip}): {status}")
        
    print(f"\nShare Directory: {share.share_path}")
    print("Ready for secure file transfers")

if __name__ == "__main__":
    main()