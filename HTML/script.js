// Function to update clock
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('clock').textContent = timeString;
}

// Function to toggle file explorer visibility and fetch files and folders
function toggleFileExplorer() {
    const fileExplorer = document.getElementById('fileExplorer');
    const fileExplorerContent = document.getElementById('fileExplorerContent');

    // Toggle class to show/hide file explorer
    fileExplorer.classList.toggle('show');

    // Apply animation when showing file explorer
    if (fileExplorer.classList.contains('show')) {
        fileExplorerContent.style.animation = 'zoomIn 0.2s forwards'; // Add zoom animation
        fetch('../getFilesAndFolders.php')
            .then(response => response.json())
            .then(data => {
                populateFileExplorer(data);
            })
            .catch(error => {
                console.error('Error fetching files and folders:', error);
            });
        
        // Make file explorer draggable
        dragElement(fileExplorer);
    } else {
        // Clear animation when hiding file explorer
        fileExplorerContent.style.animation = 'none';
    }
}

// Function to open the control panel
function openControlPanel() {
    const controlPanel = document.getElementById('controlPanel');
    controlPanel.style.display = 'block';
    controlPanel.style.animation = 'zoomIn 0.2s forwards'; // Add zoom animation
    dragElement(controlPanel);
    const closeButton = createCloseButton(controlPanel);
}

// Function to close the control panel
function closeControlPanel() {
    const controlPanel = document.getElementById('controlPanel');
    controlPanel.style.animation = 'zoomOut 0.2s forwards'; // Add zoom animation
    // Remove the control panel from the DOM after animation completes
    setTimeout(() => {
        controlPanel.style.display = 'none';
    }, 200); // Wait for the animation duration
}

// Function to populate file explorer with files and folders
function populateFileExplorer(data) {
    const fileExplorerContent = document.getElementById('fileExplorerContent');
    fileExplorerContent.innerHTML = ''; // Clear previous content

    // Filter out keys with array values
    const keysWithArrays = Object.entries(data).filter(([key, value]) => Array.isArray(value));

    keysWithArrays.forEach(([key, value]) => {
        const sectionTitle = document.createElement('div');
        sectionTitle.textContent = key;
        sectionTitle.classList.add('section-title'); // Add class for styling
        fileExplorerContent.appendChild(sectionTitle);

        // Create a container for the array items
        const arrayContent = document.createElement('div');
        arrayContent.classList.add('array-content'); // Add class for styling
        arrayContent.style.display = 'none'; // Hide by default

        // Create a grid container for the files
        const gridContainer = document.createElement('div');
        gridContainer.classList.add('file-grid-container');

        value.forEach(item => {
            const listItem = document.createElement('div');
            listItem.className = "listItem";
            listItem.style.maxWidth = '150px'; // Set max width for file container

            // Check if the file is an image and add a preview
            if (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(item)) {
                const imgPreview = document.createElement('img');
                imgPreview.src = `../User/Files/${key}/${item}`;
                imgPreview.classList.add('file-preview'); // Add class for styling
                imgPreview.style.maxWidth = '100px'; // Set max width
                imgPreview.style.maxHeight = '100px'; // Set max height
                listItem.appendChild(imgPreview);
            }

            // Create a container for the file name
            const fileNameContainer = document.createElement('div');
            fileNameContainer.style.maxWidth = '120px'; // Set max width for file name container
            fileNameContainer.style.wordWrap = 'break-word'; // Allow text to wrap

            // Create the text element for the file name
            const fileName = document.createElement('span');
            if (item.length > 40) {
                fileName.textContent = item.slice(0, 37) + '...'; // Truncate file name if it exceeds 40 characters
            } else {
                fileName.textContent = item;
            }
            fileName.classList.add('file-name'); // Add class for styling
            fileNameContainer.appendChild(fileName);
            listItem.appendChild(fileNameContainer);

            // Add click event listener to each file
            listItem.addEventListener('click', function() {
                const filePath = `../User/Files/${key}/${item}`;
                openFile(filePath);
            });

            gridContainer.appendChild(listItem);
        });

        arrayContent.appendChild(gridContainer);
        fileExplorerContent.appendChild(arrayContent);

        // Add a divider line between folders and files
        const divider = document.createElement('hr');
        fileExplorerContent.appendChild(divider);

        // Add click event listener to section title
        sectionTitle.addEventListener('click', function() {
            // Close all other folders
            const allArrayContents = document.querySelectorAll('.array-content');
            allArrayContents.forEach(content => {
                if (content !== arrayContent) {
                    content.style.display = 'none';
                }
            });
            // Toggle display of array content
            arrayContent.style.display = arrayContent.style.display === 'none' ? 'block' : 'none';
        });
    });

    // Add button for uploading files
    const uploadButton = document.createElement('button');
    uploadButton.classList.add('upload-button');
    uploadButton.style.position = 'absolute';
    uploadButton.style.top = '10px'; // Adjust the top position
    uploadButton.style.right = '10px'; // Adjust the right position
    uploadButton.style.border = 'none';
    uploadButton.style.background = 'none';
    uploadButton.addEventListener('click', handleUpload);
    
    // Create the image element
    const uploadIcon = document.createElement('img');
    uploadIcon.src = '../Resources/Icons/uploadFile.png';
    uploadIcon.alt = 'Upload';
    uploadIcon.style.width = '30px'; // Adjust the width of the image
    uploadIcon.style.height = '30px'; // Adjust the height of the image
    
    // Append the image to the button
    uploadButton.appendChild(uploadIcon);
    
    fileExplorerContent.appendChild(uploadButton);
}

