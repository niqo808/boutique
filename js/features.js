/**
 * LA PAZ - NUEVAS FEATURES
 * Funcionalidades adicionales para mejorar la experiencia del usuario
 */

document.addEventListener('DOMContentLoaded', function() {
    initWhatsAppButton();
    initBackToTop();
    initDarkMode();
    initLightbox();
    initParallax();
    initProductCardEffects();
});

// ===== BOTÓN FLOTANTE DE WHATSAPP =====
function initWhatsAppButton() {
    // Crear el botón de WhatsApp
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/5491112345678?text=Hola!%20Quiero%20consultar%20sobre%20sus%20productos';
    whatsappBtn.target = '_blank';
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.innerHTML = `
        💬
        <span class="tooltip-text">¿Necesitás ayuda? Escribinos!</span>
    `;
    
    document.body.appendChild(whatsappBtn);
    
    // Animación de entrada
    setTimeout(() => {
        whatsappBtn.style.animation = 'slideInRight 0.5s ease';
    }, 1000);
}

// ===== BOTÓN VOLVER ARRIBA =====
function initBackToTop() {
    // Crear el botón
    const backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.title = 'Volver arriba';
    
    document.body.appendChild(backToTopBtn);
    
    // Mostrar/ocultar según scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Funcionalidad de scroll
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== MODO OSCURO =====
function initDarkMode() {
    // Crear el toggle
    const darkModeToggle = document.createElement('div');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = `
        <div class="icon moon-icon">🌙</div>
        <div class="icon sun-icon">☀️</div>
    `;
    
    document.body.appendChild(darkModeToggle);
    
    // Verificar si hay preferencia guardada
    const darkModePreference = localStorage.getItem('darkMode');
    if (darkModePreference === 'enabled') {
        document.body.classList.add('dark-mode');
    }
    
    // Toggle al hacer clic
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Guardar preferencia
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });
}

// ===== LIGHTBOX PARA GALERÍA =====
function initLightbox() {
    // Crear estructura del lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <div class="lightbox-close">×</div>
            <img src="" alt="">
            <div class="lightbox-caption"></div>
        </div>
        <div class="lightbox-nav prev">‹</div>
        <div class="lightbox-nav next">›</div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Elementos del lightbox
    const lightboxImg = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.prev');
    const nextBtn = lightbox.querySelector('.next');
    
    let currentImages = [];
    let currentIndex = 0;
    
    // Hacer que las imágenes de productos sean clickeables
    const productImages = document.querySelectorAll('.product-image');
    productImages.forEach((imgContainer, index) => {
        imgContainer.style.cursor = 'pointer';
        imgContainer.addEventListener('click', () => {
            // Obtener todas las imágenes
            currentImages = Array.from(productImages);
            currentIndex = index;
            
            // Obtener la URL de la imagen de fondo
            const bgImage = window.getComputedStyle(imgContainer).backgroundImage;
            const imageUrl = bgImage.slice(4, -1).replace(/"/g, "");
            
            // Obtener el título del producto
            const productCard = imgContainer.closest('.product-card');
            const productTitle = productCard.querySelector('h3').textContent;
            
            openLightbox(imageUrl, productTitle);
        });
    });
    
    // También hacer clickeables las imágenes del carousel
    const carouselImages = document.querySelectorAll('.slide-img img');
    carouselImages.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            currentImages = Array.from(carouselImages);
            currentIndex = index;
            openLightbox(img.src, img.alt);
        });
    });
    
    function openLightbox(imageSrc, caption) {
        lightboxImg.src = imageSrc;
        lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function showNext() {
        currentIndex = (currentIndex + 1) % currentImages.length;
        updateLightboxImage();
    }
    
    function showPrev() {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        updateLightboxImage();
    }
    
    function updateLightboxImage() {
        const currentElement = currentImages[currentIndex];
        
        if (currentElement.tagName === 'IMG') {
            lightboxImg.src = currentElement.src;
            lightboxCaption.textContent = currentElement.alt;
        } else {
            const bgImage = window.getComputedStyle(currentElement).backgroundImage;
            const imageUrl = bgImage.slice(4, -1).replace(/"/g, "");
            const productCard = currentElement.closest('.product-card');
            const productTitle = productCard ? productCard.querySelector('h3').textContent : '';
            
            lightboxImg.src = imageUrl;
            lightboxCaption.textContent = productTitle;
        }
    }
    
    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);
    
    // Cerrar con ESC o click fuera de la imagen
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
}

// ===== EFECTO PARALLAX =====
function initParallax() {
    const parallaxSections = document.querySelectorAll('.parallax-section, .hero, .cta-section');
    
    window.addEventListener('scroll', () => {
        parallaxSections.forEach(section => {
            const scrolled = window.pageYOffset;
            const sectionTop = section.offsetTop;
            const rate = (scrolled - sectionTop) * 0.5;
            
            // Aplicar el efecto solo cuando la sección está visible
            if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + section.offsetHeight) {
                section.style.backgroundPositionY = rate + 'px';
            }
        });
    });
}

// ===== EFECTOS ADICIONALES EN CARDS DE PRODUCTOS =====
function initProductCardEffects() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Efecto 3D al mover el mouse
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
        
        // Animación al entrar en viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(card);
    });
}

// ===== ANIMACIÓN DE ENTRADA PARA ELEMENTOS =====
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animationType = entry.target.dataset.animate;
                entry.target.style.animation = `${animationType} 0.8s ease forwards`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
}

// ===== SMOOTH REVEAL PARA SECCIONES =====
function smoothReveal() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => observer.observe(section));
}

// Inicializar smooth reveal
smoothReveal();

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', () => {
    console.log('✅ Todas las funciones cargadas correctamente');
    console.log('🎨 Modo oscuro:', localStorage.getItem('darkMode'));
});

// Agregar animación personalizada al CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);