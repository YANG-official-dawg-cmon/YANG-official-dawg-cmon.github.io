function checkDeviceAndRedirect() {
    // Show loading screen during check and potential redirect
    // document.getElementById("loading-screen").style.display = "block";
    // document.body.style.display = "none";

    // Check if the device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Get current page
    const currentPage = window.location.pathname;
    const isIndexPage = currentPage.endsWith('pc.html') || currentPage === '/';
    const isMobilePage = currentPage.endsWith('mobile.html');

    if (isMobile && isIndexPage) {
        // If on mobile device and on index page, redirect to mobile
        window.location.href = 'https://www.google.com/';
    } else if (!isMobile && isMobilePage) {
        // If on desktop and on mobile page, redirect to index
        window.location.href = 'https://langara.ca/admissions/after-you-apply/index.html';
    } else {
        // If no redirect is needed, proceed with normal page load
       window.location.href = 'https://www.youtube.com/';
    }
}

checkDeviceAndRedirect();
