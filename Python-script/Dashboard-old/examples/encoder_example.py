# examples/encoder_example.py
import sys
from pathlib import Path
import os

# Add the parent directory to sys.path to allow imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from utils.encoder import SecureEncoder

def main():
    """Example usage of SecureEncoder"""
    try:
        # Initialize encoder
        encoder = SecureEncoder(encryption_key="your_secure_key")
        
        # Sample sensitive data
        sensitive_data = {
            "user_id": "12345",
            "content": "sensitive information",
            "metadata": {
                "timestamp": "2024-03-20T10:00:00",
                "category": "test"
            }
        }
        
        print("1. Original data:", sensitive_data)
        
        # Encode data
        encoded = encoder.encode_data(sensitive_data)
        print("\n2. Encoded data:", encoded[:50] + "..." if len(encoded) > 50 else encoded)
        
        # Decode data
        decoded = encoder.decode_data(encoded)
        print("\n3. Decoded data:", decoded)
        
        # Write to file
        output_path = Path("data/encoded/test.enc")
        output_path.parent.mkdir(parents=True, exist_ok=True)
        encoder.secure_file_write(sensitive_data, output_path)
        print(f"\n4. Data written to file: {output_path}")
        
        # Read from file
        read_data = encoder.secure_file_read(output_path)
        print("\n5. Data read from file:", read_data)
        
        print("\nAll operations completed successfully!")
        
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    main()