document.addEventListener('DOMContentLoaded', function() {
    initLoader();
    initHeader();
    initMobileMenu();
    initReveal();
    initCounter();
    initScrollTop();
    initContactForm();
    initHeroSlider();
});

function initLoader() {
    const loader = document.querySelector('.page-loader');
    if (!loader) return;
    setTimeout(() => loader.classList.add('hidden'), 2000);
}

function initHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
}

function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-overlay');
    const close = document.querySelector('.mobile-close');

    if (!toggle) return;

    const closeMenu = () => {
        menu?.classList.remove('active');
        overlay?.classList.remove('active');
        document.body.style.overflow = '';
    };

    toggle.addEventListener('click', () => {
        menu?.classList.add('active');
        overlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    close?.addEventListener('click', closeMenu);
    overlay?.addEventListener('click', closeMenu);

    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

function initReveal() {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => observer.observe(el));
}

function initCounter() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const duration = 2000;
    const step = duration / 60;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString() + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString() + '+';
        }
    }, step);
}

function initScrollTop() {
    const btn = document.querySelector('.scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    });

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const name = formData.get('name') || '';
        const phone = formData.get('phone') || '';
        const email = formData.get('email') || '';
        const interest = formData.get('interest') || '';
        const budget = formData.get('budget') || '';
        const location = formData.get('location') || '';
        const message = formData.get('message') || '';

        let waMessage = `🏡 *SRI KRISHNA PROPERTIES & DEVELOPERS*%0A%0A`;
        waMessage += `👤 *Name:* ${encodeURIComponent(name)}%0A`;
        waMessage += `📞 *Phone:* ${encodeURIComponent(phone)}%0A`;
        if (email) waMessage += `📧 *Email:* ${encodeURIComponent(email)}%0A`;
        waMessage += `🏷️ *Interest:* ${encodeURIComponent(interest)}%0A`;
        if (budget) waMessage += `💰 *Budget:* ${encodeURIComponent(budget)}%0A`;
        if (location) waMessage += `📍 *Location:* ${encodeURIComponent(location)}%0A`;
        if (message) waMessage += `💬 *Message:* ${encodeURIComponent(message)}%0A`;

        window.open(`https://wa.me/919677430730?text=${waMessage}`, '_blank');
        this.reset();
        showNotification('Redirecting to WhatsApp...');
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 24px;
        right: 24px;
        padding: 14px 24px;
        background: #10b981;
        color: white;
        border-radius: 8px;
        font-weight: 500;
        z-index: 99999;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    const style = document.createElement('style');
    style.textContent = `@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`;
    document.head.appendChild(style);

    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Hero Slider
let heroSlideIndex = 0;
let heroInterval;

function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;

    function goToSlide(index) {
        heroSlideIndex = index;
        slides.forEach((s, i) => s.classList.toggle('active', i === heroSlideIndex));
    }

    function nextSlide() {
        goToSlide((heroSlideIndex + 1) % slides.length);
    }

    heroInterval = setInterval(nextSlide, 4000);

    const heroEl = document.querySelector('.hero');
    if (heroEl) {
        heroEl.addEventListener('mouseenter', () => clearInterval(heroInterval));
        heroEl.addEventListener('mouseleave', () => {
            heroInterval = setInterval(nextSlide, 4000);
        });
    }
}

// Property Modal
let modalSlideIndex = 0;

function openPropertyModal(btn) {
    const modal = document.getElementById('propertyModal');
    if (!modal) return;

    const title = btn.getAttribute('data-title');
    const location = btn.getAttribute('data-location');
    const price = btn.getAttribute('data-price');
    const size = btn.getAttribute('data-size');
    const bhk = btn.getAttribute('data-bhk') || '';
    const type = btn.getAttribute('data-type');
    const desc = btn.getAttribute('data-desc');
    const features = btn.getAttribute('data-features');
    const images = btn.getAttribute('data-images').split(',');
    const tagClass = type === 'Apartment' ? 'sale' : type === 'Commercial' ? 'sale' : '';

    modal.querySelector('.modal-title').textContent = title;
    modal.querySelector('.modal-location span').textContent = location;
    modal.querySelector('.modal-size').textContent = size;
    modal.querySelector('.modal-bhk').textContent = bhk;
    modal.querySelector('.modal-bhk').parentElement.style.display = bhk ? 'flex' : 'none';
    modal.querySelector('.modal-type').textContent = type;
    modal.querySelector('.modal-price-display').textContent = price;
    modal.querySelector('.modal-desc').textContent = desc;
    modal.querySelector('.modal-price').textContent = price;

    const tag = modal.querySelector('.modal-tag');
    tag.textContent = type;
    tag.className = 'modal-tag ' + tagClass;

    const modalImages = modal.querySelectorAll('.modal-slide img');
    images.forEach((src, i) => { if (modalImages[i]) modalImages[i].src = src; });

    const featuresContainer = modal.querySelector('.modal-features');
    featuresContainer.innerHTML = features.split(',').map(f => `<div class="modal-feature"><i class="fas fa-check-circle"></i> ${f.trim()}</div>`).join('');

    const waMsg = encodeURIComponent(`Hi! I'm interested in "${title}" at ${location}. Price: ${price}. Please share more details.`);
    modal.querySelector('.btn-whatsapp').href = `https://wa.me/919677430730?text=${waMsg}`;

    modalSlideIndex = 0;
    updateModalSlide();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePropertyModal() {
    const modal = document.getElementById('propertyModal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function nextModalSlide() {
    const slides = document.querySelectorAll('#propertyModal .modal-slide');
    modalSlideIndex = (modalSlideIndex + 1) % slides.length;
    updateModalSlide();
}

function prevModalSlide() {
    const slides = document.querySelectorAll('#propertyModal .modal-slide');
    modalSlideIndex = (modalSlideIndex - 1 + slides.length) % slides.length;
    updateModalSlide();
}

function updateModalSlide() {
    const slides = document.querySelectorAll('#propertyModal .modal-slide');
    const dots = document.querySelectorAll('#propertyModal .modal-dot');
    slides.forEach((s, i) => s.classList.toggle('active', i === modalSlideIndex));
    dots.forEach((d, i) => d.classList.toggle('active', i === modalSlideIndex));
}

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-dot')) {
        modalSlideIndex = parseInt(e.target.getAttribute('data-slide'));
        updateModalSlide();
    }
});

document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('propertyModal');
    if (!modal || !modal.classList.contains('active')) return;
    if (e.key === 'Escape') closePropertyModal();
    if (e.key === 'ArrowRight') nextModalSlide();
    if (e.key === 'ArrowLeft') prevModalSlide();
});

document.addEventListener('click', function(e) {
    const modal = document.getElementById('propertyModal');
    if (modal && e.target === modal) closePropertyModal();
});

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Keyboard
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelector('.mobile-menu')?.classList.remove('active');
        document.querySelector('.mobile-overlay')?.classList.remove('active');
        document.body.style.overflow = '';
    }
});
