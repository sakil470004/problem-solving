import socket
import ipaddress
from tqdm import tqdm
from multiprocessing.dummy import Pool as ThreadPool

PORT=5001

def scan_device(ip, port=PORT):
    """Attempt to connect to a specific IP and port."""
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(0.5)  # Short timeout to avoid long waits
        result = sock.connect_ex((str(ip), port))
        sock.close()
        return ip if result == 0 else None  # Return IP if port is open
    except Exception:
        return None

def scan_network_for_port(network_ip, port=PORT):
    """Scan the entire network for active devices with an open port."""
    ip_base = ".".join(network_ip.split(".")[:3])  # e.g., '192.168.0'
    router_ip = network_ip  # Often the default gateway
    
    # Generate IP range, excluding the router IP
    ip_range = [f"{ip_base}.{i}" for i in range(1, 255) if f"{ip_base}.{i}" != router_ip]

    # Use ThreadPool to speed up the scan
    with ThreadPool(50) as pool:
        results = list(tqdm(pool.imap(lambda ip: scan_device(ip, port), ip_range), total=len(ip_range), desc="Scanning network"))

    # Filter out IPs with no open port
    active_ips = [ip for ip in results if ip]
    return active_ips

# Replace '192.168.0.1' with the base IP of your network
network_ip = '192.168.0.1'
active_devices = scan_network_for_port(network_ip)

# Display the active devices with port 5000 open
print("Devices with port 5000 open:")
for device in active_devices:
    print(device)
