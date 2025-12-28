/**
 * GSAP ANIMATIONS - SUCURSALES
 * Animaciones específicas para la página de sucursales
 */

// Verificar que GSAP esté disponible
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Solo ejecutar si estamos en la página de sucursales
    if (document.querySelector('.sucursales-section')) {
        
        // ===== ASEGURAR VISIBILIDAD INICIAL =====
        gsap.set('.fade-in', { opacity: 1 });
        gsap.set('.sucursal-card', { opacity: 1, y: 0 });

        // ===== PAGE HEADER - Entrada dramática =====
        gsap.from('.page-header h1', {
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.2
        });

        gsap.from('.page-header p', {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.5
        });

        // ===== CONTROLS SECTION - Fade in suave =====
        gsap.from('.controls-section', {
            y: -20,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.7
        });

        // ===== INFO BOX - Entrada desde la izquierda =====
        gsap.from('.info-box', {
            scrollTrigger: {
                trigger: '.info-box',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        // ===== SUCURSAL CARDS - Animación escalonada mejorada =====
        const sucursalesGrid = document.querySelector('.sucursales-grid');
        
        if (sucursalesGrid) {
            const cards = gsap.utils.toArray('.sucursal-card');
            
            cards.forEach((card, index) => {
                // Animación de entrada
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 90%',
                        toggleActions: 'play none none reverse',
                        once: true
                    },
                    y: 60,
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: 'back.out(1.2)',
                    clearProps: 'all'
                });

                // ===== ANIMACIONES INTERNAS DE CADA CARD =====
                
                // Header de la sucursal
                const header = card.querySelector('.sucursal-header');
                if (header) {
                    gsap.from(header, {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            once: true
                        },
                        y: -20,
                        opacity: 0,
                        duration: 0.6,
                        delay: index * 0.15 + 0.2,
                        ease: 'power2.out'
                    });
                }

                // Galería de imágenes
                const gallery = card.querySelector('.sucursal-gallery');
                if (gallery) {
                    gsap.from(gallery, {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 80%',
                            once: true
                        },
                        scale: 0.9,
                        opacity: 0,
                        duration: 0.8,
                        delay: index * 0.15 + 0.3,
                        ease: 'power2.out'
                    });
                }

                // Thumbnails de la galería
                const thumbs = card.querySelectorAll('.thumb-img');
                if (thumbs.length > 0) {
                    gsap.from(thumbs, {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 75%',
                            once: true
                        },
                        y: 20,
                        opacity: 0,
                        duration: 0.5,
                        stagger: 0.1,
                        delay: index * 0.15 + 0.5,
                        ease: 'power2.out'
                    });
                }

                // Items de información
                const infoItems = card.querySelectorAll('.info-item');
                if (infoItems.length > 0) {
                    gsap.from(infoItems, {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 75%',
                            once: true
                        },
                        x: -30,
                        opacity: 0,
                        duration: 0.6,
                        stagger: 0.1,
                        delay: index * 0.15 + 0.4,
                        ease: 'power2.out'
                    });
                }

                // Tags de servicios
                const serviceTags = card.querySelectorAll('.servicio-tag');
                if (serviceTags.length > 0) {
                    gsap.from(serviceTags, {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 70%',
                            once: true
                        },
                        scale: 0,
                        opacity: 0,
                        duration: 0.4,
                        stagger: 0.08,
                        delay: index * 0.15 + 0.6,
                        ease: 'back.out(2)'
                    });
                }

                // Botones de acción
                const actionButtons = card.querySelectorAll('.btn-sucursal');
                if (actionButtons.length > 0) {
                    gsap.from(actionButtons, {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 70%',
                            once: true
                        },
                        y: 20,
                        opacity: 0,
                        duration: 0.5,
                        stagger: 0.1,
                        delay: index * 0.15 + 0.7,
                        ease: 'power2.out'
                    });
                }
            });
        }

        // ===== MAPA - Fade in suave =====
        const mapContainer = document.getElementById('mapContainer');
        if (mapContainer) {
            gsap.from(mapContainer, {
                scrollTrigger: {
                    trigger: mapContainer,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                scale: 0.95,
                opacity: 0,
                duration: 1,
                ease: 'power2.out'
            });
        }

        // ===== EFECTOS HOVER MEJORADOS (CSS + GSAP) =====
        const cards = document.querySelectorAll('.sucursal-card');
        
        cards.forEach(card => {
            // Hover effect en la card completa
            card.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    y: -12,
                    duration: 0.4,
                    ease: 'power2.out'
                });

                // Animar número de sucursal
                const numero = this.querySelector('.sucursal-numero');
                if (numero) {
                    gsap.to(numero, {
                        scale: 1.1,
                        rotate: 360,
                        duration: 0.5,
                        ease: 'back.out(2)'
                    });
                }
            });

            card.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    y: 0,
                    duration: 0.4,
                    ease: 'power2.out'
                });

                const numero = this.querySelector('.sucursal-numero');
                if (numero) {
                    gsap.to(numero, {
                        scale: 1,
                        rotate: 0,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                }
            });

            // Hover en botones de acción
            const buttons = card.querySelectorAll('.btn-sucursal');
            buttons.forEach(btn => {
                btn.addEventListener('mouseenter', function() {
                    gsap.to(this, {
                        y: -3,
                        scale: 1.02,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });

                btn.addEventListener('mouseleave', function() {
                    gsap.to(this, {
                        y: 0,
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            });
        });

        // ===== ANIMACIÓN DEL HORARIO BADGE =====
        const badges = document.querySelectorAll('.horario-badge');
        badges.forEach(badge => {
            // Pulso sutil en badges abiertos
            if (badge.textContent.includes('Abierto')) {
                gsap.to(badge, {
                    scale: 1.05,
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            }
        });

        // ===== PARALLAX SUAVE EN ELEMENTOS =====
        gsap.utils.toArray('.sucursal-header').forEach(header => {
            gsap.to(header, {
                scrollTrigger: {
                    trigger: header,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                },
                y: -30,
                ease: 'none'
            });
        });

        console.log('✨ GSAP Sucursales - Animaciones cargadas');
    }
} else {
    console.warn('⚠️ GSAP no está disponible. Las animaciones no se cargarán.');
}