// Function to handle file upload
function handleUpload() {
    // Open file dialog to choose a file
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            // Ask user to choose a directory
            const directory = prompt('Enter directory name:');
            if (directory) {
                // Perform file upload
                uploadFile(file, directory, "" + directory);
            } else {
                alert('No directory selected.');
            }
        }
    });
    fileInput.click();
}

// Function to handle file upload
function handleUpload() {
    // Open file dialog to choose a file
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            // Ask user to choose a directory
            const directory = prompt('Enter directory name:');
            if (directory) {
                // Perform file upload
                uploadFile(file, directory, "" + directory);
            } else {
                alert('No directory selected.');
            }
        }
    });
    fileInput.click();
}

// Function to upload file to server
function uploadFile(file, directory, filePath) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('directory', directory);
    formData.append('filePath', filePath);

    fetch('../uploadFile.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert('File uploaded successfully!');
        } else {
            throw new Error('Failed to upload file.');
        }
    })
    .catch(error => {
        console.error('Error uploading file:', error);
        alert('Error uploading file. Please try again.');
    });
}

// Function to open file
function openFile(filePath) {
    // Check if the file is an image, video, or text file
    if (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(filePath)) {
        // Create popup container for image
        const popupContainer = document.createElement('div');
        popupContainer.classList.add('image-popup');

        // Create image element
        const popupImage = document.createElement('img');
        popupImage.src = filePath;
        popupImage.alt = 'Image';
        popupImage.onload = function() {
            // Get the width and height of the image
            const imageWidth = popupImage.width;
            const imageHeight = popupImage.height;

            // Set the width and height of the popup container
            popupContainer.style.width = Math.min(imageWidth + 20, 500) + 'px'; // Increased by 20 pixels, max 500px
            popupContainer.style.height = Math.min(imageHeight + 20, 500) + 'px'; // Increased by 20 pixels, max 500px

            // Align the content to the bottom
            popupImage.style.position = "absolute";
            popupImage.style.verticalAlign = 'bottom';
            popupImage.style.top = "50px";
        };
        popupImage.style.maxWidth = '500px'; // Set maximum width
        popupImage.style.height = 'auto'; // Auto height to maintain aspect ratio
        popupImage.style.maxHeight = '500px'; // Set maximum height

        // Create close button
        const closeButton = createCloseButton(popupContainer);

        // Append image and close button to the popup container
        popupContainer.appendChild(popupImage);
        popupContainer.appendChild(closeButton);

        // Set styles for the popup container
        setPopupStyles(popupContainer);

        // Make popup draggable
        dragElement(popupContainer);

        // Append popup container to the body
        document.body.appendChild(popupContainer);
    } else if (/\.(mp4|webm|ogg)$/i.test(filePath)) {
        // Create popup container for video
        const popupContainer = document.createElement('div');
        popupContainer.classList.add('video-popup');

        // Create video element
        const popupVideo = document.createElement('video');
        popupVideo.src = filePath;
        popupVideo.controls = true;

        // Set maximum width and height for the video
        popupVideo.style.maxWidth = '500px';
        popupVideo.style.maxHeight = '500px';

        // Create close button
        const closeButton = createCloseButton(popupContainer);

        // Append video and close button to the popup container
        popupContainer.appendChild(popupVideo);
        popupContainer.appendChild(closeButton);

        // Set styles for the popup container
        setPopupStyles(popupContainer);

        // Make popup draggable
        dragElement(popupContainer);

        // Append popup container to the body
        document.body.appendChild(popupContainer);
    } else if (/\.(txt|text)$/i.test(filePath)) {
        // If it's a text file, open in text editor
        fetch(filePath)
            .then(response => response.text())
            .then(text => {
                openTextEditor(text, filePath); // Pass file path to the text editor function
            })
            .catch(error => {
                console.error('Error fetching text file:', error);
            });
    } else {
        // For other file types, you can define different behavior here
        alert('This file type is not supported.');
    }
}

