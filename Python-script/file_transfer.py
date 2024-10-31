import socket
import tqdm
import os
import time
from multiprocessing.dummy import Pool as ThreadPool

class FileTransfer:
    def __init__(self):
        self.SEPARATOR = "<SEPARATOR>"
        self.BUFFER_SIZE = 4096
        self.PORT = 5001
        
    def scan_network(self):
        """Scan network for active receivers"""
        ip_base = ".".join("192.168.0.1".split(".")[:3])
        ip_range = [f"{ip_base}.{i}" for i in range(1, 255)]
        active_ips = []
        
        for ip in ip_range:
            try:
                sock = socket.socket()
                sock.settimeout(0.1)
                if sock.connect_ex((ip, self.PORT)) == 0:
                    active_ips.append(ip)
                sock.close()
            except: 
                pass
        return active_ips

    def send_file(self, filename, host):
        """Send file to specified host"""
        try:
            s = socket.socket()
            s.connect((host, self.PORT))
            
            filesize = os.path.getsize(filename)
            s.send(f"{filename}{self.SEPARATOR}{filesize}".encode())
            
            with open(filename, "rb") as f:
                while True:
                    bytes_read = f.read(self.BUFFER_SIZE)
                    if not bytes_read:
                        break
                    s.sendall(bytes_read)
        finally:
            s.close()

    def receive_file(self):
        """Receive incoming file"""
        s = socket.socket()
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        s.bind(('0.0.0.0', self.PORT))
        s.listen(1)
        
        client_socket, _ = s.accept()
        received = client_socket.recv(self.BUFFER_SIZE).decode()
        filename, filesize = received.split(self.SEPARATOR)
        filename = os.path.basename(filename)
        filesize = int(filesize)
        
        with open(filename, "wb") as f:
            while True:
                bytes_read = client_socket.recv(self.BUFFER_SIZE)
                if not bytes_read:
                    break
                f.write(bytes_read)
                
        client_socket.close()
        s.close()