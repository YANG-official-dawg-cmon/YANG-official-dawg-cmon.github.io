function proceedWithNormalLoad() {
    // Your existing loading screen logic
    setTimeout(() => {
        // Hide the loading screen and show the main content
        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("desktop-content").style.display = "block";
        document.body.style.display = "block";
    }, 1); // Your existing duration is 2190
}

window.onresize = function() {
    if (window.innerWidth < 1500) {
        window.resizeTo(1500, window.innerHeight);
    }
    if (window.innerHeight < 400) {
        window.resizeTo(window.innerWidth, 400);
    }
};

const buttons = {
    music: document.getElementById("music-btn"),
    videos: document.getElementById("videos-btn"),
};

const pages = {
    music: { instance: null, exists: false },
    // tour: { instance: null, exists: false },
    videos: { instance: null, exists: false },
    // about: { instance: null, exists: false },
};

class Page {
    constructor(type) {
        this.type = type;
        this.isVisible = true;
        pages[type].exists = true;
        this.init();
    }

    init() {
        
        const pageElement = document.getElementById(`${this.type}`);
        const dragHandle = document.getElementById(`${this.type}-top-bar`);
        new Draggable(pageElement, dragHandle);
    }

    open() {
        this.isVisible = true;
        document.getElementById(`${this.type}`).style.display = "flex";
    }

    close() {
        this.isVisible = false;
        document.getElementById(`${this.type}`).style.display = "none";
    }
}



class Draggable {
    constructor(draggableBrowser, dragHandle) {
        this.draggableBrowser = draggableBrowser;
        this.dragHandle = dragHandle;
        this.offsetX = 0;
        this.offsetY = 0;
        this.isDragging = false;
        this.init();
    }

    init() {
        // Mouse events
        this.dragHandle.addEventListener('mousedown', (e) => this.onMouseDown(e));
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        document.addEventListener('mouseup', () => this.onMouseUp());

        // Touch events
        this.dragHandle.addEventListener('touchstart', (e) => this.onTouchStart(e));
        document.addEventListener('touchmove', (e) => this.onTouchMove(e));
        document.addEventListener('touchend', () => this.onTouchEnd());
    }

    onMouseDown(e) {
        this.isDragging = true;
        this.offsetX = e.clientX - this.draggableBrowser.offsetLeft;
        this.offsetY = e.clientY - this.draggableBrowser.offsetTop;
    }

    onMouseMove(e) {
        if (this.isDragging) {
            this.draggableBrowser.style.position = 'absolute';
            this.draggableBrowser.style.left = `${e.clientX - this.offsetX}px`;
            this.draggableBrowser.style.top = `${e.clientY - this.offsetY}px`;
        }
    }

    onMouseUp() {
        this.isDragging = false;
    }

    onTouchStart(e) {
        e.preventDefault();
        this.isDragging = true;
        const touch = e.touches[0];
        this.offsetX = touch.clientX - this.draggableBrowser.offsetLeft;
        this.offsetY = touch.clientY - this.draggableBrowser.offsetTop;
    }

    onTouchMove(e) {
        if (this.isDragging) {
            e.preventDefault();
            const touch = e.touches[0];
            this.draggableBrowser.style.position = 'absolute';
            this.draggableBrowser.style.left = `${touch.clientX - this.offsetX}px`;
            this.draggableBrowser.style.top = `${touch.clientY - this.offsetY}px`;
        }
    }

    onTouchEnd() {
        this.isDragging = false;
    }
}


function createDraggablePopUp(type) {
    if (!pages[type].exists) {
        // Create a new page and open it if it doesn't exist
        pages[type].instance = new Page(type);
        pages[type].instance.open();
    } else if (pages[type].instance.isVisible) {
        // If the page is visible, close it
        pages[type].instance.close();
    } else {
        // If the page exists but is not visible, open it
        pages[type].instance.open();
    }
}

// Assign the createDraggablePopUp function to each button
Object.keys(buttons).forEach((type) => {
    buttons[type].addEventListener("click", () => {
        createDraggablePopUp(type);
    });
});


// YangSoft Internet Web Browser
const yangSoftBrowser = document.getElementById('yangSoft-web-browser');
const yangSoftTopBar = document.getElementById('yangSoft-top-bar');
const draggableYangSoftBrowser = new Draggable(yangSoftBrowser, yangSoftTopBar);

