<?php
// Remove "../" from file path to prevent directory traversal
$filePath = preg_replace('/\.\.\//', '', $_POST['filePath']);
$fileName = basename($_FILES["file"]["name"]);
$uploadDir = "./User/Files/$directory/$fileName";

// Check if file path is provided
if (isset($_FILES['file']) && !empty($filePath)) {
    $file = $_FILES['file'];
    $directory = $_POST['directory'];

    // Directory where the file will be uploaded
    $uploadDir = "./User/Files/$directory/";

    // Create directory if it doesn't exist
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Include the file name in the upload directory path
    $targetFile = $uploadDir . $file['name'];

    // Upload the file
    if (move_uploaded_file($file['tmp_name'], $targetFile)) {
        echo "File uploaded successfully.";
    } else {
        echo "Error uploading file: " . $_FILES["file"]["error"];
    }
} else {
    echo "Invalid file path.";
}
?>
