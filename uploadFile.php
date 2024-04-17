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

    // Check if directory exists, if not create it
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Check if directory is writable
    if (!is_writable($uploadDir)) {
        // Attempt to change directory permissions
        if (!chmod($uploadDir, 0777)) {
            // Retry as root
            $output = shell_exec("sudo chmod 777 $uploadDir 2>&1");
            if (strpos($output, 'Operation not permitted') !== false) {
                echo "Error: Unable to make directory writable. Please contact the server administrator.";
                exit;
            }
        }
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
?>
