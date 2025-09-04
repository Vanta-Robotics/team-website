document.addEventListener('DOMContentLoaded', () => {

    // --- Black Hole Scroll Zoom Effect ---
    const bg = document.getElementById('blackhole-bg');
    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
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
            setTimeout(type, 150);
        } else {
            heroTitle.style.borderRight = 'none';
        }
    }
    type();

    // --- Spotlight Effect Logic ---
    document.addEventListener('mousemove', e => {
        document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
        document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
    });

    // --- Team Member Accordion (Click to Expand) ---
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('click', () => {
            if (!member.classList.contains('active')) {
                teamMembers.forEach(m => m.classList.remove('active'));
            }
            member.classList.toggle('active');
        });
    });

    // --- NEW: Season Countdown Timer Logic ---
    const countdownTargetDate = new Date("September 6, 2025 12:00:00").getTime();

    const countdownFunction = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownTargetDate - now;

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Ensure two digits by padding with a "0" if needed
        document.getElementById("days").innerText = String(days).padStart(2, '0');
        document.getElementById("hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');

        // If the countdown is over, write some text
        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById("countdown-timer").innerHTML = "<h3>The Season is Here!</h3>";
        }
    }, 1000);


    // --- Fade-in elements on scroll (Intersection Observer) ---
    const fadeElements = document.querySelectorAll('.fade-in');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    fadeElements.forEach(el => observer.observe(el));

});