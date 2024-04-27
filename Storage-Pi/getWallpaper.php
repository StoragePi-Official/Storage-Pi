<?php
// Set the path to the configs.json file
$configsFilePath = __DIR__ . "/User/Configs/configs.json";

// Load the contents of the configs.json file
$configsData = json_decode(file_get_contents($configsFilePath), true);

// Get the value of the "wallpaper" key from the configs data
$wallpaperPath = $configsData['wallpaper'];

// Respond with the wallpaper path
echo $wallpaperPath;
?>
