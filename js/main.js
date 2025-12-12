/**
 * Funcionalidad principal para el sitio web
 */


// ===== FUNCIONALIDAD DEL NAVBAR =====

// Efecto de desplazamiento del navbar
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Agregar clase 'scrolled' al desplazarse hacia abajo
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Prevenir el desplazamiento del body cuando el menú está abierto
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Cerrar menú al hacer clic en un enlace
    const navLinksItems = navLinks.querySelectorAll('a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}


// ===== RESALTADO DEL ENLACE ACTIVO EN EL NAV =====
const sections = document.querySelectorAll('section[id]');

function setActiveNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - navbar.offsetHeight - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);
        
        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink.classList.add('active');
        } else if (navLink) {
            navLink.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// ===== LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    // Observar todas las imágenes con el atributo data-src
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===== OPTIMIZACIÓN DE RENDIMIENTO =====

// Función debounce para eventos de desplazamiento
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Aplicar debounce a eventos de desplazamiento
window.addEventListener('scroll', debounce(() => {
    // Optimización relacionada con el desplazamiento
    setActiveNavLink();
}, 10));

// ===== ANIMACIÓN DE CARGA DE PÁGINA =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== FUNCIONES UTILITARIAS =====

// Verificar si un elemento está en el viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
