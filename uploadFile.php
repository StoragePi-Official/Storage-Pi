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

    // Maximum number of upload attempts
    $maxAttempts = 3;
    $attempt = 1;

    // Upload the file with retries
    while ($attempt <= $maxAttempts) {
        if (move_uploaded_file($file['tmp_name'], $targetFile)) {
            echo "File uploaded successfully.";
            break; // Exit the loop if upload is successful
        } else {
            echo "Error uploading file. Attempt $attempt of $maxAttempts. Retrying...<br>";
            $attempt++;
            usleep(1000000); // Wait for 1 second before retrying (1,000,000 microseconds = 1 second)
        }
    }

    // If all attempts fail
    if ($attempt > $maxAttempts) {
        echo "Failed to upload file after $maxAttempts attempts.";
    }
} else {
    echo "Invalid file path.";
}
?>
