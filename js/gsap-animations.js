// =======================
// GSAP SETUP
// =======================

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// =======================
// ANIMACIONES GLOBALES
// =======================

// Fade suave general (para cualquier elemento con clase .fade-in)
gsap.utils.toArray(".fade-in").forEach(el => {
    // Asegurar que el elemento sea visible primero
    gsap.set(el, { opacity: 1 });
    
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
    });
});

// =======================
// HERO SECTION
// =======================
gsap.from(".hero-content h1", {
    y: 60,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
});

gsap.from(".hero-subtitle", {
    y: 40,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power3.out"
});

gsap.from(".hero-description", {
    y: 40,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: "power3.out"
});

gsap.from(".cta-button", {
    y: 20,
    opacity: 1,
    duration: 0.8,
    delay: 0.8,
    ease: "power2.out"
});

// =======================
// CAROUSEL – efecto premium
// =======================
gsap.utils.toArray(".carousel-item").forEach(slide => {

    let text = slide.querySelector(".slide-text");
    let img = slide.querySelector(".slide-img");

    if (text) {
        gsap.from(text, {
            scrollTrigger: {
                trigger: slide,
                start: "top 80%",
            },
            x: -60,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        });
    }

    if (img) {
        gsap.from(img, {
            scrollTrigger: {
                trigger: slide,
                start: "top 80%",
            },
            x: 60,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        });
    }
});

// =======================
// PRODUCTOS – efecto stagger + reveal
// =======================
gsap.utils.toArray(".product-card").forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 1.1,
        ease: "power2.out",
        delay: i * 0.12
    });
});

// =======================
// CLIENTES – logos flotando + reveal
// =======================

// efecto float infinito (muy sutil)
gsap.to(".client-logo img", {
    y: -10,
    repeat: -1,
    yoyo: true,
    duration: 2,
    ease: "sine.inOut",
    stagger: 0.15
});

// logos aparecen al scroll
gsap.utils.toArray(".client-logo").forEach((logo, i) => {
    gsap.from(logo, {
        scrollTrigger: {
            trigger: logo,
            start: "top 90%",
        },
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out"
    });
});

// =======================
// TESTIMONIOS – alternando dirección
// =======================
gsap.utils.toArray(".testimonial-card").forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
        },
        x: i % 2 === 0 ? -40 : 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    });
});

// =======================
// CTA SECTION – scale + fade (ARREGLADO)
// =======================
const ctaSection = document.querySelector(".cta-section");
if (ctaSection) {
    // Asegurar visibilidad por defecto
    gsap.set(ctaSection, { opacity: 1, scale: 1 });
    
    gsap.from(ctaSection, {
        scrollTrigger: {
            trigger: ctaSection,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        scale: 0.95,
        opacity: 0,
        duration: 1.3,
        ease: "power3.out"
    });
}

// =======================
// Smooth scroll para anchors
// =======================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
        const target = document.querySelector(link.getAttribute("href"));

        if (target) {
            e.preventDefault();
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 70
                },
                ease: "power3.inOut"
            });
        }
    });
});