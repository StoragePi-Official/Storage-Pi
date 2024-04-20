<?php
// Function to replace "../" with "DIR/"
function replaceDir($path) {
    $currentDir = getcwd(); // Get the current working directory
    return str_replace('../', $currentDir . '/', $path);
}

// Check if both parameters are provided
if(isset($_POST['oldFilePath']) && isset($_POST['newFilePath'])) {
    // Retrieve the old file path and new file name
    $oldFilePath = replaceDir($_POST['oldFilePath']);
    $newFileName = replaceDir($_POST['newFilePath']);

    // Debugging: Print received parameters
    echo "Old File Path: " . $oldFilePath . "\n";
    echo "New File Name: " . $newFileName . "\n";

    // Check if the old file exists
    if (file_exists($oldFilePath)) {
        // Rename the file
        if(rename($oldFilePath, $newFileName)) {
            echo json_encode(array('success' => true, 'message' => 'File renamed successfully.'));
        } else {
            echo json_encode(array('success' => false, 'message' => 'Failed to rename file.'));
        }
    } else {
        echo json_encode(array('success' => false, 'message' => 'Old file does not exist.'));
    }
} else {
    // Parameters not provided
    echo json_encode(array('success' => false, 'message' => 'Parameters missing.'));
}
?>
