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

    // --- NEW: Spotlight Effect Logic ---
    // This updates the CSS variables --mouse-x and --mouse-y based on mouse movement.
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

    // --- Fade-in elements on scroll (Intersection Observer) ---
    const fadeElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    fadeElements.forEach(el => {
        observer.observe(el);
    });

});