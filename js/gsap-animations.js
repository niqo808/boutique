// =======================
// GSAP SETUP
// =======================

gsap.registerPlugin(
    ScrollTrigger,
    ScrollToPlugin,
    SplitText,
    ScrollSmoother,
    TextPlugin
);

// =======================
// SCROLLSMOOTHER
// =======================
const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.3,         // ultra smooth
    effects: true,
    normalizeScroll: true,
});

// =======================
// ANIMACIONES GLOBALES
// =======================

// Fade suave general (para cualquier elemento con clase .fade-in)
gsap.utils.toArray(".fade-in").forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
        },
        opacity: 0,
        y: 40,
        duration: 1.2,
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
    opacity: 0,
    duration: 0.8,
    delay: 0.8,
    ease: "power2.out"
});

// =======================
// CAROUSEL — efecto premiuM
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
// PRODUCTOS — efecto stagger + reveal
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
// CLIENTES — logos flotando + reveal
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
// TESTIMONIOS — alternando dirección
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
// CTA SECTION — scale + fade
// =======================
gsap.from(".cta-section", {
    scrollTrigger: {
        trigger: ".cta-section",
        start: "top 85%",
    },
    scale: 0.95,
    opacity: 0,
    duration: 1.3,
    ease: "power3.out"
});

// =======================
// Smooth scroll para anchors
// =======================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
        const target = document.querySelector(link.getAttribute("href"));

        if (target) {
            e.preventDefault();
            smoother.scrollTo(target, true, { offset: -70 });
        }
    });
});

// =======================
// PARALLAX EFFECTS
// =======================

// Parallax imágenes globales (usar clase .parallax-img)
gsap.utils.toArray(".parallax-img").forEach((img) => {
    gsap.to(img, {
        y: () => img.getAttribute("data-speed") || -50,
        ease: "none",
        scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
        }
    });
});

// Hero parallax background
gsap.to(".hero", {
    backgroundPositionY: "40%",
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1.5
    }
});

// Carousel parallax images
gsap.utils.toArray(".slide-img img").forEach((img) => {
    gsap.to(img, {
        y: -40,
        ease: "none",
        scrollTrigger: {
            trigger: img,
            start: "top 90%",
            end: "bottom top",
            scrub: 1
        }
    });
});

// Carousel parallax text
gsap.utils.toArray(".slide-text").forEach((text) => {
    gsap.to(text, {
        y: 40,
        ease: "none",
        scrollTrigger: {
            trigger: text,
            start: "top 90%",
            end: "bottom top",
            scrub: 1.2
        }
    });
});

// Product images parallax
gsap.utils.toArray(".product-image").forEach((card) => {
    gsap.to(card, {
        y: -20,
        ease: "none",
        scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        }
    });
});

// Testimonials parallax alternado
gsap.utils.toArray(".testimonial-card").forEach((card, i) => {
    gsap.to(card, {
        y: i % 2 === 0 ? -25 : 25,
        ease: "none",
        scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
        }
    });
});

