<?php
// Set PHP settings dynamically
ini_set('upload_max_filesize', '0');
ini_set('post_max_size', '0');
ini_set('max_file_uploads', '20');
ini_set('upload_tmp_dir', '/tmp');
ini_set('file_uploads', 'On');
ini_set('max_execution_time', '300');
ini_set('memory_limit', '128M');

// Get the current directory of the script
$currentDir = dirname(__FILE__);

// Remove "../" from file path to prevent directory traversal
$filePath = preg_replace('/\.\.\//', '', $_POST['filePath']);
$fileName = basename($_FILES["file"]["name"]);
$directory = $_POST['directory'];

// Check if file path is provided
if (isset($_FILES['file']) && !empty($filePath)) {
    $file = $_FILES['file'];

    // Directory where the file will be uploaded
    $uploadDir = "$currentDir/User/Files/$directory/";

    // Check if directory is writable
    if (!is_writable($uploadDir)) {
        echo "Error: Upload directory is not writable. Please check directory permissions or ownership.";
        exit;
    }

    // Create directory if it doesn't exist
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Include the file name in the upload directory path
    $targetFile = $uploadDir . $fileName;

    // Upload the file
    if (move_uploaded_file($file['tmp_name'], $targetFile)) {
        // Check if file uploaded successfully
        if (file_exists($targetFile)) {
            echo "File uploaded successfully.";
        } else {
            echo "Error: File upload failed.";
        }
    } else {
        // Display upload error
        echo "Error uploading file: " . $file['error'];
    }
} else {
    echo "Invalid file path.";
}

// Find and modify PHP.ini as root
$phpIniPath = '/etc/php/';
$phpIniFiles = glob($phpIniPath . 'php.ini', GLOB_BRACE);

if (!empty($phpIniFiles)) {
    foreach ($phpIniFiles as $phpIniFile) {
        $output = shell_exec("sudo chmod 777 $phpIniFile");
        if (strpos($output, 'Operation not permitted') !== false) {
            echo "Error: Unable to modify PHP.ini. Please ensure you have the necessary permissions.";
            exit;
        } else {
            $configContent = file_get_contents($phpIniFile);
            // Modify the PHP settings in $configContent as needed
            // Save the modified content back to the PHP.ini file
            // Example modification:
            $configContent = str_replace('upload_max_filesize = 2M', 'upload_max_filesize = 100M', $configContent);
             file_put_contents($phpIniFile, $configContent);
        }
    }
} else {
    echo "Error: PHP.ini file not found in $phpIniPath.";
}
?>
