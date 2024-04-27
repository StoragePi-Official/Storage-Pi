<?php
// Check if the file path and content are provided
if (isset($_POST['filePath']) && isset($_POST['content'])) {
    // Sanitize the file path to prevent directory traversal
    $filePath = preg_replace('/\.\.\//', '', $_POST['filePath']);

    // Get the content from the POST data
    $content = $_POST['content'];

    // Write the content to the file
    $bytesWritten = file_put_contents($filePath, $content);

    // Check if the file was successfully written
    if ($bytesWritten !== false) {
        echo "File saved successfully.";
    } else {
        echo "Failed to save file.";
    }
} else {
    // If file path or content is not provided, return an error message
    echo "File path and content must be provided.";
}
?>
