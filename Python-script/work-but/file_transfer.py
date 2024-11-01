# file_transfer.py
# this is complete working code for file transfer system using socket programming in Python
import socket
import tqdm
import os
import time
import ipaddress
from multiprocessing.dummy import Pool as ThreadPool

class FileTransfer:
    def __init__(self):
        self.SEPARATOR = "<SEPARATOR>"
        self.BUFFER_SIZE = 4096
        self.PORT = 5001
        
    def main_menu(self):
        while True:
            print("\n=== File Transfer System ===")
            print("1. Ready to Receive Files")
            print("2. Send File")
            print("3. Exit")
            
            choice = input("Select option (1-3): ")
            
            if choice == "1":
                self.receive_file()
            elif choice == "2":
                self.send_file_menu()
            elif choice == "3":
                break
            else:
                print("Invalid choice. Please try again.")

    def scan_device(self, ip):
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(0.5)
            result = sock.connect_ex((str(ip), self.PORT))
            sock.close()
            return ip if result == 0 else None
        except Exception:
            return None

    def scan_network(self):
        print("\nScanning network for receivers...")
        network_ip = '192.168.0.1'  # Update this for your network
        ip_base = ".".join(network_ip.split(".")[:3])
        ip_range = [f"{ip_base}.{i}" for i in range(1, 255)]

        with ThreadPool(50) as pool:
            results = list(tqdm.tqdm(
                pool.imap(self.scan_device, ip_range), 
                total=len(ip_range), 
                desc="Scanning network"
            ))

        active_ips = [ip for ip in results if ip]
        return active_ips

    def receive_file(self):
        try:
            print("\n=== Starting Receiver ===")
            host = "0.0.0.0"
            
            s = socket.socket()
            s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            s.bind((host, self.PORT))
            s.listen(1)
            print(f"Ready! Waiting for sender on port {self.PORT}...")
            
            while True:
                try:
                    client_socket = s.accept()[0]  # Only accept the socket, not the address
                    print(f"Connected by: {client_socket.getpeername()}")
                    
                    received = client_socket.recv(self.BUFFER_SIZE).decode()
                    filename, filesize = received.split(self.SEPARATOR)
                    filename = os.path.basename(filename)
                    filesize = int(filesize)
                    
                    print(f"Receiving file: {filename} ({filesize} bytes)")
                    
                    progress = tqdm.tqdm(range(filesize), f"Receiving {filename}", 
                                    unit="B", unit_scale=True)
                    with open(filename, "wb") as f:
                        while True:
                            bytes_read = client_socket.recv(self.BUFFER_SIZE)
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
    def send_file_menu(self):
        print("\n=== Scanning for receivers ===")
        active_ips = self.scan_network()
        
        if not active_ips:
            print("No receivers found!")
            return
            
        print("\nAvailable receivers:")
        for i, ip in enumerate(active_ips, 1):
            print(f"{i}. {ip}")
            
        try:
            choice = int(input("\nSelect receiver number (or 0 to cancel): "))
            if choice == 0:
                return
            selected_ip = active_ips[choice-1]
            self.send_file(selected_ip)
        except (ValueError, IndexError):
            print("Invalid selection!")

    def send_file(self, filename, host):
        try:
            print(f"\n=== Starting Sender ===")
            s = socket.socket()
            
            print(f"Trying to connect to {host}:{self.PORT}")
            print("Make sure receiver is running first!")
            
            retries = 3
            connected = False
            
            while retries > 0 and not connected:
                try:
                    s.connect((host, self.PORT))
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
                
            print(f"Sending file: {filename}")
            
            s.send(f"{filename}{self.SEPARATOR}{os.path.getsize(filename)}".encode())
            
            progress = tqdm.tqdm(range(os.path.getsize(filename)), f"Sending {filename}", 
                            unit="B", unit_scale=True)
            
            with open(filename, "rb") as f:
                while True:
                    bytes_read = f.read(self.BUFFER_SIZE)
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
    transfer = FileTransfer()
    transfer.main_menu()