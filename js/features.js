/**
 * LA PAZ - NUEVAS FEATURES
 * Funcionalidades adicionales para mejorar la experiencia del usuario
 */

document.addEventListener('DOMContentLoaded', function() {
    initWhatsAppButton();
    initBackToTop();
    initDarkMode();
    initLightbox();
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
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

// ===== EFECTOS ADICIONALES EN CARDS DE PRODUCTOS =====
function initProductCardEffects() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Animación simple al entrar en viewport
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