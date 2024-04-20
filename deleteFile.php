<?php
// Get the current directory of the script
$currentDir = __DIR__;

// Get the file path from POST parameter
$filePath = str_replace('../', '', $_POST['filePath']);

// Check if the file path is provided
if (!empty($filePath)) {
    // Construct the absolute path of the file
    $absoluteFilePath = $currentDir . '/' . $filePath;

    // Check if the file exists
    if (file_exists($absoluteFilePath)) {
        // Attempt to delete the file
        if (unlink($absoluteFilePath)) {
            echo "File deleted successfully.";
        } else {
            echo "Error: Failed to delete the file.";
        }
    } else {
        echo "Error: File not found.";
    }
} else {
    echo "Error: Invalid file path.";
}
?>
