#!/bin/bash

# Check if Apache2 is installed
if ! command -v apache2 &> /dev/null
then
    echo "Installing Apache2"
    echo "\n"
    sudo apt-get update
    sudo apt-get install -y apache2
else
    echo ""
fi

# Check if PHP is installed
if ! command -v php &> /dev/null
then
    echo "Installing PHP"
    echo "\n"
    sudo apt-get update
    sudo apt-get install -y php
else
    echo ""
fi

# Navigate to /var/www/html
cd /var/www/html

# Check if Storage-Pi directory exists, if not create it
if [ ! -d "Storage-Pi" ]
then
    echo "Creating files"
    echo "\n"
    mkdir Storage-Pi
else
    echo ""
fi

# Navigate into the Storage-Pi directory
cd Storage-Pi

# Clone the repository if it's not already cloned
if [ ! -d ".git" ]
then
    echo "Cloning Storage-Pi repository"
    echo "\n"
    git clone https://github.com/StoragePi-Official/Storage-Pi.git .
else
    echo ""
fi

# Display current directory
echo "Current directory: $(pwd)"

# Echo the URL to access the cloned repository
echo "You can access the cloned repository at: http://localhost/Storage-Pi/HTML/index.html"

# Set permissions to write/read for all users in /var directory
sudo chmod -R 777 /var
