# tests/test_encoder.py
import pytest
from pathlib import Path
import json
from utils.encoder import SecureEncoder

@pytest.fixture
def encoder():
    """Create encoder instance for testing"""
    return SecureEncoder("test_encryption_key")

@pytest.fixture
def sample_data():
    """Sample data for testing"""
    return {
        "user_id": "12345",
        "content": "Test sensitive data",
        "metadata": {
            "type": "test",
            "priority": "high"
        }
    }

def test_encoder_initialization(encoder):
    """Test encoder initialization"""
    assert encoder is not None
    assert encoder.fernet is not None

def test_encode_decode(encoder, sample_data):
    """Test encoding and decoding data"""
    # Encode data
    encoded = encoder.encode_data(sample_data)
    assert isinstance(encoded, str)
    
    # Decode data
    decoded = encoder.decode_data(encoded)
    assert decoded == sample_data

def test_data_integrity(encoder, sample_data):
    """Test data integrity verification"""
    encoded = encoder.encode_data(sample_data)
    assert encoder.verify_data_integrity(encoded) is True
    
    # Test with invalid data
    with pytest.raises(Exception):
        encoder.decode_data("invalid_data")

def test_file_operations(encoder, sample_data, tmp_path):
    """Test secure file operations"""
    # Create test file path
    test_file = tmp_path / "test_data.enc"
    
    # Write data
    encoder.secure_file_write(sample_data, test_file)
    assert test_file.exists()
    
    # Read data
    read_data = encoder.secure_file_read(test_file)
    assert read_data == sample_data

def test_salt_generation(encoder):
    """Test salt generation and persistence"""
    salt_file = Path("utils/salt.bin")
    assert salt_file.exists()
    assert len(salt_file.read_bytes()) == 16

def test_error_handling(encoder):
    """Test error handling"""
    with pytest.raises(Exception):
        encoder.decode_data("invalid_encoded_data")
        
    with pytest.raises(Exception):
        encoder.secure_file_read(Path("nonexistent_file.enc"))

if __name__ == "__main__":
    pytest.main([__file__])