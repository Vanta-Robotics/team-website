// --- 1. THREE.JS BACKGROUND SCENE ---
const initThreeJS = () => {
    const container = document.getElementById('canvas-container');
    if (!container) return; // Exit if container doesn't exist

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.002); // Slightly denser fog for mystery

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    camera.position.y = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // A. STARFIELD (Reduced count for minimalism)
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 1200; // Fewer stars
    const posArray = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 180;
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const starsMaterial = new THREE.PointsMaterial({
        size: 0.12,
        color: 0xffffff,
        transparent: true,
        opacity: 0.6, // Dimmer stars
    });
    const starMesh = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starMesh);

    // B. MINIMAL BLACK HOLE RING
    const diskGeometry = new THREE.BufferGeometry();
    const diskCount = 2000; // Reduced density
    const diskPos = new Float32Array(diskCount * 3);
    const diskColors = new Float32Array(diskCount * 3);
    const colorInside = new THREE.Color(0x3c096c); // Deep dark purple
    const colorOutside = new THREE.Color(0x9d4edd); // Soft purple

    for (let i = 0; i < diskCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        // Thinner ring
        const radius = 7 + Math.random() * 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        // Flatter disk
        const y = (Math.random() - 0.5) * 0.2;

        diskPos[i * 3] = x;
        diskPos[i * 3 + 1] = y;
        diskPos[i * 3 + 2] = z;

        const mixedColor = colorInside.clone().lerp(colorOutside, (radius - 7) / 4);
        diskColors[i * 3] = mixedColor.r;
        diskColors[i * 3 + 1] = mixedColor.g;
        diskColors[i * 3 + 2] = mixedColor.b;
    }

    diskGeometry.setAttribute('position', new THREE.BufferAttribute(diskPos, 3));
    diskGeometry.setAttribute('color', new THREE.BufferAttribute(diskColors, 3));

    const diskMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.6 // More subtle
    });
    const diskMesh = new THREE.Points(diskGeometry, diskMaterial);
    diskMesh.rotation.x = 0.5;
    scene.add(diskMesh);

    // C. THE VOID
    const voidGeo = new THREE.SphereGeometry(6.5, 32, 32); // Slightly larger void
    const voidMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const voidMesh = new THREE.Mesh(voidGeo, voidMat);
    scene.add(voidMesh);

    // MOUSE INTERACTION (Damped significantly)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    const clock = new THREE.Clock();

    const animate = () => {
        const elapsedTime = clock.getElapsedTime();

        // Much smaller multiplier for very subtle movement
        targetX = mouseX * 0.0005;
        targetY = mouseY * 0.0005;

        // Very slow rotation
        diskMesh.rotation.z -= 0.0008;

        // Smooth camera drift
        diskMesh.rotation.x += 0.02 * (targetY - diskMesh.rotation.x);
        diskMesh.rotation.y += 0.02 * (targetX - diskMesh.rotation.y);

        starMesh.rotation.y = elapsedTime * 0.02;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

initThreeJS();

// --- 2. COUNTDOWN TIMER (Target: Dec 13) ---
const countdown = () => {
    const dEl = document.getElementById('d');
    if (!dEl) return; // Exit if countdown elements don't exist

    const now = new Date();
    let targetYear = now.getFullYear();
    const targetDate = new Date(`December 13, ${targetYear} 00:00:00`).getTime();

    if (now.getTime() > targetDate) {
        targetYear++;
    }

    const countDate = new Date(`March 6, ${targetYear} 08:00:00`).getTime();

    const update = () => {
        const currentTime = new Date().getTime();
        const gap = countDate - currentTime;

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const d = Math.floor(gap / day);
        const h = Math.floor((gap % day) / hour);
        const m = Math.floor((gap % hour) / minute);
        const s = Math.floor((gap % minute) / second);

        if (gap > 0) {
            dEl.innerText = d < 10 ? '0' + d : d;
            document.getElementById('h').innerText = h < 10 ? '0' + h : h;
            document.getElementById('m').innerText = m < 10 ? '0' + m : m;
            document.getElementById('s').innerText = s < 10 ? '0' + s : s;
        }
    };
    setInterval(update, 1000);
    update();
};
countdown();

// --- 3. SCROLL ANIMATION ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));

// --- 4. MOBILE MENU ---
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    if (nav.style.display === 'flex') {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '70px';
        nav.style.right = '0';
        nav.style.width = '100%';
        nav.style.background = 'rgba(0,0,0,0.95)';
        nav.style.padding = '2rem';
    }
});
