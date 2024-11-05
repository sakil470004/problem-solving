import speedtest
import time
import logging
from datetime import datetime
import sqlite3
from pathlib import Path
import threading

class InternetSpeedMonitor:
    def __init__(self, check_interval=20):
        self.check_interval = check_interval  # Check every 20 seconds
        self.active = False

        # Setup directories
        self.base_dir = Path(__file__).parent
        self.log_dir = self.base_dir / 'logs'
        self.log_dir.mkdir(exist_ok=True)

        # Setup logging, but we will manually handle the order
        self.log_file = self.log_dir / 'internet_speed.log'
        
        # Initialize database
        self.db_path = self.base_dir / 'data' / 'speed_history.db'
        self.db_path.parent.mkdir(exist_ok=True)
        self.init_database()

    def init_database(self):
        """Initialize SQLite database for speed history"""
        conn = sqlite3.connect(self.db_path)
        c = conn.cursor()
        c.execute('''
            CREATE TABLE IF NOT EXISTS speed_tests (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT,
                download_speed REAL,
                upload_speed REAL,
                ping REAL
            )
        ''')
        conn.commit()
        conn.close()

    def log_with_reverse_order(self, log_message):
        """Log the new entry at the top of the log file"""
        try:
            # Read existing log contents if the log file exists
            if self.log_file.exists():
                with open(self.log_file, 'r') as f:
                    existing_logs = f.read()
            else:
                existing_logs = ""
            
            # Write new log entry followed by existing log entries
            with open(self.log_file, 'w') as f:
                f.write(log_message + "\n" + existing_logs)

        except Exception as e:
            print(f"Failed to write to log file: {e}")

    def measure_speed(self):
        """Measure current internet speed"""
        try:
            st = speedtest.Speedtest()
            st.get_best_server()

            # Measure download speed
            download_speed = st.download() / 1_000_000  # Convert to Mbps

            # Measure upload speed
            upload_speed = st.upload() / 1_000_000  # Convert to Mbps

            # Get ping
            ping = st.results.ping

            # Create the log message
            log_message = f"{datetime.now()} - Download: {download_speed:.2f} Mbps, Upload: {upload_speed:.2f} Mbps, Ping: {ping:.2f} ms"

            # Log at the top of the file
            self.log_with_reverse_order(log_message)

            return download_speed, upload_speed, ping

        except Exception as e:
            print(f"Speed test failed: {e}")
            return None, None, None

    def store_result(self, download_speed, upload_speed, ping):
        """Store speed test results in database"""
        try:
            conn = sqlite3.connect(self.db_path)
            c = conn.cursor()
            c.execute('''
                INSERT INTO speed_tests (timestamp, download_speed, upload_speed, ping)
                VALUES (?, ?, ?, ?)
            ''', (datetime.now().isoformat(), download_speed, upload_speed, ping))
            conn.commit()
            conn.close()
        except Exception as e:
            print(f"Failed to store result: {e}")

    def monitor_loop(self):
        """Main monitoring loop"""
        while self.active:
            download_speed, upload_speed, ping = self.measure_speed()

            if download_speed is not None:
                self.store_result(download_speed, upload_speed, ping)

                # Display the result in the terminal as well
                print(f"\rLatest: {download_speed:.2f} Mbps ↓ {upload_speed:.2f} Mbps ↑ {ping:.0f}ms", end='')

            time.sleep(self.check_interval)

    def start(self):
        """Start the internet speed monitor"""
        self.active = True
        self.monitor_thread = threading.Thread(target=self.monitor_loop)
        self.monitor_thread.daemon = True
        self.monitor_thread.start()
        print("Internet speed monitoring started")

    def stop(self):
        """Stop the internet speed monitor"""
        self.active = False
        print("Internet speed monitoring stopped")

    def get_recent_history(self, limit=10):
        """Get recent speed test results"""
        conn = sqlite3.connect(self.db_path)
        c = conn.cursor()
        c.execute('''
            SELECT timestamp, download_speed, upload_speed, ping
            FROM speed_tests
            ORDER BY timestamp DESC
            LIMIT ?
        ''', (limit,))
        results = c.fetchall()
        conn.close()
        return results

if __name__ == "__main__":
    monitor = InternetSpeedMonitor(check_interval=20)

    try:
        monitor.start()
        print("Internet speed monitoring started. Press Ctrl+C to stop.")

        while True:
            # Display recent results
            recent = monitor.get_recent_history(1)
            if recent:
                timestamp, download, upload, ping = recent[0]
                print(f"\rLatest: {download:.2f} Mbps ↓ {upload:.2f} Mbps ↑ {ping:.0f}ms", end='')
            time.sleep(1)

    except KeyboardInterrupt:
        print("\nStopping monitor...")
        monitor.stop()
        print("Monitor stopped.")
