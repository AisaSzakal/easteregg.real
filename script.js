const backgroundColors = ["rgba(0, 0, 0, 0.9)", "rgba(255, 0, 0, 0.9)", "rgba(0, 255, 0, 0.9)", "rgba(0, 0, 255, 0.9)"];
let currentColorIndex = 0;

document.addEventListener('keydown', function(event) {
    // Check if Command (Meta) and B are pressed
    if (event.metaKey && event.key === 'b') {
        // Prevent the default behavior
        event.preventDefault();

        // Select the animation element and disco ball
        const animationElement = document.getElementById('animation');
        const discoBall = document.getElementById('disco-ball');
        const music = document.getElementById('background-music');
        const overlay = document.getElementById('dark-overlay');

        // Toggle the show class for the animation element and overlay
        if (animationElement.classList.contains('hidden')) {
            animationElement.classList.remove('hidden');
            animationElement.classList.add('show');
            overlay.classList.remove('hidden');
            overlay.classList.add('show');
            createConfetti();
            showDiscoBall(discoBall);
            music.play();
            cycleBackgroundColors();
        } else {
            animationElement.classList.remove('show');
            animationElement.classList.add('hidden');
            overlay.classList.remove('show');
            overlay.classList.add('hidden');
            hideDiscoBall(discoBall);
            music.pause();
            music.currentTime = 0;
            clearInterval(colorInterval);
            // Reset to the first color
            document.body.style.backgroundColor = backgroundColors[0];
            currentColorIndex = 0; 
        }
    }
});

function cycleBackgroundColors() {
    colorInterval = setInterval(() => {
        currentColorIndex = (currentColorIndex + 1) % backgroundColors.length;
        document.body.style.backgroundColor = backgroundColors[currentColorIndex];
    }, 300); // Change color every 300 milliseconds
}

function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    confettiContainer.innerHTML = ''; // Clear previous confetti

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        const randomType = Math.random();
        if (randomType < 0.33) {
            confetti.classList.add('flower');
        } else if (randomType < 0.66) {
            confetti.classList.add('star');
        }
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 1}s`;
        confettiContainer.appendChild(confetti);

        // Remove the confetti after animation completes
        setTimeout(() => {
            confetti.remove();
        }, 3000); // Ensure removal after animation
    }
}

function showDiscoBall(discoBall) {
    discoBall.classList.remove('hidden');
    discoBall.classList.add('show');
    // Move the disco ball down a bit after a short delay
    setTimeout(() => {
        discoBall.style.top = '120px'; // Adjust as needed
    }, 300); // Delay in milliseconds
}


function hideDiscoBall(discoBall) {
    discoBall.style.top = '50px'; // Move the disco ball back to its intermediate position
    // Move the disco ball back up after a few seconds
    setTimeout(() => {
        discoBall.style.top = '-150px'; // Move the disco ball back above the viewport
        // Hide the disco ball after it moves back up
        setTimeout(() => {
            discoBall.classList.add('hidden');
        }, 1000); // Hide after transition completes
    }, 3000); // Wait 5 seconds before moving back up
}

