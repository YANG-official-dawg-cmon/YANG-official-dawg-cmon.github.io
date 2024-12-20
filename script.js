function checkDeviceAndRedirect() {
    try {
        // Check if the device is mobile
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        // Get the current page path
        const currentPage = window.location.pathname;

        if (isMobile && !currentPage.endsWith('mobileTest.html')) {
            // If the device is mobile and not already on mobile.html, redirect to mobile.html
            window.location.href = '/mobileTest.html';
        } else if (!isMobile && !currentPage.endsWith('pc.html')) {
            // If the device is not mobile and not already on pc.html, redirect to pc.html
            window.location.href = '/pc/haveuseenhim.html';
        } else {
            // If already on the correct page, do nothing
            return;
        }
    } catch (error) {
        console.error('Error occurred during redirection check:', error);
        // Fallback to mobile.html in case of an error or undetected device
        window.location.href = '/mobileTest.html';
    }
}

// Function to bring elements forward, excluding YangSoft browser
function bringForward(element) {
    if (element !== yangSoftBrowser) {
        zIndexCounter++;
        element.style.zIndex = zIndexCounter;
    }
}