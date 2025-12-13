// Registrar plugins
gsap.registerPlugin(ScrollTrigger);

// Asegurar que todos los elementos sean visibles por defecto
gsap.set('.fade-in', { opacity: 1 });
gsap.set('.sucursal-card', { opacity: 1 });

// Fade in elements
gsap.utils.toArray('.fade-in').forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
    });
});
        
// Registrar plugins
gsap.registerPlugin(ScrollTrigger);

// Asegurar que todos los elementos sean visibles por defecto
gsap.set('.fade-in', { opacity: 1 });
gsap.set('.sucursal-card', { opacity: 1, y: 0 });

// Fade in elements
gsap.utils.toArray('.fade-in').forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
    });
});
        
// Sucursal cards
const sucursalesGrid = document.querySelector('.sucursales-grid');
if (sucursalesGrid) {
    const cards = gsap.utils.toArray('.sucursal-card');
    
    cards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: "play none none reverse",
                once: true // Solo anima una vez
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power2.out',
            clearProps: "all" // Limpia las propiedades después de animar
        });
    });
}

// Hover effect usando CSS en lugar de GSAP (más eficiente)
// Agregar clases de CSS para el hover
const style = document.createElement('style');
style.textContent = `
    .sucursal-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .sucursal-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 50px rgba(139, 0, 0, 0.2) !important;
    }
`;
document.head.appendChild(style);