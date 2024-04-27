<?php

// Function to get all files and folders recursively
function getFilesAndFolders($dir) {
    $files = [];
    $folders = [];

    // Open directory
    if ($handle = opendir($dir)) {
        // Iterate through directory
        while (false !== ($entry = readdir($handle))) {
            if ($entry != "." && $entry != "..") {
                $path = $dir . '/' . $entry;
                // Check if entry is a directory
                if (is_dir($path)) {
                    // Recursively call function for subdirectory
                    $folders[$entry] = getFilesAndFolders($path);
                } else {
                    // Add file to files array
                    $files[] = $entry;
                }
            }
        }
        closedir($handle);
    }

    // Combine files and folders into single array
    $result = array_merge($files, $folders);

    return $result;
}

// Define directory path
$directory = "./User/Files/";

// Call function to get files and folders
$data = getFilesAndFolders($directory);

// Return JSON response
header('Content-Type: application/json');
echo json_encode($data);
?>
