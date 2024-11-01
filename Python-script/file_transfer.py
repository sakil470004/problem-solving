import socket
import os
import time
import ipaddress
import netifaces

class FileTransfer:
    def __init__(self):
        self.SEPARATOR = "<SEPARATOR>"
        self.BUFFER_SIZE = 4096
        self.PORT = 5001
        self.running = True
        
    def get_local_ip_ranges(self):
        """Get all local network IP ranges"""
        ip_ranges = []
        for interface in netifaces.interfaces():
            addrs = netifaces.ifaddresses(interface)
            if netifaces.AF_INET in addrs:
                for addr in addrs[netifaces.AF_INET]:
                    ip = addr['addr']
                    if not ip.startswith('127.'):
                        ip_base = '.'.join(ip.split('.')[:-1])
                        ip_ranges.append(ip_base)
        return ip_ranges if ip_ranges else ['.'.join(socket.gethostbyname(socket.gethostname()).split('.')[:-1])]

    def scan_network(self):
        """Scan network for active receivers"""
        active_ips = []
        ip_ranges = self.get_local_ip_ranges()
        
        for ip_base in ip_ranges:
            ip_range = [f"{ip_base}.{i}" for i in range(1, 255)]
            for ip in ip_range:
                try:
                    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
                        sock.settimeout(0.1)
                        result = sock.connect_ex((ip, self.PORT))
                        if result == 0:
                            # Verify it's our service
                            try:
                                sock.send(b"VERIFY")
                                if sock.recv(16).decode() == "FILE_TRANSFER_OK":
                                    active_ips.append(ip)
                            except:
                                continue
                except:
                    continue
        return active_ips

    def send_file(self, filename, host):
        """Send file to specified host"""
        s = None
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.settimeout(10)  # 10 second timeout
            s.connect((host, self.PORT))
            
            # Initial verification
            s.send(b"VERIFY")
            if s.recv(16).decode() != "FILE_TRANSFER_OK":
                raise Exception("Invalid receiver")
            
            # Send file info
            filesize = os.path.getsize(filename)
            file_info = f"{os.path.basename(filename)}{self.SEPARATOR}{filesize}"
            s.send(file_info.encode())
            
            # Wait for acknowledgment
            if s.recv(self.BUFFER_SIZE).decode() != "OK":
                raise Exception("Connection refused by receiver")
            
            # Send file
            with open(filename, "rb") as f:
                bytes_sent = 0
                while bytes_sent < filesize:
                    bytes_read = f.read(min(self.BUFFER_SIZE, filesize - bytes_sent))
                    if not bytes_read:
                        break
                    s.sendall(bytes_read)
                    bytes_sent += len(bytes_read)
            
            # Wait for final confirmation
            if s.recv(self.BUFFER_SIZE).decode() != "COMPLETE":
                raise Exception("File transfer incomplete")
                
        except socket.timeout:
            raise Exception("Connection timed out")
        except ConnectionRefusedError:
            raise Exception("Connection refused by receiver")
        except Exception as e:
            raise Exception(f"Send error: {str(e)}")
        finally:
            if s:
                s.close()

    def stop_receiving(self):
        """Stop the receiving process"""
        self.running = False

    def receive_file(self, save_dir="."):
        """Receive incoming file with specified save directory"""
        server_socket = None
        client_socket = None
        try:
            server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            server_socket.bind(('0.0.0.0', self.PORT))
            server_socket.listen(1)
            server_socket.settimeout(1)
            
            self.running = True
            
            while self.running:
                try:
                    client_socket, address = server_socket.accept()
                    client_socket.settimeout(10)  # 10 second timeout
                    
                    try:
                        # Handle verification request
                        data = client_socket.recv(self.BUFFER_SIZE)
                        if data == b"VERIFY":
                            client_socket.send("FILE_TRANSFER_OK".encode())
                            data = client_socket.recv(self.BUFFER_SIZE)
                        
                        # Process file transfer
                        if data and self.SEPARATOR in data.decode():
                            filename, filesize = data.decode().split(self.SEPARATOR)
                            filename = os.path.basename(filename)
                            filesize = int(filesize)
                            
                            # Send acknowledgment
                            client_socket.send("OK".encode())
                            
                            # Create full path with save directory
                            save_path = os.path.join(save_dir, filename)
                            
                            # Receive file
                            with open(save_path, "wb") as f:
                                bytes_received = 0
                                while bytes_received < filesize:
                                    bytes_read = client_socket.recv(
                                        min(self.BUFFER_SIZE, filesize - bytes_received)
                                    )
                                    if not bytes_read:
                                        break
                                    f.write(bytes_read)
                                    bytes_received += len(bytes_read)
                                
                            # Send completion confirmation
                            client_socket.send("COMPLETE".encode())
                            return save_path
                            
                    except socket.timeout:
                        print("Transfer timed out")
                    except Exception as e:
                        print(f"Error during transfer: {str(e)}")
                    finally:
                        if client_socket:
                            client_socket.close()
                            
                except socket.timeout:
                    continue  # Check running flag on timeout
                except Exception as e:
                    print(f"Error accepting connection: {str(e)}")
                    continue
                    
        finally:
            if client_socket:
                client_socket.close()
            if server_socket:
                server_socket.close()