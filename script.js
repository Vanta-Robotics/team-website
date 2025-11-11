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

    // --- Incoming: Meet Countdown (Nov 15, 2025 at 20:30 local) ---
    const meetTarget = new Date("November 15, 2025 20:30:00").getTime();

    function updateMeetCountdown() {
        const now = Date.now();
        const distance = meetTarget - now;
        const clamp = (n) => (n < 0 ? 0 : n);
        const days = Math.floor(clamp(distance) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((clamp(distance) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((clamp(distance) % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((clamp(distance) % (1000 * 60)) / 1000);

        const dEl = document.getElementById('meet-days');
        const hEl = document.getElementById('meet-hours');
        const mEl = document.getElementById('meet-minutes');
        const sEl = document.getElementById('meet-seconds');
        const container = document.getElementById('meet-countdown');
        if (!dEl || !hEl || !mEl || !sEl || !container) return;

        if (distance <= 0) {
            dEl.innerText = '00';
            hEl.innerText = '00';
            mEl.innerText = '00';
            sEl.innerText = '00';
            container.innerHTML = '<h3 class="glow-text">it begins.</h3>';
            clearInterval(meetInterval);
            return;
        }

        dEl.innerText = String(days).padStart(2, '0');
        hEl.innerText = String(hours).padStart(2, '0');
        mEl.innerText = String(minutes).padStart(2, '0');
        sEl.innerText = String(seconds).padStart(2, '0');
    }
    const meetInterval = setInterval(updateMeetCountdown, 1000);
    updateMeetCountdown();

    // --- Hacker/Cryptic Text Stream ---
    const hackerEl = document.getElementById('hacker-text');
    if (hackerEl) {
        const glyphs = '!@#$%^&*()_+-=[]{};:,./<>?~ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const phrases = [
            'BOOTING NODE: VANTA//31000',
            '30 ARTIFACTS SCORED',
            '200+ SOLO POINT AUTO',
            'PRELOAD SCORED WITH SWURRET',
            'STARTING REV HARDWARE CLIENT',
            'AUTO AIM WHILE SCORING',
            'LOADING: PEDRO//PATHFINDER//AUTON',
            'RANKING: 1ST PLACE',
        ];

        let target = phrases[0];
        let frame = 0;
        let phraseIndex = 0;

        function scrambleTo(targetText, duration = 1200) {
            const start = performance.now();
            const base = hackerEl.textContent.padEnd(targetText.length, ' ');
            const len = Math.max(base.length, targetText.length);
            function tick(now) {
                const t = Math.min(1, (now - start) / duration);
                let out = '';
                for (let i = 0; i < len; i++) {
                    if (i < Math.floor(t * len)) {
                        out += targetText[i] || ' ';
                    } else {
                        out += glyphs[(Math.random() * glyphs.length) | 0];
                    }
                }
                hackerEl.textContent = out;
                if (t < 1) requestAnimationFrame(tick); else setTimeout(nextPhrase, 800);
            }
            requestAnimationFrame(tick);
        }

        function ambientNoise() {
            // Subtle per-frame jitter to keep it alive between transitions
            frame++;
            if (frame % 2 === 0) return; // half-rate
            const text = hackerEl.textContent;
            if (!text) return;
            const chars = text.split('');
            for (let i = 0; i < 2; i++) { // small random twitches
                const idx = (Math.random() * chars.length) | 0;
                if (chars[idx] && chars[idx] !== ' ') {
                    chars[idx] = glyphs[(Math.random() * glyphs.length) | 0];
                }
            }
            hackerEl.textContent = chars.join('');
        }

        function nextPhrase() {
            phraseIndex = (phraseIndex + 1) % phrases.length;
            target = phrases[phraseIndex];
            scrambleTo(target);
        }

        // Kickoff
        scrambleTo(target, 1500);
        setInterval(ambientNoise, 60);
    }


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