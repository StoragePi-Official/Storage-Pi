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
    printf -- "---------------------------------\n"
}

# Get the IP address of the machine
IP=$(hostname -I | cut -d' ' -f1)

# Install Apache2
print_separator_line
echo -n "$(print_action_icon '+') "
echo "Installing Apache2..."
sudo apt-get update
sudo apt-get install -y apache2 > /dev/null 2>&1

# Install PHP
print_separator_line
echo -n "$(print_action_icon '+') "
echo "Installing PHP..."
sudo apt-get update
sudo apt-get install -y php > /dev/null 2>&1

# Install FFMPEG
print_separator_line
echo -n "$(print_action_icon '+') "
echo "Installing FFMPEG..."
sudo apt-get update
sudo apt-get install -y ffmpeg > /dev/null 2>&1

# Navigate to /var/www/html
cd /var/www/html

# Create Storage-Pi directory
print_separator_line
echo -n "$(print_action_icon '+') "
echo "Creating Storage-Pi directory..."
mkdir -p Storage-Pi

# Navigate into the Storage-Pi directory
cd Storage-Pi

# Clone or replace Storage-Pi repository
print_separator_line
echo -n "$(print_action_icon '+') "
echo "Cloning or replacing Storage-Pi repository..."
git clone https://github.com/StoragePi-Official/Storage-Pi.git . > /dev/null 2>&1

# Echo a message indicating successful installation with an emoji
echo -e "\n\e[32m✅ StoragePi successfully installed.\e[0m"
echo -e "\e[33mℹ️ You can access the dashboard at http://$IP/Storage-Pi/HTML/\e[0m"

# Set permissions to write/read for all users in /var directory
sudo chmod -R 777 /var
