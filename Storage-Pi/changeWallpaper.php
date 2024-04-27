<?php
// Set the path to the configs.json file
$configsFilePath = __DIR__ . "/User/Configs/configs.json";

// Check if the POST parameter "wallpaperPath" is set
if(isset($_POST['wallpaperPath'])) {
    // Get the value of "wallpaperPath" from POST
    $wallpaperPath = $_POST['wallpaperPath'];
} else {
    // If "wallpaperPath" is not set, default it to "default.png"
    $wallpaperPath = "default.png";
}

// Load the contents of the configs.json file
$configsData = json_decode(file_get_contents($configsFilePath), true);

// Update the "wallpaper" value in the configs data
$configsData['wallpaper'] = $wallpaperPath;

// Write the updated configs data back to the configs.json file
file_put_contents($configsFilePath, json_encode($configsData));

// Respond with a success message
echo "Wallpaper path updated successfully to: $wallpaperPath";
?>