// music Browser
const musicBrowser = document.getElementById('music');
const musicTopBar = document.getElementById('music-top-bar');
const musicCloseButton = document.getElementById("music-close-button")
const musicMinButton = document.getElementById("music-min-button1")
const draggableMusicBrowser = new Draggable(musicBrowser, musicTopBar);

musicCloseButton.addEventListener("click", closeMusic);
musicMinButton.addEventListener("click", closeMusic);

function closeMusic() {
    createDraggablePopUp("music");
}

// video Browser
const videosBrowser = document.getElementById('videos');
const videosTopBar = document.getElementById('videos-top-bar');
const videosCloseButton = document.getElementById("videos-close-button")
const videosMinButton = document.getElementById("videos-min-button1")
const draggableVideosBrowser = new Draggable(videosBrowser, videosTopBar);

function closeVideo() {
    createDraggablePopUp("videos");
}

videosCloseButton.addEventListener("click", closeVideo);
videosMinButton.addEventListener("click", closeVideo);





document.addEventListener("DOMContentLoaded", function () {
    // Run device check first
    checkDeviceAndRedirect();
});

// Get references to elements
const merchButton = document.getElementById('merch-btn');
const audioPlayer = document.getElementById('audio-player');
const merchPopup = document.getElementById('merch-popup');
let clickCount = 0;  // Track number of clicks on the merch button
let popupIsOpen = false;  // Track if the popup is open

// Event listener for the merch button click
merchButton.addEventListener('click', () => {
    // If the popup is not already open, open it and play the audio
    if (!popupIsOpen) {
        merchPopup.style.display = 'block';  // Show merch popup
        popupIsOpen = true;  // Mark popup as open

        // Reset and play the audio
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        audioPlayer.playbackRate = 1.5;
        audioPlayer.play();
    } else {
        // Toggle visibility of the popup if it's already open
        if (merchPopup.style.display === 'block') {
            merchPopup.style.display = 'none';
            popupIsOpen = false;  // Mark popup as closed
        } else {
            merchPopup.style.display = 'block';
            popupIsOpen = true;  // Mark popup as open
        }
    }
});

// Initialize Draggable for the MERCH popup
const topBar = document.getElementById('merchTop-bar');
new Draggable(merchPopup, topBar);

// Close functionality
const closeButton = document.getElementById('merch-close-button');
const okButton = document.querySelector('.ok-button');

function closePopup() {
    merchPopup.style.display = 'none';  // Close the popup
    popupIsOpen = false;  // Mark popup as closed

    // Reset the audio when the popup is closed (no audio should play on close)
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
}

// Add event listeners to close and okay buttons
closeButton.addEventListener('click', closePopup);
okButton.addEventListener('click', closePopup);

// Get references to elements
const aboutButton = document.getElementById('about-btn');
const aboutPopup = document.getElementById('about-popup'); //
let aboutPopupIsOpen = false;  // Track if the popup is open

// Event listener for the about button click
aboutButton.addEventListener('click', () => {
    // If the popup is not already open, open it
    if (!aboutPopupIsOpen) {
        aboutPopup.style.display = 'block';  // Show about popup
        popupIsOpen = true;  // Mark popup as open
    } else {
        // Toggle visibility of the popup if it's already open
        if (aboutPopup.style.display === 'block') {
            aboutPopup.style.display = 'none';
            aboutPopupIsOpen = false;  // Mark popup as closed
        } else {
            aboutPopup.style.display = 'block';
            aboutPopupIsOpen = true;  // Mark popup as open
        }
    }
});

// Initialize Draggable for the  ABOUT popup
const aboutTopBar = document.getElementById('aboutTop-bar');
new Draggable(aboutPopup, aboutTopBar);

// Minimize functionality for button1 and button2
const minimizeButton1 = document.getElementById('minimize-button1');
const minimizeButton2 = document.getElementById('minimize-button2');

// Minimize popup on click
minimizeButton1.addEventListener('click', () => {
    aboutPopup.style.display = 'none';  // Hide the about popup
    popupIsOpen = false;  // Mark popup as closed
});

