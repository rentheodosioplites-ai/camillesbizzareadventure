/* 
========================================
INTERACTIVITY CONTROLLER
========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    /* 
    ----------------------------------------
    SYSTEM BOOT SEQUENCE
    ----------------------------------------
    */
    const bootLines = [
        "INITIALIZING CORE SYSTEMS...",
        "CONNECTING TO LIMBUS.NET...",
        "AUTHENTICATING USER: MANAGER_X (Wait this should probably be Commenter-)",
        "ACCESS GRANTED.",
        "LOADING ARCHIVE: PROJECT_CAMILLE..."
    ];

    const bootScreen = document.getElementById('boot-screen');
    const bootContainer = document.getElementById('boot-text-container');
    const mainContent = document.querySelector('.terminal-container');

    let lineIndex = 0;

    function typeLine() {
        if (lineIndex < bootLines.length) {
            const p = document.createElement('p');
            p.textContent = "> " + bootLines[lineIndex];
            bootContainer.appendChild(p);
            lineIndex++;
            // Randomize typing speed slightly
            setTimeout(typeLine, Math.random() * 300 + 100);
        } else {
            // Sequence finished
            setTimeout(() => {
                bootScreen.style.transition = "opacity 1s ease";
                bootScreen.style.opacity = "0";
                setTimeout(() => {
                    bootScreen.style.display = "none";
                    mainContent.classList.remove('hidden-content');
                    mainContent.style.transition = "opacity 1s ease";
                    mainContent.style.opacity = "1";
                }, 1000);
            }, 800);
        }
    }

    // Start boot sequence
    if (bootScreen) {
        setTimeout(typeLine, 500);
    }


    /*
    ----------------------------------------
    DIGITAL RAIN / INK PARALLAX
    ----------------------------------------
    */
    const particlesContainer = document.getElementById('particles');

    // Create random "drops"
    const dropCount = 100;
    for (let i = 0; i < dropCount; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';

        // Random horizontal position
        drop.style.left = Math.random() * 100 + 'vw';

        // Random starting delay so they don't all fall at once
        drop.style.animationDelay = Math.random() * 5 + 's';

        // Random falling duration (speed)
        drop.style.animationDuration = Math.random() * 2 + 4 + 's';

        // Random width/length
        drop.style.width = Math.random() * 2 + 1 + 'px';
        drop.style.height = Math.random() * 50 + 20 + 'px';

        drop.style.opacity = Math.random() * 0.5 + 0.2;

        particlesContainer.appendChild(drop);
    }


    /*
    ----------------------------------------
    SCROLL REVEAL (FADE IN)
    ----------------------------------------
    */

    // We select all elements with the 'fade-in-section' class
    const observerOptions = {
        root: null, // Use the viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is visible in the viewport
            if (entry.isIntersecting) {
                // Add the class describing the visible state
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once visible (remove if you want it to fade out again when scrolling up)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Attach the observer to all sections we want to animate
    document.querySelectorAll('.fade-in-section').forEach((section) => {
        observer.observe(section);
    });


    /* 
    ----------------------------------------
    RANDOM GLITCH EFFECT (Additional Polish)
    ----------------------------------------
    Occasionally make the title twitch for a more erratic terminal feel.
    */
    const title = document.querySelector('.glitch-title');

    if (title) {
        setInterval(() => {
            // 10% chance to trigger a quick extra glitch
            if (Math.random() > 0.9) {
                title.style.textShadow = `2px 0 red, -2px 0 blue`;
                setTimeout(() => {
                    title.style.textShadow = ``;
                }, 100);
            }
        }, 2000);
    }

});
