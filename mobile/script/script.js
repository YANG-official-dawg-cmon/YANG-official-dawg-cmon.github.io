let overlay = document.querySelector('.overlay');
let content = document.getElementById('container');
let startY = 0;
let currentY = 0;
let isSwiping = false;
let threshold = window.innerHeight / 5.0; // Minimum swipe distance to unlock the content

// Add event listeners for both touch and mouse
document.addEventListener('touchstart', handleStart, false);
document.addEventListener('touchmove', handleMove, false);
document.addEventListener('touchend', handleEnd, false);

document.addEventListener('mousedown', handleStart, false);
document.addEventListener('mousemove', handleMove, false);
document.addEventListener('mouseup', handleEnd, false);

function handleStart(e) {
  startY = e.touches ? e.touches[0].clientY : e.clientY; // Handle both touch and mouse
  isSwiping = true;
}

function handleMove(e) {
  if (!isSwiping) return;

  currentY = e.touches ? e.touches[0].clientY : e.clientY; // Handle both touch and mouse
  let deltaY = startY - currentY; // Calculate the vertical swipe distance

  // Move the overlay as the user swipes
  if (deltaY > 0) {
    overlay.style.transform = `translateY(-${deltaY}px)`;
  }
}

function handleEnd() {
  if (!isSwiping) return;

  isSwiping = false;

  let deltaY = startY - currentY; // Final swipe distance

  if (deltaY >= threshold) {
    unlockContent();
  } else {
    resetOverlay();
  }
}

function unlockContent() {
  // Add a CSS transition to make the transformation smooth
  overlay.style.transition = 'transform 0.5s ease';
  content.style.transition = 'opacity 0.5s ease';

  // Trigger the transformation
  overlay.style.transform = 'translateY(-100%)';
  content.style.opacity = 1;

  console.log("Transformation started");

  // Wait for the transition to complete
  overlay.addEventListener('transitionend', function handleTransitionEnd(event) {
    if (event.propertyName === 'transform') {
      console.log("Transformation finished");
      document.getElementById("delete").innerHTML = ""; // Delete content after the transition
      overlay.removeEventListener('transitionend', handleTransitionEnd); // Clean up the event listener
    }
  });
}

function resetOverlay() {
  overlay.style.transform = 'translateY(0)'; // Reset overlay to initial position
}

// document.addEventListener("DOMContentLoaded", function () {
//   // Run device check first
//   checkDeviceAndRedirect();
// });