// Function to create a close button
function createCloseButton(popupContainer) {
    const closeButton = document.createElement('button');
    closeButton.style.position = 'absolute';
    closeButton.style.top = '0px';
    closeButton.style.left = '95%';
    closeButton.style.width = '40px'; // Adjusted size
    closeButton.style.height = '40px'; // Adjusted size
    closeButton.style.border = 'none'; // Remove border
    closeButton.style.background = 'none'; // Remove background

    closeButton.classList.add('close-button');
    const closeIcon = document.createElement('img');
    closeIcon.src = '../Resources/Icons/close.png';
    closeButton.appendChild(closeIcon);
    closeButton.addEventListener('click', function() {
        popupContainer.remove();
    });

    // Set styles for the close icon
    closeIcon.style.position = 'absolute';
    closeIcon.style.top = '50%'; // Center vertically
    closeIcon.style.left = '50%'; // Center horizontally
    closeIcon.style.transform = 'translate(-50%, -50%)'; // Center the image
    closeIcon.style.width = '24px'; // Adjusted size
    closeIcon.style.height = '24px'; // Adjusted size
    closeIcon.style.border = 'none'; // Remove border
    closeIcon.style.background = 'none'; // Remove background

    return closeButton;
}


// Function to set styles for the popup container
function setPopupStyles(popupContainer) {
    popupContainer.style.position = 'fixed';
    popupContainer.style.top = '50%';
    popupContainer.style.left = '50%';
    popupContainer.style.transform = 'translate(-50%, -50%)';
    popupContainer.style.backgroundColor = 'transparent'; // Remove background color
    popupContainer.style.padding = '20px';
    popupContainer.style.borderRadius = '10px';
    popupContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
    popupContainer.style.backdropFilter = 'blur(8px)';
    popupContainer.style.zIndex = '9999';
}

// Function to open text editor
function openTextEditor(text, filePath) {
    const textEditorContainer = document.createElement('div');
    textEditorContainer.classList.add('text-editor-container');

    const textContent = document.createElement('div');
    textContent.textContent = text;
    textContent.classList.add('text-content');

    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.classList.add('text-area');

    textEditorContainer.appendChild(textContent);
    textEditorContainer.appendChild(textArea);

    const closeButton = createCloseButton(textEditorContainer);
    textEditorContainer.appendChild(closeButton);

    setPopupStyles(textEditorContainer);

    dragElement(textEditorContainer);

    document.body.appendChild(textEditorContainer);

    // Toggle between text content and textarea for editing
    textContent.addEventListener('click', function() {
        textContent.style.display = 'none';
        textArea.style.display = 'block';
        textArea.focus();
    });

    textArea.addEventListener('blur', function() {
        textArea.style.display = 'none';
        textContent.style.display = 'block';
        textContent.textContent = textArea.value;
    });

    // Save file when Ctrl + S is pressed
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 's') {
            saveFile(filePath, textArea.value);
            event.preventDefault(); // Prevent browser's default behavior (e.g., save page)
        }
    });
}

// Function to save file
function saveFile(filePath, content) {
    const formData = new FormData();
    formData.append('filePath', filePath);
    formData.append('content', content);

    fetch('../saveFile.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to save file.');
        }
        console.log('File saved successfully.');
    })
    .catch(error => {
        console.error('Error saving file:', error);
    });
}

// Example: Dragging an element
function handleDrag(event) {
    const position = {
        x: event.clientX,
        y: event.clientY
    };
    socket.emit('drag', position);
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

        // Function to fetch the wallpaper
        function fetchWallpaper() {
            fetch('../getWallpaper.php')
                .then(response => response.text())
                .then(data => {
                    // Check if the wallpaper path is empty
                    if (data.trim() === '') {
                        // If empty, request to change wallpaper and then fetch again
                        requestChangeWallpaper();
                    } else {
                        // Set the fetched wallpaper as the background
                        document.body.style.backgroundImage = `url("../Resources/Wallpapers/${data.trim()}")`;
                    }
                })
                .catch(error => console.error('Error fetching wallpaper:', error));
        }

        // Function to request changing the wallpaper
        function requestChangeWallpaper() {
            fetch('../changeWallpaper.php')
                .then(response => {
                    if (response.ok) {
                        // If changing wallpaper is successful, fetch the wallpaper again
                        fetchWallpaper();
                    } else {
                        console.error('Failed to change wallpaper.');
                    }
                })
                .catch(error => console.error('Error requesting change wallpaper:', error));
        }


// Function to update the clock every second
setInterval(updateClock, 1000);

// Initial call to display the clock
updateClock();

// Toggle popup visibility
document.getElementById('menuButton').addEventListener('click', function() {
    document.getElementById('popup').classList.toggle('show');
});

// Fetch files and folders when file explorer icon is clicked
document.querySelector('.desktop-icon').addEventListener('click', function() {
    toggleFileExplorer();
});

// Add click event listener to the control panel icon
document.getElementById('controlPanelIcon').addEventListener('click', openControlPanel);

// Add click event listener to the close button
document.getElementById('closeControlPanel').addEventListener('click', closeControlPanel);

// Call the fetchWallpaper function when the page loads
window.onload = fetchWallpaper;