minimizeButton2.addEventListener('click', () => {
    aboutPopup.style.display = 'none';  // Hide the about popup
    popupIsOpen = false;  // Mark popup as closed
});

// Close button functionality
const aboutCloseButton = document.getElementById('about-close-button');

// Close the popup when the close button is clicked
aboutCloseButton.addEventListener('click', () => {
    aboutPopup.style.display = 'none';  // Hide the about popup
    popupIsOpen = false;  // Mark popup as closed
});


// Initialize Draggable for the TOUR popup
const tourBtn = document.getElementById('tour-btn');
const tourPopup = document.getElementById('tour-popup');
const tourTopBar = document.getElementById('tourTop-bar');
const tourCloseButton = document.getElementById('tour-close-button');

popupIsOpen = false; // To track whether the popup is open or closed

// Initialize the draggable feature
new Draggable(tourPopup, tourTopBar);

// Function to show the popup and trigger animations
function showTourPopup() {
    // Show the tour popup and trigger animations after a click
    tourPopup.style.display = 'block';  // Show the popup
    tourPopup.classList.add('show');   // Trigger animation class (if added in CSS)

    // Make sure that the animations for the lines don't start immediately
    // Delay the animation for lines and spinner
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const line3 = document.getElementById('line3');
    const spinner = document.getElementById('spinner');
    const command = document.getElementById('command');

    // Reset all animations before starting them
    line1.style.animation = '';
    line2.style.animation = '';
    line3.style.animation = '';
    spinner.style.animation = '';
    command.style.animation = '';

    // Use a slight delay to trigger the animations after the popup becomes visible
    setTimeout(() => {
        line1.style.animation = 'fadeIn 0.1s 1.5s forwards';
        line2.style.animation = 'fadeIn 0.1s 0.5s forwards';
        line3.style.animation = 'fadeIn 0.1s 0.7s forwards';
        spinner.style.animation = 'spin 0.5s linear infinite, showSpinner 0.2s forwards';
        spinner.style.animationDelay = '1.4s';
        command.style.animation = 'fadeIn 0.5s 1.1s forwards';
        
    }, 100);  // 100ms delay before triggering the animations
    
    setTimeout(() => {
        spinner.style.animation = 'none';
        spinner.style.display = 'block';
        spinner.style.opacity = '1'; 
    }, 2450);  // Start slowing down the spinner after 2000ms
    
    
    
    // Set popup as open
    popupIsOpen = true;
}

// Function to hide the popup
function hideTourPopup() {
    // Hide the popup and reset animations
    tourPopup.style.display = 'none';
    popupIsOpen = false;  // Mark popup as closed

    // Optionally reset animations here if needed
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const line3 = document.getElementById('line3');
    const spinner = document.getElementById('spinner');
    const command = document.getElementById('command');

    // Reset animations by removing the class that triggers them
    line1.style.animation = '';
    line2.style.animation = '';
    line3.style.animation = '';
    spinner.style.animation = '';
    command.style.animation = '';
}

// Toggle the visibility of the tour popup when the tour button is clicked
tourBtn.addEventListener('click', () => {
    if (!popupIsOpen) {
        // Show the tour popup with animations
        showTourPopup();
    } else {
        // Hide the tour popup if it's already open
        hideTourPopup();
    }
});

// Close the tour popup when the close button is clicked
tourCloseButton.addEventListener('click', () => {
    hideTourPopup();
});


let zIndexCounter = 3;
merchPopup.addEventListener("mousedown", function() {
    bringForward(merchPopup);
});
aboutPopup.addEventListener("mousedown", function() {
    bringForward(aboutPopup);
});
musicBrowser.addEventListener("mousedown", function() {
    bringForward(musicBrowser);
});
videosBrowser.addEventListener("mousedown", function() {
    bringForward(videosBrowser);
});
tourPopup.addEventListener("mousedown", function() {
    bringForward(tourPopup);
});

function bringForward(element) {
    zIndexCounter++;
    element.style.zIndex = zIndexCounter;
}


document.getElementById("yangSoft-btn").addEventListener("click", function() {
    yangSoftBrowser.style.display = "block";
});

document.getElementById("yangSoft-top-bar-x").addEventListener("click", function() {
    yangSoftBrowser.style.display = "none";
});