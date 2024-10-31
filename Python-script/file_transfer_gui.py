import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import threading
from file_transfer import FileTransfer

class FileTransferGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("File Transfer System")
        self.root.geometry("600x400")
        
        self.tab_control = ttk.Notebook(root)
        
        # Receive tab
        self.receive_tab = ttk.Frame(self.tab_control)
        self.tab_control.add(self.receive_tab, text='Receive Files')
        self.setup_receive_tab()
        
        # Send tab
        self.send_tab = ttk.Frame(self.tab_control)
        self.tab_control.add(self.send_tab, text='Send Files')
        self.setup_send_tab()
        
        self.tab_control.pack(expand=1, fill="both")
        
        # Status bar
        self.status_var = tk.StringVar()
        self.status_var.set("Ready")
        self.status_bar = ttk.Label(root, textvariable=self.status_var, relief=tk.SUNKEN)
        self.status_bar.pack(side=tk.BOTTOM, fill=tk.X)
        
        self.transfer = FileTransfer()

    def setup_receive_tab(self):
        status_frame = ttk.LabelFrame(self.receive_tab, text="Receiver Status", padding=10)
        status_frame.pack(fill=tk.X, padx=10, pady=5)
        
        self.receive_status = ttk.Label(status_frame, text="Not Listening")
        self.receive_status.pack()
        
        control_frame = ttk.Frame(self.receive_tab)
        control_frame.pack(pady=10)
        
        self.receive_btn = ttk.Button(control_frame, text="Start Receiving",
                                    command=self.start_receiving)
        self.receive_btn.pack(side=tk.LEFT, padx=5)
        
        self.stop_btn = ttk.Button(control_frame, text="Stop",
                                 command=self.stop_receiving)
        self.stop_btn.pack(side=tk.LEFT, padx=5)

    def setup_send_tab(self):
        scan_frame = ttk.LabelFrame(self.send_tab, text="Available Receivers", padding=10)
        scan_frame.pack(fill=tk.X, padx=10, pady=5)
        
        self.receivers_listbox = tk.Listbox(scan_frame, height=5)
        self.receivers_listbox.pack(fill=tk.X)
        
        btn_frame = ttk.Frame(self.send_tab)
        btn_frame.pack(pady=10)
        
        self.scan_btn = ttk.Button(btn_frame, text="Scan for Receivers",
                                 command=self.scan_network)
        self.scan_btn.pack(side=tk.LEFT, padx=5)
        
        self.send_btn = ttk.Button(btn_frame, text="Send File",
                                 command=self.send_file)
        self.send_btn.pack(side=tk.LEFT, padx=5)

    def start_receiving(self):
        self.receive_status.config(text="Listening...")
        self.receive_btn.config(state=tk.DISABLED)
        thread = threading.Thread(target=self.receive_thread)
        thread.daemon = True
        thread.start()

    def receive_thread(self):
        try:
            self.transfer.receive_file()
        except Exception as e:
            messagebox.showerror("Error", str(e))
        finally:
            self.root.after(0, self.reset_receive_status)

    def reset_receive_status(self):
        self.receive_status.config(text="Not Listening")
        self.receive_btn.config(state=tk.NORMAL)

    def stop_receiving(self):
        self.receive_status.config(text="Stopped")
        self.receive_btn.config(state=tk.NORMAL)

    def scan_network(self):
        self.receivers_listbox.delete(0, tk.END)
        self.status_var.set("Scanning network...")
        
        def scan():
            try:
                receivers = self.transfer.scan_network()
                self.root.after(0, self.update_receivers_list, receivers)
            except Exception as e:
                self.root.after(0, lambda: messagebox.showerror("Error", str(e)))
            finally:
                self.root.after(0, lambda: self.status_var.set("Ready"))
        
        thread = threading.Thread(target=scan)
        thread.daemon = True
        thread.start()

    def update_receivers_list(self, receivers):
        for ip in receivers:
            self.receivers_listbox.insert(tk.END, ip)

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
        self.status_var.set(f"Sending {filename} to {receiver}...")
        
        def send_thread():
            try:
                self.transfer.send_file(filename, receiver)  # Now passing both arguments
                self.root.after(0, lambda: self.status_var.set("File sent successfully!"))
                self.root.after(0, lambda: messagebox.showinfo("Success", "File sent successfully!"))
            except Exception as error:
                error_message = str(error)
                self.root.after(0, lambda: self.status_var.set(f"Error: {error_message}"))
                self.root.after(0, lambda: messagebox.showerror("Error", error_message))
            finally:
                self.root.after(0, lambda: self.status_var.set("Ready"))
        
        thread = threading.Thread(target=send_thread)
        thread.daemon = True
        thread.start()

if __name__ == "__main__":
    root = tk.Tk()
    app = FileTransferGUI(root)
    root.mainloop()