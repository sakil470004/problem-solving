# send_file.py (run this SECOND on first computer)
import socket
import os
import time

def send():
    try:
        print("=== Starting Sender ===")
        s = socket.socket()
        host = "192.168.0.23"  # Receiver's IP
        port = 5001
        
        print(f"Trying to connect to {host}:{port}")
        print("Make sure receiver is running first!")
        
        # Add connection retry
        retries = 3  
        while retries > 0:
            try:
                s.connect((host, port))
                print("Connected successfully!")
                break
            except ConnectionRefusedError:
                retries -= 1
                print(f"Connection failed. Retries left: {retries}")
                if retries > 0:
                    print("Waiting 5 seconds before retry...")
                    time.sleep(5)
                
        if retries == 0:
            print("Could not connect after 3 attempts")
            return
            
        # File sending code here...
        
    except Exception as e:
        print(f"Error: {e}")
    finally:
        if 's' in locals():
            s.close()

if __name__ == "__main__":
    send()