# receive_file.py (run this FIRST on second computer)
import socket
import tqdm
import os

def receive():
    try:
        print("=== Starting Receiver ===")
        server = socket.socket()
        server.bind(('', 5001))  # Empty string means all interfaces
        print("Bound to port 5001")
        server.listen(1)
        print("Listening for connections...")
        
        client, addr = server.accept()
        print(f"Connected to: {addr}")
        
        # File receiving code here...
        
    except Exception as e:
        print(f"Error: {e}")
        if 'server' in locals():
            server.close()

if __name__ == "__main__":
    receive()