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

        // Animación escalonada de los feature badges con LIMPIEZA DE PROPIEDADES
        gsap.from('.feature-badge', {
            y: 14,
            scale: 0.96,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
                trigger: '.products-hero',
                start: 'top 80%',
                toggleActions: 'play none none none',
                once: true
            },
            clearProps: 'all' // ✅ Limpiar todas las propiedades después de la animación
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

        // ===== FILTERS SECTION - ARREGLADO =====
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
            ease: 'power2.out',
            clearProps: 'all' // ✅ Limpiar propiedades
        });

        // ✅ ARREGLO CRÍTICO: Limpiar propiedades de los botones de filtro
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
            delay: 0.3,
            clearProps: 'all', // ✅ Limpiar TODAS las propiedades
            onComplete: function() {
                // ✅ Asegurar que los botones queden en su estado normal
                document.querySelectorAll('.filter-btn-product').forEach(btn => {
                    btn.style.transform = '';
                    btn.style.scale = '';
                    btn.style.opacity = '';
                });
            }
        });

        // ===== PRODUCT CARDS =====
        gsap.set('.product-card-full', {
            force3D: true,
            transformPerspective: 1000
        });
        
        const productCards = gsap.utils.toArray('.product-card-full');
        
        productCards.forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 95%',
                    toggleActions: 'play none none none',
                    once: true
                },
                y: 60,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out',
                delay: index * 0.08,
                force3D: true,
                clearProps: 'all' // ✅ Limpiar propiedades
            });

            // Animación del badge premium
            const badge = card.querySelector('.product-badge-premium');
            if (badge) {
                gsap.set(badge, {
                    opacity: 1,
                    visibility: 'visible',
                    display: 'block',
                    zIndex: 1000
                });
                
                gsap.from(badge, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 95%',
                        toggleActions: 'play none none none',
                        once: true
                    },
                    scale: 0.5,
                    duration: 0.4,
                    ease: 'back.out(1.7)',
                    delay: 0.2 + (index * 0.08),
                    force3D: true,
                    clearProps: 'scale' // Solo limpiar scale, mantener display y visibility
                });
            }
        });

        // ===== HOVER EFFECTS MEJORADOS =====
        productCards.forEach(card => {
            const image = card.querySelector('.product-image-full');
            const badge = card.querySelector('.product-badge-premium');
            
            const xTo = gsap.quickTo(card, 'y', {duration: 0.3, ease: 'power2.out'});
            const scaleToImage = gsap.quickTo(image, 'scale', {duration: 0.3, ease: 'power2.out'});
            
            card.addEventListener('mouseenter', () => {
                xTo(-15);
                scaleToImage(1.1);

                if (badge) {
                    gsap.to(badge, {
                        rotation: 5,
                        scale: 1.05,
                        duration: 0.2,
                        ease: 'power2.out'
                    });
                }
            });

            card.addEventListener('mouseleave', () => {
                xTo(0);
                scaleToImage(1);

                if (badge) {
                    gsap.to(badge, {
                        rotation: 0,
                        scale: 1,
                        duration: 0.2,
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
                stagger: 0.08,
                clearProps: 'all' // ✅ Limpiar propiedades
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
                stagger: 0.1,
                clearProps: 'all' // ✅ Limpiar propiedades
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
                stagger: 0.1,
                clearProps: 'all' // ✅ Limpiar propiedades
            });
        });

        // ===== MODAL ANIMATIONS =====
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

            gsap.set([modalImage, modalInfo], { opacity: 0 });

            gsap.to(modalImage, {
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out',
                delay: 0.2
            });

            gsap.to(modalInfo, {
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out',
                delay: 0.3
            });

            gsap.from(detailItems, {
                scale: 0,
                opacity: 0,
                duration: 0.4,
                ease: 'back.out(2)',
                stagger: 0.08,
                delay: 0.5,
                clearProps: 'all'
            });

            if (recommendations) {
                gsap.from(recommendations, {
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    delay: 0.7,
                    clearProps: 'all'
                });

                const recItems = recommendations.querySelectorAll('li');
                gsap.from(recItems, {
                    x: -20,
                    opacity: 0,
                    duration: 0.4,
                    ease: 'power2.out',
                    stagger: 0.08,
                    delay: 0.9,
                    clearProps: 'all'
                });
            }

            gsap.from(modalActions, {
                y: 20,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out',
                stagger: 0.1,
                delay: 1,
                clearProps: 'all'
            });
        }

        // ===== SMOOTH ANIMATIONS ON SCROLL =====
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
