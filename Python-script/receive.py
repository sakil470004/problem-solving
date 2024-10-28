
# receive_file.py
import socket
import tqdm
import os
import time

def receive_file():
    try:
        SEPARATOR = "<SEPARATOR>"
        BUFFER_SIZE = 4096
        host = "0.0.0.0"  # Listen on all available interfaces
        port = 5001
        
        print("=== Starting Receiver ===")
        print(f"Setting up listener on port {port}")
        
        s = socket.socket()
        # Add this to allow port reuse
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        s.bind((host, port))
        s.listen(1)
        print("Ready! Waiting for sender...")
        
        while True:
            try:
                client_socket, address = s.accept() 
                print(f"Connected by: {address}")
                
                received = client_socket.recv(BUFFER_SIZE).decode()
                filename, filesize = received.split(SEPARATOR)
                filename = os.path.basename(filename)
                filesize = int(filesize)
                
                print(f"Receiving file: {filename} ({filesize} bytes)")
                
                progress = tqdm.tqdm(range(filesize), f"Receiving {filename}", 
                                   unit="B", unit_scale=True)
                with open(filename, "wb") as f:
                    while True:
                        bytes_read = client_socket.recv(BUFFER_SIZE)
                        if not bytes_read:
                            break
                        f.write(bytes_read)
                        progress.update(len(bytes_read))
                
                print(f"\nReceived file: {filename}")
                break
                
            except Exception as e:
                print(f"Error during transfer: {e}")
                if client_socket:
                    client_socket.close()
                
    except Exception as e:
        print(f"Server error: {e}")
    finally:
        if 's' in locals():
            s.close()
        print("Receiver closed")

if __name__ == "__main__":
    receive_file()