# script written date: 22-10-2024
import base64
import ast
# need install this package
import autopep8

def decompress_code(compressed_code):
    # Decode the base64 encoded string
    return base64.b64decode(compressed_code).decode('utf-8')

def unminify_code(code):
    # Parse the code into an AST
    tree = ast.parse(code)
    # Convert the AST back to source code
    unminified = ast.unparse(tree)
    # Use autopep8 to format the code according to PEP 8
    formatted = autopep8.fix_code(unminified)
    return formatted

def expand_code(compressed_code):
    # Decompress the code
    decompressed = decompress_code(compressed_code)
    # Unminify and format the code
    expanded = unminify_code(decompressed)
    return expanded

# New, clean example
compressed_code = "ZGVmIGdlbmVyYXRlX3dpc2RvbSgpOgogICAgcmV0dXJuICJXaXNkb20gaXMgdGhlIHJld2FyZCBvZiBleHBlcmllbmNlIGFuZCBzaG91bGQgYmUgc2hhcmVkLiIKCmRlZiBtYWluKCk6CiAgICBwcmludCgiV2VsY29tZSB0byB0aGUgSmV3aXNoIFdpc2RvbSBHZW5lcmF0b3IhIikKICAgIHByaW50KGdlbmVyYXRlX3dpc2RvbSgpKQoKaWYgX19uYW1lX18gPT0gIl9fbWFpbl9fIjoKICAgIG1haW4oKQ=="

try:
    expanded_code = expand_code(compressed_code)
    print(expanded_code)
except Exception as e:
    print(f"An error occurred: {e}")