// Function to detect tabs and send their IDs using BroadcastChannel
function detectTabsAndSendIDs() {
    // Check if local storage has the maxTabID
    let maxTabID = localStorage.getItem('maxTabID');
    if (!maxTabID) {
        maxTabID = 0;
    } else {
        maxTabID = parseInt(maxTabID);
    }

    const tabID = ++maxTabID;
    localStorage.setItem('maxTabID', tabID);

    const broadcastChannel = new BroadcastChannel('tab-events');
    broadcastChannel.postMessage({ type: 'tab_id', data: tabID });
}

// Function to handle incoming messages from other devices
function handleMessage(event) {
    const eventData = event.data;
    const { type, data } = eventData;

    switch (type) {
        case 'tab_id':
            // Handle received tab ID
            const tabID = data;
            console.log('Received tab ID:', tabID);
            break;
        case 'window_near_border':
            // Handle window near border
            console.log('Window is near the border of another tab:', data);
            break;
        default:
            break;
    }
}

// Function to handle messages from other devices
const broadcastChannel = new BroadcastChannel('tab-events');
broadcastChannel.onmessage = handleMessage;

// Detect tabs and send their IDs
detectTabsAndSendIDs();

// Function to handle tab unload
window.addEventListener('unload', function() {
    let maxTabID = localStorage.getItem('maxTabID');
    if (maxTabID) {
        maxTabID = parseInt(maxTabID);
        maxTabID--; // Decrement maxTabID
        localStorage.setItem('maxTabID', maxTabID);
    }
});

// Function to handle window drag
function handleWindowDrag(event) {
    // Get the current position of the window being dragged
    const windowPositionX = event.clientX;
    const windowPositionY = event.clientY;

    // Get the positions of all tab borders
    const tabBorders = document.querySelectorAll('.tab-border');
    tabBorders.forEach(tabBorder => {
        // Get the position of the tab border
        const tabBorderRect = tabBorder.getBoundingClientRect();
        const tabBorderPositionX = tabBorderRect.x;
        const tabBorderPositionY = tabBorderRect.y;

        // Check if the window being dragged is near the tab border
        const distance = Math.sqrt(Math.pow(windowPositionX - tabBorderPositionX, 2) + Math.pow(windowPositionY - tabBorderPositionY, 2));
        if (distance < 50) { // Adjust the threshold as needed
            // Send a message to other tabs indicating that a window is near the border
            broadcastChannel.postMessage({ type: 'window_near_border', data: true });
        }
    });
}

// Add event listeners for window drag
window.addEventListener('mousemove', handleWindowDrag);
