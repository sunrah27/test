const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';

    cursorFollower.style.left = e.clientX - 20 + 'px';
    cursorFollower.style.top = e.clientY - 20 + 'px';
});

// Hide cursor on touch devices
if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
}

// Reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add hover effects for interactive elements
document.querySelectorAll('.service-card, .portfolio-item').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Enhanced parallax effects
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    const rate2 = scrolled * -0.3;
    const rate3 = scrolled * -0.8;

    // Multiple parallax layers
    const heroBg = document.querySelector('.hero-bg');
    const floatingElements = document.querySelectorAll('.floating-element');
    const sections = document.querySelectorAll('.section');

    if (heroBg) {
        heroBg.style.transform = `translate3d(0, ${rate}px, 0) scale(${1 + scrolled * 0.0005})`;
    }

    // Parallax for floating elements
    floatingElements.forEach((element, index) => {
        const speed = (index + 1) * 0.1;
        element.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
    });

    // Parallax for sections
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const speed = 0.1 * (index + 1);

        if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
            section.style.transform = `translate3d(0, ${scrolled * speed * 0.1}px, 0)`;
        }
    });

    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Mouse move parallax for hero content
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const moveX = (mouseX - 0.5) * 30;
        const moveY = (mouseY - 0.5) * 30;
        heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }

    // Move floating elements based on mouse
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        const moveX = (mouseX - 0.5) * speed;
        const moveY = (mouseY - 0.5) * speed;
        element.style.transform += ` translate(${moveX}px, ${moveY}px)`;
    });
});

// Enhanced hover effects with 3D transforms
document.querySelectorAll('.service-card, .portfolio-item, .stat').forEach(card => {
    card.addEventListener('mouseenter', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale(1.05)`;
        this.style.boxShadow = '0 25px 50px var(--accent-glow)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
        this.style.boxShadow = '';
    });

    card.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale(1.05)`;
    });
});

// Contact form handling
function handleSubmit(event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    // Simple validation
    if (!data.name || !data.email || !data.project) {
        alert('Please fill in all required fields.');
        return;
    }

    // In a real implementation, you'd send this to your server
    console.log('Form submission:', data);

    // Show success message
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');

    // Reset form
    event.target.reset();
}

const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);
updateToggleIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleIcon(newTheme);
});

function updateToggleIcon(theme) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}