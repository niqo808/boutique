/**
 * GSAP ANIMATIONS - SUCURSALES
 * Animaciones específicas para la página de sucursales - VERSION ARREGLADA
 */

// Verificar que GSAP esté disponible
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Solo ejecutar si estamos en la página de sucursales
    if (document.querySelector('.sucursales-section')) {
        
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
                toggleActions: 'play none none none'
            },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        // ===== SUCURSAL CARDS - Animación simplificada y limpia =====
        const sucursalesGrid = document.querySelector('.sucursales-grid');
        
        if (sucursalesGrid) {
            const cards = gsap.utils.toArray('.sucursal-card');
            
            // Establecer estado inicial explícitamente
            gsap.set(cards, {
                opacity: 0,
                y: 60
            });
            
            // Animación de entrada con limpieza de propiedades
            gsap.to(cards, {
                scrollTrigger: {
                    trigger: sucursalesGrid,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                    once: true
                },
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                clearProps: 'transform,opacity',
                onComplete: function() {
                    // Asegurar que todas las propiedades están limpias después de la animación
                    cards.forEach(card => {
                        card.style.opacity = '';
                        card.style.transform = '';
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
                    toggleActions: 'play none none none'
                },
                scale: 0.95,
                opacity: 0,
                duration: 1,
                ease: 'power2.out',
                clearProps: 'all'
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
                    ease: 'power2.out',
                    overwrite: 'auto'
                });

                // Animar número de sucursal
                const numero = this.querySelector('.sucursal-numero');
                if (numero) {
                    gsap.to(numero, {
                        scale: 1.1,
                        rotate: 360,
                        duration: 0.5,
                        ease: 'back.out(2)',
                        overwrite: 'auto'
                    });
                }
            });

            card.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    y: 0,
                    duration: 0.4,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });

                const numero = this.querySelector('.sucursal-numero');
                if (numero) {
                    gsap.to(numero, {
                        scale: 1,
                        rotate: 0,
                        duration: 0.4,
                        ease: 'power2.out',
                        overwrite: 'auto'
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
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                });

                btn.addEventListener('mouseleave', function() {
                    gsap.to(this, {
                        y: 0,
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out',
                        overwrite: 'auto'
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

        console.log('✨ GSAP Sucursales - Animaciones cargadas correctamente');
    }
} else {
    console.warn('⚠️ GSAP no está disponible. Las animaciones no se cargarán.');
}