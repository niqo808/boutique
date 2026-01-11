/**
 * GSAP ANIMATIONS - SOBRE NOSOTROS
 * Animaciones espectaculares para la página de historia de La Paz
 */

if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Solo ejecutar si estamos en la página sobre-nosotros
    if (document.querySelector('.hero-nosotros')) {
        
        console.log('🎬 Iniciando animaciones de Sobre Nosotros...');

        // ===== HERO SECTION con PARALLAX ===== 
        gsap.to('.hero-nosotros', {
            scrollTrigger: {
                trigger: '.hero-nosotros',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            backgroundPosition: '50% 100%',
            ease: 'none'
        });

        // Animación de entrada del hero
        gsap.from('.hero-title', {
            y: 100,
            opacity: 0,
            duration: 1.5,
            ease: 'power3.out',
            delay: 0.3
        });

        gsap.from('.hero-subtitle', {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.6
        });

        gsap.from('.hero-scroll-indicator', {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 1
        });

        // ===== TEXTO REVEAL ANIMATION =====
        gsap.utils.toArray('.reveal-text').forEach(element => {
            // Establecer estado inicial
            gsap.set(element, { opacity: 0, y: 60 });
            
            gsap.to(element, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                    once: true
                },
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                clearProps: 'transform,opacity',
                onComplete: function() {
                    element.style.opacity = '';
                    element.style.transform = '';
                }
            });
        });

        // ===== TIMELINE ANIMATION =====
        const timelineItems = gsap.utils.toArray('.timeline-item');
        
        timelineItems.forEach((item, index) => {
            const isLeft = item.classList.contains('timeline-left');
            
            // Establecer estado inicial
            gsap.set(item, { 
                x: isLeft ? -100 : 100, 
                opacity: 0 
            });
            
            gsap.to(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                    once: true
                },
                x: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                delay: index * 0.1,
                clearProps: 'transform,opacity'
            });

            // Animar el dot
            const dot = item.querySelector('.timeline-dot');
            gsap.set(dot, { scale: 0, opacity: 0 });
            
            gsap.to(dot, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                    once: true
                },
                scale: 1,
                opacity: 1,
                duration: 0.6,
                ease: 'back.out(2)',
                delay: 0.5 + (index * 0.1),
                clearProps: 'transform,opacity'
            });

            // Animar la imagen dentro del timeline - NO limpiar opacity para que no desaparezca
            const image = item.querySelector('.timeline-image');
            if (image) {
                gsap.set(image, { scale: 0.8, opacity: 0 });
                
                gsap.to(image, {
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 75%',
                        toggleActions: 'play none none none',
                        once: true
                    },
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    delay: 0.7 + (index * 0.1),
                    clearProps: 'transform' // Solo limpiar transform, NO opacity
                });
            }
        });

        // ===== STATS SECTION - CONTADOR ANIMADO =====
        const statCards = gsap.utils.toArray('.stat-card');
        
        statCards.forEach((card, index) => {
            // Establecer estado inicial
            gsap.set(card, { scale: 0.5, opacity: 0 });
            
            // Animación de entrada de la card
            gsap.to(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                    once: true
                },
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: 'back.out(2)',
                delay: index * 0.15,
                clearProps: 'transform,opacity'
            });

            // Contador animado - ARREGLADO
            const numberElement = card.querySelector('.stat-number');
            if (numberElement) {
                const target = parseInt(numberElement.getAttribute('data-target'));
                
                ScrollTrigger.create({
                    trigger: card,
                    start: 'top 85%',
                    once: true,
                    onEnter: () => {
                        // Objeto temporal para animar el número
                        const obj = { value: 0 };
                        
                        gsap.to(obj, {
                            value: target,
                            duration: 2,
                            ease: 'power1.out',
                            delay: index * 0.15,
                            onUpdate: function() {
                                numberElement.textContent = Math.ceil(obj.value);
                            }
                        });
                    }
                });
            }
        });

        // ===== VALUES CARDS ANIMATION =====
        const valueCards = gsap.utils.toArray('.value-card');
        
        valueCards.forEach((card, index) => {
            // Establecer estado inicial
            gsap.set(card, { y: 80, opacity: 0 });
            
            gsap.to(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                    once: true
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                delay: index * 0.1,
                clearProps: 'transform,opacity'
            });

            // Animación del icono
            const icon = card.querySelector('.value-icon');
            if (icon) {
                gsap.set(icon, { scale: 0, rotation: 360 });
                
                gsap.to(icon, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                        once: true
                    },
                    scale: 1,
                    rotation: 0,
                    duration: 0.8,
                    ease: 'back.out(2)',
                    delay: 0.3 + (index * 0.1),
                    clearProps: 'transform'
                });
            }
        });

        // ===== PROCESS STEPS ANIMATION =====
        const processSteps = gsap.utils.toArray('.process-step');
        
        processSteps.forEach((step, index) => {
            const isEven = index % 2 === 1;
            
            // Establecer estado inicial
            gsap.set(step, { 
                x: isEven ? 100 : -100, 
                opacity: 0 
            });
            
            gsap.to(step, {
                scrollTrigger: {
                    trigger: step,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                    once: true
                },
                x: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                clearProps: 'transform,opacity'
            });

            // Número del step con efecto especial
            const number = step.querySelector('.step-number');
            if (number) {
                gsap.set(number, { scale: 0, rotation: 720, opacity: 0 });
                
                gsap.to(number, {
                    scrollTrigger: {
                        trigger: step,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                        once: true
                    },
                    scale: 1,
                    rotation: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'back.out(2)',
                    delay: 0.3,
                    clearProps: 'transform,opacity'
                });
            }

            // Imagen del step - NO limpiar opacity
            const image = step.querySelector('.step-image');
            if (image) {
                gsap.set(image, { scale: 0.7, opacity: 0 });
                
                gsap.to(image, {
                    scrollTrigger: {
                        trigger: step,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                        once: true
                    },
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    delay: 0.5,
                    clearProps: 'transform' // Solo transform, NO opacity
                });
            }
        });

        // ===== GALLERY ANIMATION =====
        const photoItems = gsap.utils.toArray('.photo-item');
        
        photoItems.forEach((photo, index) => {
            // Establecer estado inicial
            gsap.set(photo, { scale: 0.7, opacity: 0 });
            
            gsap.to(photo, {
                scrollTrigger: {
                    trigger: photo,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                    once: true
                },
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: 'back.out(1.7)',
                delay: index * 0.1,
                clearProps: 'transform' // Solo transform, NO opacity para que no se pongan blancas
            });
        });

        // ===== PARALLAX PARA SECCIONES =====
        gsap.utils.toArray('.stats-section, .process-section').forEach(section => {
            gsap.to(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                },
                backgroundPosition: '50% 30%',
                ease: 'none'
            });
        });

        // ===== HOVER EFFECTS MEJORADOS =====
        
        // Timeline items hover
        timelineItems.forEach(item => {
            const content = item.querySelector('.timeline-content');
            
            if (content) {
                item.addEventListener('mouseenter', () => {
                    gsap.to(content, {
                        y: -10,
                        boxShadow: '0 20px 60px rgba(139, 0, 0, 0.2)',
                        duration: 0.3,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                });
                
                item.addEventListener('mouseleave', () => {
                    gsap.to(content, {
                        y: 0,
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                        duration: 0.3,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                });
            }
        });

        // Value cards hover
        valueCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -10,
                    scale: 1.02,
                    duration: 0.3,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });
            });
        });

        // Photo gallery hover
        photoItems.forEach(photo => {
            photo.addEventListener('mouseenter', () => {
                gsap.to(photo, {
                    scale: 1.03,
                    duration: 0.4,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });
            });
            
            photo.addEventListener('mouseleave', () => {
                gsap.to(photo, {
                    scale: 1,
                    duration: 0.4,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });
            });
        });

        // ===== EFECTO DE FADE EN SCROLL PARA HERO =====
        gsap.to('.hero-nosotros-content', {
            scrollTrigger: {
                trigger: '.hero-nosotros',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            opacity: 0,
            y: 100,
            ease: 'none'
        });

        // ===== ANIMACIÓN DE LA LÍNEA DEL TIMELINE (REMOVIDA - causa error) =====
        // No se puede animar pseudo-elementos ::before directamente con GSAP
        // La línea se muestra normalmente sin animación

        // ===== BOTÓN DE SCROLL =====
        const scrollButton = document.getElementById('scrollButton');
        const introSection = document.getElementById('intro-section');
        
        if (scrollButton && introSection) {
            scrollButton.addEventListener('click', () => {
                // Usar GSAP para scroll suave - MÁS RÁPIDO
                gsap.to(window, {
                    duration: 0.8, // Reducido de 1.5s a 0.8s
                    scrollTo: {
                        y: introSection,
                        offsetY: 100 // Para dejar espacio con el navbar
                    },
                    ease: 'power2.inOut' // Ease más rápido
                });
                
                console.log('👆 Scroll hacia intro-section');
            });
            
            console.log('✅ Botón de scroll configurado');
        }

        console.log('✨ Animaciones de Sobre Nosotros cargadas correctamente');
    }
} else {
    console.warn('⚠️ GSAP no está disponible');
}
