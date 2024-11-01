import tkinter as tk
from tkinter import ttk, filedialog, messagebox
from file_transfer import FileTransfer

class FileTransferGUI(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("File Transfer System")
        self.geometry("600x400")

        self.transfer = FileTransfer()

        # Create the main menu
        self.menubar = tk.Menu(self)
        self.config(menu=self.menubar)
        self.file_menu = tk.Menu(self.menubar)
        self.menubar.add_cascade(label="File", menu=self.file_menu)
        self.file_menu.add_command(label="Receive Files", command=self.receive_files)
        self.file_menu.add_command(label="Send File", command=self.select_file_to_send)
        self.file_menu.add_separator()
        self.file_menu.add_command(label="Exit", command=self.quit)

        # Create the main content area
        self.content_frame = ttk.Frame(self)
        self.content_frame.pack(fill="both", expand=True, padx=20, pady=20)

        self.receivers_label = ttk.Label(self.content_frame, text="Available Receivers:")
        self.receivers_label.pack(anchor="w")

        self.receivers_listbox = tk.Listbox(self.content_frame, width=40, height=10)
        self.receivers_listbox.pack(side="left", fill="both", expand=True)

        self.receivers_scrollbar = ttk.Scrollbar(self.content_frame, orient="vertical", command=self.receivers_listbox.yview)
        self.receivers_scrollbar.pack(side="right", fill="y")
        self.receivers_listbox.config(yscrollcommand=self.receivers_scrollbar.set)

        self.progress_bar = ttk.Progressbar(self.content_frame, mode="determinate")
        self.progress_bar.pack(fill="x", pady=10)

        self.status_label = ttk.Label(self.content_frame, text="")
        self.status_label.pack(fill="x", pady=5)

        self.scan_button = ttk.Button(self.content_frame, text="Scan Network", command=self.scan_network)
        self.scan_button.pack(side="left", padx=5)

        self.send_button = ttk.Button(self.content_frame, text="Send File", command=self.select_file_to_send)
        self.send_button.pack(side="left", padx=5)

    def scan_network(self):
        self.status_label.config(text="Scanning network for receivers...")
        self.receivers_listbox.delete(0, tk.END)
        active_ips = self.transfer.scan_network()
        for ip in active_ips:
            self.receivers_listbox.insert(tk.END, ip)
        self.status_label.config(text="Ready")

    def receive_files(self):
        self.status_label.config(text="Waiting for incoming files...")
        self.transfer.receive_file()
        self.status_label.config(text="Ready")

    def select_file_to_send(self):
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
        if filename:
            receiver = self.receivers_listbox.get(selected[0])
            self.status_label.config(text=f"Sending {filename} to {receiver}...")
            self.transfer.send_file(filename, receiver)
            self.status_label.config(text="File sent successfully!")

if __name__ == "__main__":
    app = FileTransferGUI()
    app.mainloop()