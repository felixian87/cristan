// Mobile Menu Logic
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('toggle');
    });
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('toggle');
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = '#ffffff';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = '#ffffff';
        navbar.style.boxShadow = 'none';
    }
});

// Simple form submission (Mock)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Grazie per averci contattato! Ti risponderemo al più presto.');
        contactForm.reset();
    });
}

// Add CSS for Mobile Menu Active State dynamically
const style = document.createElement('style');
style.innerHTML = `
    @media (max-width: 768px) {
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 80px;
            left: 0;
            width: 100%;
            background: #ffffff;
            padding: 20px;
            box-shadow: 0 10px 10px rgba(0,0,0,0.1);
            text-align: center;
        }
        .nav-links.active li {
            margin: 15px 0;
        }
        .menu-toggle {
            display: block;
        }
        .menu-toggle span {
            display: block;
            width: 25px;
            height: 3px;
            background: #1a2a44;
            margin: 5px;
            transition: 0.3s;
        }
        .menu-toggle.toggle span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        .menu-toggle.toggle span:nth-child(2) {
            opacity: 0;
        }
        .menu-toggle.toggle span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(style);
