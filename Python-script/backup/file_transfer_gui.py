import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import threading
import os
import socket
from file_transfer import FileTransfer

class FileTransferGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("File Transfer System")
        self.root.geometry("600x400")
        
        # Initialize save directory
        self.save_dir = os.path.expanduser("~\\Downloads")
        
        # Initialize transfer
        self.transfer = FileTransfer()
        
        # Create main container
        self.tab_control = ttk.Notebook(root)
        
        # Create tabs
        self.receive_tab = ttk.Frame(self.tab_control)
        self.send_tab = ttk.Frame(self.tab_control)
        
        self.tab_control.add(self.receive_tab, text='Receive Files')
        self.tab_control.add(self.send_tab, text='Send Files')
        
        # Setup tabs
        self.setup_receive_tab()
        self.setup_send_tab()
        
        self.tab_control.pack(expand=1, fill="both")
        
        # Status bar at bottom
        self.status_var = tk.StringVar()
        self.status_var.set("Ready")
        self.status_bar = ttk.Label(root, textvariable=self.status_var, relief=tk.SUNKEN)
        self.status_bar.pack(side=tk.BOTTOM, fill=tk.X)

    def setup_receive_tab(self):
        # Status Frame
        status_frame = ttk.LabelFrame(self.receive_tab, text="Receiver Status", padding=10)
        status_frame.pack(fill=tk.X, padx=10, pady=5)
        
        self.receive_status = ttk.Label(status_frame, text="Not Listening")
        self.receive_status.pack()
        
        # Directory Frame
        dir_frame = ttk.LabelFrame(self.receive_tab, text="Save Location", padding=10)
        dir_frame.pack(fill=tk.X, padx=10, pady=5)
        
        self.save_dir_var = tk.StringVar(value=self.save_dir)
        dir_entry = ttk.Entry(dir_frame, textvariable=self.save_dir_var, width=50)
        dir_entry.pack(side=tk.LEFT, padx=5, expand=True, fill=tk.X)
        
        browse_btn = ttk.Button(dir_frame, text="Browse", command=self.choose_save_dir)
        browse_btn.pack(side=tk.RIGHT, padx=5)
        
        # Control Frame
        control_frame = ttk.Frame(self.receive_tab)
        control_frame.pack(pady=10)
        
        self.receive_btn = ttk.Button(control_frame, text="Start Receiving",
                                    command=self.start_receiving)
        self.receive_btn.pack(side=tk.LEFT, padx=5)
        
        self.stop_btn = ttk.Button(control_frame, text="Stop",
                                 command=self.stop_receiving,
                                 state=tk.DISABLED)
        self.stop_btn.pack(side=tk.LEFT, padx=5)

    def setup_send_tab(self):
        # Scan Frame
        scan_frame = ttk.LabelFrame(self.send_tab, text="Available Receivers", padding=10)
        scan_frame.pack(fill=tk.X, padx=10, pady=5)
        
        # Receivers list with scrollbar
        list_frame = ttk.Frame(scan_frame)
        list_frame.pack(fill=tk.BOTH, expand=True)
        
        scrollbar = ttk.Scrollbar(list_frame)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        self.receivers_listbox = tk.Listbox(list_frame, height=5, 
                                          yscrollcommand=scrollbar.set)
        self.receivers_listbox.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        scrollbar.config(command=self.receivers_listbox.yview)
        
        # Button Frame
        btn_frame = ttk.Frame(self.send_tab)
        btn_frame.pack(pady=10)
        
        self.scan_btn = ttk.Button(btn_frame, text="Scan for Receivers",
                                 command=self.scan_network)
        self.scan_btn.pack(side=tk.LEFT, padx=5)
        
        self.send_btn = ttk.Button(btn_frame, text="Send File",
                                 command=self.send_file)
        self.send_btn.pack(side=tk.LEFT, padx=5)


    def choose_save_dir(self):
        directory = filedialog.askdirectory(initialdir=self.save_dir)
        if directory:
            self.save_dir = directory
            self.save_dir_var.set(directory)
    def start_receiving(self):
        self.receive_status.config(text="Listening...")
        self.receive_btn.config(state=tk.DISABLED)
        self.stop_btn.config(state=tk.NORMAL)
        self.status_var.set("Waiting for incoming files...")
        
        thread = threading.Thread(target=self.receive_thread)
        thread.daemon = True
        thread.start()

    def receive_thread(self):
        error = None
        try:
            saved_file = self.transfer.receive_file(self.save_dir)
            if saved_file:
                self.status_var.set("File received successfully!")
                messagebox.showinfo("Success", f"File received and saved to:\n{saved_file}")
        except Exception as e:
            error = str(e)
            self.status_var.set(f"Error: {error}")
            messagebox.showerror("Error", error)
        finally:
            self.reset_receive_status()

    def reset_receive_status(self):
        self.receive_status.config(text="Not Listening")
        self.receive_btn.config(state=tk.NORMAL)
        self.stop_btn.config(state=tk.DISABLED)
        self.status_var.set("Ready")

    def stop_receiving(self):
        self.transfer.stop_receiving()
        self.status_var.set("Stopping receiver...")
        self.receive_status.config(text="Stopping...")
        self.stop_btn.config(state=tk.DISABLED)

    def scan_network(self):
        self.receivers_listbox.delete(0, tk.END)
        self.status_var.set("Scanning network...")
        self.scan_btn.config(state=tk.DISABLED)
        
        def scan():
            error = None
            try:
                receivers = self.transfer.scan_network()
                self.root.after(0, self.update_receivers_list, receivers)
            except Exception as e:
                error = str(e)
                self.root.after(0, lambda: messagebox.showerror("Error", error))
            finally:
                self.root.after(0, lambda: self.scan_btn.config(state=tk.NORMAL))
                self.root.after(0, lambda: self.status_var.set("Ready"))
        
        thread = threading.Thread(target=scan)
        thread.daemon = True
        thread.start()

    def update_receivers_list(self, receivers):
        for ip in receivers:
            self.receivers_listbox.insert(tk.END, ip)
        if not receivers:
            self.status_var.set("No receivers found")
        else:
            self.status_var.set(f"Found {len(receivers)} receiver(s)")

    def send_file(self):
        selected = self.receivers_listbox.curselection()
        if not selected:
            messagebox.showwarning("Warning", "Please select a receiver")
            return
        
        filename = filedialog.askopenfilename(
            title="Select file to send",
            filetypes=(
                ("All files", "*.*"),
                ("Text files", "*.txt"),
                ("Python files", "*.py"),
                ("PDF files", "*.pdf")
            )
        )
        
        if not filename:
            return
            
        receiver = self.receivers_listbox.get(selected[0])
        self.status_var.set(f"Sending {os.path.basename(filename)} to {receiver}...")
        self.send_btn.config(state=tk.DISABLED)
        
        def send_thread():
            error = None
            try:
                self.transfer.send_file(filename, receiver)
                self.status_var.set("File sent successfully!")
                messagebox.showinfo("Success", "File sent successfully!")
            except Exception as e:
                error = str(e)
                self.status_var.set(f"Error: {error}")
                messagebox.showerror("Error", error)
            finally:
                self.send_btn.config(state=tk.NORMAL)
                self.status_var.set("Ready")
        
        thread = threading.Thread(target=send_thread)
        thread.daemon = True
        thread.start()

if __name__ == "__main__":
    root = tk.Tk()
    app = FileTransferGUI(root)
    root.mainloop()