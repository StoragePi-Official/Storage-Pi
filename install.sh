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

# Modify PHP.ini to allow unlimited max upload size and unlimited max upload files
php_version=$(php -r 'echo PHP_MAJOR_VERSION . "." . PHP_MINOR_VERSION;')
php_ini_path="/etc/php/${php_version}/apache2/php.ini"
sudo cp "$php_ini_path" "${php_ini_path}.bak" # Backup PHP.ini
sudo sed -i -e 's/^upload_max_filesize\s*=\s*[0-9]\+/upload_max_filesize = 999999999M/g' "$php_ini_path"
sudo sed -i -e 's/^post_max_size\s*=\s*[0-9]\+/post_max_size = 999999999M/g' "$php_ini_path"
sudo sed -i -e 's/^max_file_uploads\s*=\s*[0-9]\+/max_file_uploads = 99/g' "$php_ini_path"

sudo service apache2 restart

echo -e "\n\e[32m✅ PHP.ini file modified successfully to allow unlimited upload size.\e[0m"

# Echo a message indicating successful installation with an emoji
echo -e "\n\e[32m✅ StoragePi successfully installed.\e[0m"
echo -e "\e[33mℹ️ You can access the dashboard at http://$IP/Storage-Pi/HTML/\e[0m"

# Set permissions to write/read for all users in /var directory
sudo chmod -R 777 /var
