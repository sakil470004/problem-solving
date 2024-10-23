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


# send_file.py
import socket
import os
import time
import tqdm

def send_file():
    try:
        print("=== Starting Sender ===")
        SEPARATOR = "<SEPARATOR>"
        BUFFER_SIZE = 4096
        
        s = socket.socket()
        host = "192.168.0.10"  # Receiver's IP
        port = 5001
        
        print(f"Trying to connect to {host}:{port}")
        print("Make sure receiver is running first!")
        
        # Add connection retry
        retries = 3
        connected = False
        
        while retries > 0 and not connected:
            try:
                s.connect((host, port))
                connected = True
                print("Connected successfully!")
            except ConnectionRefusedError:
                retries -= 1
                print(f"Connection failed. Retries left: {retries}")
                if retries > 0:
                    print("Waiting 5 seconds before retry...")
                    time.sleep(5)
            except Exception as e:
                print(f"Unexpected connection error: {e}")
                retries -= 1
                
        if not connected:
            print("Could not connect after 3 attempts")
            return
            
        # Get file to send
        filename = input("Enter filename to send: ")
        if not os.path.exists(filename):
            print("File not found!")
            return
            
        filesize = os.path.getsize(filename)
        print(f"Sending file: {filename} ({filesize} bytes)")
        
        # Send filename and size
        s.send(f"{filename}{SEPARATOR}{filesize}".encode())
        
        # Send file with progress bar
        progress = tqdm.tqdm(range(filesize), f"Sending {filename}", 
                           unit="B", unit_scale=True)
        
        with open(filename, "rb") as f:
            while True:
                bytes_read = f.read(BUFFER_SIZE)
                if not bytes_read:
                    break
                s.sendall(bytes_read)
                progress.update(len(bytes_read))
                
        print("\nFile sent successfully!")
        
    except Exception as e:
        print(f"Error: {e}")
    finally:
        if 's' in locals():
            s.close()
        print("Sender closed")

if __name__ == "__main__":
    send_file()