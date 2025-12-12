// Registrar plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Fade in elements
gsap.utils.toArray('.fade-in').forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power2.out'
            });
        });
        
// Sucursal cards stagger with better animations
gsap.from('.sucursal-card', {
    scrollTrigger: {
        trigger: '.sucursales-grid',
        start: 'top 80%',
    },
    opacity: 0,
    y: 40,
    duration: 0.6,
    stagger: 0.12,
    ease: 'power2.out'
});

// Hover effect on cards
gsap.utils.toArray('.sucursal-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            duration: 0.3,
            y: -10,
            boxShadow: '0 20px 50px rgba(139, 0, 0, 0.2)',
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            duration: 0.3,
            y: 0,
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            ease: 'power2.out'
        });
    });
    
});