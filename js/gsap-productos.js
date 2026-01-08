/**
 * GSAP ANIMATIONS - PRODUCTOS
 * Animaciones profesionales para la página de productos
 */

if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Solo ejecutar si estamos en la página de productos
    if (document.querySelector('.products-hero')) {
        
        console.log('🎬 Iniciando animaciones de Productos...');

        // ===== HERO SECTION =====
        gsap.from('.hero-title-products', {
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.3
        });

        gsap.from('.hero-subtitle-products', {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.5
        });

        // Animación escalonada de los feature badges
        gsap.from('.feature-badge', {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            ease: 'back.out(2)',
            stagger: 0.15,
            delay: 0.8
        });

        // Parallax del hero
        gsap.to('.products-hero', {
            scrollTrigger: {
                trigger: '.products-hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            backgroundPosition: '50% 100%',
            ease: 'none'
        });

        // ===== FILTERS SECTION =====
        gsap.from('.filters-title', {
            scrollTrigger: {
                trigger: '.filters-section',
                start: 'top 90%',
                toggleActions: 'play none none none',
                once: true
            },
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
        });

        gsap.from('.filter-btn-product', {
            scrollTrigger: {
                trigger: '.filters-section',
                start: 'top 90%',
                toggleActions: 'play none none none',
                once: true
            },
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: 'back.out(2)',
            stagger: 0.08,
            delay: 0.3
        });

        // ===== PRODUCT CARDS =====
        const productCards = gsap.utils.toArray('.product-card-full');
        
        productCards.forEach((card, index) => {
            // Animación más suave con from en lugar de to
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse',
                    once: true
                },
                y: 100,
                opacity: 0,
                scale: 0.9,
                duration: 0.9,
                ease: 'power3.out',
                delay: index * 0.12
            });

            // Animación del badge premium
            const badge = card.querySelector('.product-badge-premium');
            if (badge) {
                gsap.from(badge, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                        once: true
                    },
                    scale: 0,
                    rotation: 360,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'back.out(2)',
                    delay: 0.3 + (index * 0.1)
                });
            }
        });

        // ===== HOVER EFFECTS MEJORADOS =====
        productCards.forEach(card => {
            const image = card.querySelector('.product-image-full');
            const badge = card.querySelector('.product-badge-premium');
            
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -15,
                    duration: 0.5,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });

                gsap.to(image, {
                    scale: 1.15,
                    duration: 0.5,
                    ease: 'power2.out'
                });

                if (badge) {
                    gsap.to(badge, {
                        rotation: 5,
                        scale: 1.1,
                        duration: 0.3,
                        ease: 'back.out(2)'
                    });
                }
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });

                gsap.to(image, {
                    scale: 1,
                    duration: 0.5,
                    ease: 'power2.out'
                });

                if (badge) {
                    gsap.to(badge, {
                        rotation: 0,
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        });

        // ===== ANIMACIÓN DE RATING STARS =====
        const ratings = document.querySelectorAll('.product-rating');
        
        ratings.forEach(rating => {
            const stars = rating.querySelectorAll('i');
            
            gsap.from(stars, {
                scrollTrigger: {
                    trigger: rating,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                    once: true
                },
                scale: 0,
                opacity: 0,
                rotation: 360,
                duration: 0.4,
                ease: 'back.out(2)',
                stagger: 0.08
            });
        });

        // ===== ANIMACIÓN DE SPECS =====
        const specs = document.querySelectorAll('.product-specs');
        
        specs.forEach(spec => {
            const items = spec.querySelectorAll('.spec-item');
            
            gsap.from(items, {
                scrollTrigger: {
                    trigger: spec,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                    once: true
                },
                x: -20,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out',
                stagger: 0.1
            });
        });

        // ===== ANIMACIÓN DE BOTONES =====
        const actionButtons = document.querySelectorAll('.product-actions');
        
        actionButtons.forEach(actions => {
            const buttons = actions.querySelectorAll('a, button');
            
            gsap.from(buttons, {
                scrollTrigger: {
                    trigger: actions,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                    once: true
                },
                y: 20,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out',
                stagger: 0.1
            });
        });

        // ===== MODAL ANIMATIONS =====
        // Observer para detectar cuando el modal se abre
        const modal = document.getElementById('productModal');
        if (modal) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'class') {
                        if (modal.classList.contains('active')) {
                            animateModal();
                        }
                    }
                });
            });

            observer.observe(modal, { attributes: true });
        }

        function animateModal() {
            const modalContent = document.querySelector('.modal-content-product');
            const modalImage = document.querySelector('.modal-image-section');
            const modalInfo = document.querySelector('.modal-info-section');
            const detailItems = document.querySelectorAll('.detail-item');
            const recommendations = document.querySelector('.modal-recommendations');
            const modalActions = document.querySelectorAll('.modal-actions button, .modal-actions a');

            // Reset inicial
            gsap.set([modalImage, modalInfo], { opacity: 0 });

            // Animación de la imagen
            gsap.to(modalImage, {
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out',
                delay: 0.2
            });

            // Animación del título y descripción
            gsap.to(modalInfo, {
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out',
                delay: 0.3
            });

            // Animación de los detail items
            gsap.from(detailItems, {
                scale: 0,
                opacity: 0,
                duration: 0.4,
                ease: 'back.out(2)',
                stagger: 0.08,
                delay: 0.5
            });

            // Animación de recomendaciones
            if (recommendations) {
                gsap.from(recommendations, {
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    delay: 0.7
                });

                const recItems = recommendations.querySelectorAll('li');
                gsap.from(recItems, {
                    x: -20,
                    opacity: 0,
                    duration: 0.4,
                    ease: 'power2.out',
                    stagger: 0.08,
                    delay: 0.9
                });
            }

            // Animación de botones de acción
            gsap.from(modalActions, {
                y: 20,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out',
                stagger: 0.1,
                delay: 1
            });
        }

        // ===== SMOOTH ANIMATIONS ON SCROLL =====
        // Efecto de fade en el hero cuando se hace scroll
        gsap.to('.products-hero-content', {
            scrollTrigger: {
                trigger: '.products-hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            opacity: 0,
            y: 50,
            ease: 'none'
        });

        console.log('✨ Animaciones de Productos cargadas correctamente');
    }
} else {
    console.warn('⚠️ GSAP no está disponible');
}
