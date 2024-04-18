<?php
// Function to generate a thumbnail image for a video file
function generateVideoThumbnail($videoPath) {
    // Define the directory for the generated thumbnails
    $thumbnailDir = dirname(__DIR__) . '/Resources/Thumbnails/';

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

    // Command to generate the thumbnail using FFMPEG
    $ffmpegCommand = "ffmpeg -i {$videoPath} -ss 00:00:01.000 -vframes 1 {$thumbnailPath} -hide_banner";

    // Execute the FFMPEG command
    exec($ffmpegCommand, $output, $returnCode);

    // Check if thumbnail generation was successful
    if ($returnCode === 0) {
        return $thumbnailPath;
    } else {
        return false;
    }
}

// Check if a video file path is provided via POST
if (isset($_POST['videoPath'])) {
    $videoPath = $_POST['videoPath'];

    // Generate the thumbnail for the video
    $thumbnail = generateVideoThumbnail($videoPath);

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
