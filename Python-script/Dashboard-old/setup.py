# Dashboard/setup.py
from setuptools import setup, find_packages

setup(
    name="dashboard",
    version="0.1",
    packages=find_packages(),
    install_requires=[
        'python-dotenv',
        'pytest',
    ],
)