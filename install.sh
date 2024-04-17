#!/bin/bash

# Function to print a green checkmark
print_green_checkmark() {
    printf "[\e[32m\u2713\e[0m]"
}

# Function to print an icon indicating an action
print_action_icon() {
    printf "[\e[33m$1\e[0m]"
}

# Function to print a separator line
print_separator_line() {
    cols=$(tput cols)
    sep=""
    for ((i=1; i<=cols; i++)); do
        sep="${sep}-"
    done
    printf -- "$sep\n"
}

# Check if Apache2 is installed
if ! command -v apache2 &> /dev/null
then
    print_separator_line
    echo -n "$(print_action_icon '+') "
    echo "Installing Apache2..."
    sudo apt-get update
    sudo apt-get install -y apache2
else
    print_separator_line
    echo -n "$(print_green_checkmark) "
    echo "Apache2 is already installed."
fi

# Check if PHP is installed
if ! command -v php &> /dev/null
then
    print_separator_line
    echo -n "$(print_action_icon '+') "
    echo "Installing PHP..."
    sudo apt-get update
    sudo apt-get install -y php
else
    print_separator_line
    echo -n "$(print_green_checkmark) "
    echo "PHP is already installed."
fi

# Navigate to /var/www/html
cd /var/www/html

# Check if Storage-Pi directory exists, if not create it
if [ ! -d "Storage-Pi" ]
then
    print_separator_line
    echo -n "$(print_action_icon '+') "
    echo "Creating Storage-Pi directory..."
    mkdir Storage-Pi
else
    print_separator_line
    echo -n "$(print_green_checkmark) "
    echo "Storage-Pi directory already exists."
fi

# Navigate into the Storage-Pi directory
cd Storage-Pi

# Clone the repository if it's not already cloned
if [ ! -d ".git" ]
then
    print_separator_line
    echo -n "$(print_action_icon '+') "
    echo "Cloning Storage-Pi repository..."
    git clone https://github.com/StoragePi-Official/Storage-Pi.git .
else
    print_separator_line
    echo -n "$(print_green_checkmark) "
    echo "Storage-Pi repository is already cloned."
fi

# Display current directory
echo "Current directory: $(pwd)"

# Echo the URL to access the cloned repository
echo "You can access the cloned repository at: http://localhost/Storage-Pi/HTML/index.html"

# Set permissions to write/read for all users in /var directory
sudo chmod -R 777 /var
