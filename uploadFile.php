<?php
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
?>
