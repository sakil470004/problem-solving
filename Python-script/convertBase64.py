import base64
import os

def text_to_base64(text):
    """
    Convert text to base64 encoding.
    
    Args:
        text (str): The text to encode
        
    Returns:
        str: The base64 encoded string
        
    Raises:
        TypeError: If input is not a string
    """
    if not isinstance(text, str):
        raise TypeError("Input must be a string")
    
    # Convert string to bytes
    text_bytes = text.encode('utf-8')
    
    # Convert bytes to base64
    base64_bytes = base64.b64encode(text_bytes)
    
    # Convert base64 bytes back to string
    base64_string = base64_bytes.decode('utf-8')
    
    return base64_string

def file_to_base64(input_file, output_file=None):
    """
    Convert a text file to base64 encoding and optionally save to a file.
    
    Args:
        input_file (str): Path to the input text file
        output_file (str, optional): Path to save the base64 output. 
                                   If None, output is returned as string
    
    Returns:
        str: The base64 encoded string (if output_file is None)
        
    Raises:
        FileNotFoundError: If input file doesn't exist
        IOError: If there are issues reading/writing files
    """
    try:
        # Check if input file exists
        if not os.path.exists(input_file):
            raise FileNotFoundError(f"Input file not found: {input_file}")
        
        # Read the input file
        with open(input_file, 'r', encoding='utf-8') as file:
            text = file.read()
        
        # Convert to base64
        base64_string = text_to_base64(text)
        
        # Save to output file if specified
        if output_file:
            with open(output_file, 'w', encoding='utf-8') as file:
                file.write(base64_string)
            return f"Base64 content has been saved to {output_file}"
        
        return base64_string
    
    except Exception as e:
        raise IOError(f"Error processing file: {str(e)}")

def main():
    try:
        # Get input file path
        input_file = input("Enter the path to your text file: ")
        
        # Ask if user wants to save to file
        save_to_file = input("Do you want to save the output to a file? (yes/no): ").lower()
        
        if save_to_file.startswith('y'):
            output_file = input("Enter the path for the output file: ")
            result = file_to_base64(input_file, output_file)
            print("\nResult:", result)
        else:
            result = file_to_base64(input_file)
            print("\nBase64 encoded text:")
            print(result)
            
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    main()