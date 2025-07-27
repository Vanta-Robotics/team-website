document.addEventListener('DOMContentLoaded', () => {

    // --- Black Hole Scroll Zoom Effect ---
    const bg = document.getElementById('blackhole-bg');
    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        // The scale starts at 1 and increases slowly with scroll.
        // The divisor (e.g., 2000) controls the zoom speed. A larger number means slower zoom.
        const scale = 1 + scrollValue / 2000;
        bg.style.transform = `scale(${scale})`;
    });

    // --- Hero Title Typing Effect ---
    const heroTitle = document.getElementById('hero-title');
    const titleText = "VANTA ROBOTICS";
    let charIndex = 0;

    function type() {
        if (charIndex < titleText.length) {
            heroTitle.textContent += titleText.charAt(charIndex);
            charIndex++;
            setTimeout(type, 150); // Speed of typing in milliseconds
        } else {
            // Remove the blinking cursor after typing is complete
            heroTitle.style.borderRight = 'none';
            heroTitle.classList.add('fully-typed'); // Optional: for further styling
        }
    }
    type(); // Start the typing effect on page load


    // --- Fade-in elements on scroll ---
    // This uses the Intersection Observer API for better performance than a scroll event listener.
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Triggers when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is intersecting (visible)
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing the element once it's visible to save resources
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Attach the observer to each element with the .fade-in class
    fadeElements.forEach(el => {
        observer.observe(el);
    });

});