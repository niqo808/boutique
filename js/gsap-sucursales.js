gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);     
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
        
        // Sucursal cards stagger
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
