<?php
// Function to generate a thumbnail image for a video file
function generateVideoThumbnail($videoPath) {
    // Define the directory for the generated thumbnails
    $thumbnailDir = dirname(__DIR__) . '/Storage-Pi/Resources/Thumbnails/';

    // Create the directory if it doesn't exist
    if (!file_exists($thumbnailDir)) {
        mkdir($thumbnailDir, 0777, true);
    }

    // Generate a unique filename for the thumbnail
    $thumbnailFilename = pathinfo($videoPath, PATHINFO_FILENAME) . '.jpg';
    $thumbnailPath = $thumbnailDir . $thumbnailFilename;

    // Check if the thumbnail already exists
    if (file_exists($thumbnailPath)) {
        return $thumbnailPath;
    }

    // Add current directory before the video path
    $currentDir = dirname(__FILE__);
    $videoPath = $currentDir . '/' . $videoPath;

    // Remove ".." from the video path
    $videoPath = str_replace('..', '', $videoPath);

    // Command to generate the thumbnail using FFMPEG
    $ffmpegCommand = "ffmpeg -i \"{$videoPath}\" -ss 00:00:01.000 -vframes 1 \"{$thumbnailPath}\" -hide_banner";

    // Debugging: Print out the command being executed
    echo "Executing command: $ffmpegCommand\n";

    // Execute the FFMPEG command
    exec($ffmpegCommand, $output, $returnCode);

    // Debugging: Print out the output and return code
    echo "Output: " . print_r($output, true) . "\n";
    echo "Return Code: $returnCode\n";

    // Check if thumbnail generation was successful
    if ($returnCode === 0) {
        return $thumbnailPath;
    } else {
        return false;
    }
}

// Check if a video file path is provided via GET
if (isset($_GET['fileName'])) {
    $videoPath = $_GET['fileName'];

    // Generate the thumbnail for the video
    $thumbnail = generateVideoThumbnail($videoPath);

    // Remove the "/var/www/html/Storage-Pi" part from the thumbnail path
    $thumbnail = str_replace("/var/www/html/Storage-Pi", "../", $thumbnail);

    // Return the path to the thumbnail image
    if ($thumbnail) {
        echo $thumbnail;
    } else {
        echo "Thumbnail generation failed.";
    }
} else {
    echo "No video path provided.";
}
?>
