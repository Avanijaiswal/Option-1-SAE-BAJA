// 1. Cursor Outline Tracking
const cursor = document.querySelector('.cursor-outline');
document.addEventListener('mousemove', (e) => {
    cursor.style.opacity = "1";
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// 2. 3D Scroll Reveal Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15 });

// 3. Team Data & Render
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

        // Magnetic Cursor radius (3-4cm / 110px) on Hover
        card.addEventListener('mouseenter', () => {
            cursor.style.width = '110px';
            cursor.style.height = '110px';
            cursor.style.background = 'rgba(255, 102, 0, 0.15)';
        });
        card.addEventListener('mouseleave', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.background = 'transparent';
        });

        grid.appendChild(card);
        observer.observe(card);
    });
}

// Filter Navigation
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        e.target.classList.add('active');
        renderTeam(e.target.dataset.filter);
    });
});

// Initialize
renderTeam();
observer.observe(document.querySelector('.hero-content'));
observer.observe(document.querySelector('.section-title'));
observer.observe(document.querySelector('.team-filter'));