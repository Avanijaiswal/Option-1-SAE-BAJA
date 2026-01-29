// 1. Liquid Cursor Logic
const dot = document.querySelector('.cursor-dot');
const trail = document.querySelector('.cursor-trail');

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Immediate movement for the leading dot
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
});

// Lagging effect for the trail
function animateCursor() {
    // trailX follows mouseX with a delay (0.1 = high lag/liquid feel)
    trailX += (mouseX - trailX) * 0.15;
    trailY += (mouseY - trailY) * 0.15;
    
    trail.style.left = trailX + 'px';
    trail.style.top = trailY + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// 2. 3D Scroll Reveal Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15 });

// 3. Render Team with Hover Effects
const team = [
    { name: "Captain Name", role: "Captain", cat: "management" },
    { name: "Avani Jaiswal", role: "Technical Lead", cat: "technical" },
    { name: "Social Lead", role: "Public Relations", cat: "social" }
];

function renderTeam(filter = 'all') {
    const grid = document.getElementById('team-grid');
    grid.innerHTML = "";
    const filtered = filter === 'all' ? team : team.filter(m => m.cat === filter);

    filtered.forEach(m => {
        const card = document.createElement('div');
        card.className = 'member-card reveal-tile';
        card.innerHTML = `
            <div style="width: 75px; height: 75px; background: #ff6600; border-radius: 20px; margin: 0 auto 25px;"></div>
            <h3 style="font-weight:900; font-size:2.2rem; margin-bottom:10px;">${m.name}</h3>
            <p style="color: #ff6600; font-weight:700; text-transform:uppercase; letter-spacing:1px;">${m.role}</p>
        `;

        // Expansion on Hover (3-4cm radius)
        card.addEventListener('mouseenter', () => {
            trail.style.width = '115px';
            trail.style.height = '115px';
            trail.style.background = 'rgba(255, 102, 0, 0.2)';
            trail.style.border = 'none';
        });
        card.addEventListener('mouseleave', () => {
            trail.style.width = '30px';
            trail.style.height = '30px';
            trail.style.background = 'transparent';
            trail.style.border = '1.5px solid #ff6600';
        });

        grid.appendChild(card);
        observer.observe(card);
    });
}

// Filter Logic
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        e.target.classList.add('active');
        renderTeam(e.target.dataset.filter);
    });
});

// Initial Setup
renderTeam();
observer.observe(document.querySelector('.hero-content'));
observer.observe(document.querySelector('.section-title'));
observer.observe(document.querySelector('.team-filter'));