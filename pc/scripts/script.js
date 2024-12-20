function proceedWithNormalLoad() {
    // Your existing loading screen logic
    setTimeout(() => {
        // Hide the loading screen and show the main content
        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("desktop-content").style.display = "block";
        document.body.style.display = "block";
    }, 1); // Your existing duration is 2190
}

proceedWithNormalLoad();

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
    tour: document.getElementById("tour-btn"),
    merch: document.getElementById("merch-btn"),
    about: document.getElementById("about-btn"),
};

const pages = {
    music: { instance: null, exists: false },
    videos: { instance: null, exists: false },
    tour: { instance: null, exists: false },
    merch: { instance: null, exists: false },
    about: { instance: null, exists: false },
    credits: { instance: null, exists: false }
};

class Page {
    constructor(type) {
        this.type = type;
        this.isVisible = false;
        pages[type].exists = true;
        this.init();
    }

    init() {
        const pageElement = document.getElementById(`${this.type}`);
        const dragHandle = document.getElementById(`${this.type}-top-bar`);
        if (pageElement && dragHandle) {
            new Draggable(pageElement, dragHandle);
        } else {
            console.error(`Elements for ${this.type} not found.`);
        }
    }

    open() {
        this.isVisible = true;
        const element = document.getElementById(`${this.type}`);
        if (element) {
            element.style.display = "flex";
        }
    }

    close() {
        this.isVisible = false;
        const element = document.getElementById(`${this.type}`);
        if (element) {
            element.style.display = "none";
        }
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
        pages[type].instance = new Page(type);
        pages[type].instance.open();
    } else if (pages[type].instance.isVisible) {
        pages[type].instance.close();
    } else {
        pages[type].instance.open();
    }
}

// Assign the createDraggablePopUp function to each button
Object.keys(buttons).forEach((type) => {
    if (buttons[type]) {
        buttons[type].addEventListener("click", () => {
            createDraggablePopUp(type);
        });
    } else {
        console.error(`Button for ${type} not found.`);
    }
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

// Initialize Draggable for the  Announcement popup
const newsBtn = document.getElementById('news-btn');
const announcementPopup = document.getElementById('announcement-popup');
const announcementCloseButton = document.getElementById('close-button');
const announcementTopBar = document.getElementById('announcement-top-bar');
const saveButton = document.getElementById('save-button');

// Make the announcement popup draggable
new Draggable(announcementPopup, announcementTopBar);

newsBtn.addEventListener('click', function () {
    announcementPopup.style.display = 'block';
});

announcementCloseButton.addEventListener('click', function () {
    announcementPopup.style.display = 'none';
});

announcementPopup.addEventListener("mousedown", function() {
    bringForward(announcementPopup);
});

saveButton.addEventListener('click', function() {
    window.open('https://distrokid.com/hyperfollow/yang16/picture-perfect--4', '_blank');
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
announcementPopup.addEventListener("mousedown", function() {
    bringForward(announcementPopup);
});

function bringForward(element) {
    zIndexCounter++;
    element.style.zIndex = zIndexCounter;
}


// Store initial positions on page load
let yangSoftInitialPosition = null;
let announcementInitialPosition = null;

document.addEventListener('DOMContentLoaded', () => {
    // Store initial position for YangSoft Browser
    const yangSoftRect = yangSoftBrowser.getBoundingClientRect();
    yangSoftInitialPosition = {
        left: yangSoftRect.left,
        top: yangSoftRect.top
    };

    // Store initial position for Announcement Popup
    const announcementRect = announcementPopup.getBoundingClientRect();
    announcementInitialPosition = {
        left: announcementRect.left,
        top: announcementRect.top
    };
});

// For YangSoft Browser
document.getElementById("yangSoft-btn").addEventListener("click", function() {
    yangSoftBrowser.style.display = "block";
    // Reset to initial position
    yangSoftBrowser.style.position = 'absolute';
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    yangSoftBrowser.style.left = `${viewportWidth * 0.5}px`; // 50% of viewport width
    yangSoftBrowser.style.top = `${viewportHeight * 0.5}px`; // 50% of viewport height
});

// For Announcement Popup
newsBtn.addEventListener("click", function() {
    announcementPopup.style.display = "flex";
    // Reset to initial position
    announcementPopup.style.position = 'absolute';
    announcementPopup.style.left = `${announcementInitialPosition.left}px`;
    announcementPopup.style.top = `${announcementInitialPosition.top}px`;
});

document.getElementById("yangSoft-top-bar-x").addEventListener("click", function() {
    yangSoftBrowser.style.display = "none";
});

document.addEventListener('DOMContentLoaded', () => {
    function updateClock() {
        const clockElement = document.getElementById('taskbar-clock');
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const hoursStr = hours.toString().padStart(2, '0');

        clockElement.textContent = `${hoursStr}:${minutes}:${seconds} ${ampm}`;
    }

    setInterval(updateClock, 1000);
    updateClock(); // Initial call to display the clock immediately
});

document.getElementById("credits-btn").addEventListener("click",  function() {
    credits.style.display = "block";
    // Reset to initial position
    credits.style.position = 'absolute';
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    credits.style.left = `${viewportWidth * 0.5}px`; // 50% of viewport width
    credits.style.top = `${viewportHeight * 0.5}px`; // 50% of viewport height
});

announcementPopup.style.left = `${window.innerWidth * 0.3}px`; 


const credits = document.getElementById('credits');
const creditsTopBar = document.getElementById('credits-top-bar');
const draggablecreditsBrowser = new Draggable(credits, creditsTopBar);

document.getElementById("credits-minimize-button1").addEventListener("click", closeCredits);
document.getElementById("credits-close-button").addEventListener("click", closeCredits);

function closeCredits() {
    credits.style.display = "none";
}

document.getElementById("credits-btn").addEventListener("click", function() {
    credits.style.display = "flex";
})
