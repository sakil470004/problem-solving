# utils/encoder.py
import base64
import os
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from datetime import datetime
import json
import logging
from typing import Dict, Any, Union
from pathlib import Path

class SecureEncoder:
    """Handles secure encoding and encryption of data"""
    
    def __init__(self, encryption_key: str):
        """
        Initialize the secure encoder
        Args:
            encryption_key (str): Base encryption key from configuration
        """
        self._setup_logging()
        self.fernet = self._initialize_encryption(encryption_key)
        self.logger.info("SecureEncoder initialized successfully")
        
    def _setup_logging(self) -> None:
        """Configure logging for the encoder"""
        self.logger = logging.getLogger('SecureEncoder')
        
    def _initialize_encryption(self, key: str) -> Fernet:
        """
        Initialize Fernet encryption with key derivation
        Args:
            key (str): Base encryption key
        Returns:
            Fernet: Initialized Fernet instance
        """
        try:
            # Generate a secure salt
            salt = self._generate_salt()
            
            # Create key derivation function
            kdf = PBKDF2HMAC(
                algorithm=hashes.SHA256(),
                length=32,
                salt=salt,
                iterations=100000,
            )
            
            # Derive the key
            derived_key = base64.urlsafe_b64encode(kdf.derive(key.encode()))
            
            return Fernet(derived_key)
            
        except Exception as e:
            self.logger.error(f"Error initializing encryption: {str(e)}")
            raise
            
    def _generate_salt(self) -> bytes:
        """
        Generate a secure salt for key derivation
        Returns:
            bytes: Generated salt
        """
        salt_file = Path("utils/salt.bin")
        
        if salt_file.exists():
            return salt_file.read_bytes()
        else:
            salt = os.urandom(16)
            salt_file.write_bytes(salt)
            return salt
            
    def encode_data(self, data: Dict[str, Any]) -> str:
        """
        Encode and encrypt data
        Args:
            data (Dict[str, Any]): Data to encode
        Returns:
            str: Encoded and encrypted data
        """
        try:
            # Add metadata
            data_with_metadata = {
                "content": data,
                "timestamp": datetime.now().isoformat(),
                "version": "1.0"
            }
            
            # Convert to JSON and encrypt
            json_data = json.dumps(data_with_metadata)
            encrypted = self.fernet.encrypt(json_data.encode())
            
            # Encode to base64
            encoded = base64.urlsafe_b64encode(encrypted).decode()
            
            self.logger.debug(f"Data encoded successfully")
            return encoded
            
        except Exception as e:
            self.logger.error(f"Error encoding data: {str(e)}")
            raise
            
    def decode_data(self, encoded_data: str) -> Dict[str, Any]:
        """
        Decrypt and decode data
        Args:
            encoded_data (str): Encoded data to decrypt
        Returns:
            Dict[str, Any]: Decrypted data
        """
        try:
            # Decode from base64
            encrypted = base64.urlsafe_b64decode(encoded_data.encode())
            
            # Decrypt data
            decrypted = self.fernet.decrypt(encrypted)
            
            # Parse JSON and extract content
            data = json.loads(decrypted)
            
            self.logger.debug(f"Data decoded successfully")
            return data["content"]
            
        except Exception as e:
            self.logger.error(f"Error decoding data: {str(e)}")
            raise
            
    def verify_data_integrity(self, encoded_data: str) -> bool:
        """
        Verify the integrity of encoded data
        Args:
            encoded_data (str): Encoded data to verify
        Returns:
            bool: True if data is valid
        """
        try:
            decoded_data = self.decode_data(encoded_data)
            return isinstance(decoded_data, dict)
        except Exception:
            return False
            
    def secure_file_write(self, data: Dict[str, Any], filepath: Path) -> None:
        """
        Securely write data to file
        Args:
            data (Dict[str, Any]): Data to write
            filepath (Path): Path to write to
        """
        try:
            encoded_data = self.encode_data(data)
            
            # Write to temporary file first
            temp_file = filepath.with_suffix('.tmp')
            temp_file.write_text(encoded_data)
            
            # Rename temporary file to target file
            temp_file.replace(filepath)
            
            self.logger.debug(f"Data written securely to {filepath}")
            
        except Exception as e:
            self.logger.error(f"Error writing file: {str(e)}")
            if temp_file.exists():
                temp_file.unlink()
            raise
            
    def secure_file_read(self, filepath: Path) -> Dict[str, Any]:
        """
        Securely read data from file
        Args:
            filepath (Path): Path to read from
        Returns:
            Dict[str, Any]: Decoded data
        """
        try:
            encoded_data = filepath.read_text()
            return self.decode_data(encoded_data)
            
        except Exception as e:
            self.logger.error(f"Error reading file: {str(e)}")
            raise