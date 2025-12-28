/**
 * SUCURSALES - LA PAZ
 * Funcionalidades específicas de la página de sucursales
 * Compatible con features.js existente
 */

document.addEventListener('DOMContentLoaded', function() {
    // Solo inicializar si estamos en la página de sucursales
    if (document.querySelector('.sucursales-section')) {
        initViewToggle();
        initFilters();
        initGalleryInteraction();
        actualizarHorarios();
        
        console.log('✅ Módulo de Sucursales cargado');
    }
});

// ===== TOGGLE VISTA GRID/MAPA =====
function initViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const mapContainer = document.getElementById('mapContainer');
    const gridContainer = document.getElementById('sucursalesGrid');

    if (!viewButtons.length) return;

    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const vista = this.getAttribute('data-view');

            // Actualizar botones activos
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Cambiar vista con animación
            if (vista === 'mapa') {
                gridContainer.style.opacity = '0';
                setTimeout(() => {
                    mapContainer.classList.add('active');
                    gridContainer.classList.add('hidden');
                    setTimeout(() => {
                        mapContainer.style.opacity = '1';
                    }, 50);
                }, 300);
            } else {
                mapContainer.style.opacity = '0';
                setTimeout(() => {
                    mapContainer.classList.remove('active');
                    gridContainer.classList.remove('hidden');
                    setTimeout(() => {
                        gridContainer.style.opacity = '1';
                    }, 50);
                }, 300);
            }
        });
    });
}

// ===== FILTROS POR ZONA =====
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.sucursal-card');

    if (!filterButtons.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const zona = this.getAttribute('data-zona');

            // Actualizar botones activos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filtrar cards con animación
            cards.forEach((card, index) => {
                const cardZona = card.getAttribute('data-zona');

                if (zona === 'todas' || cardZona === zona) {
                    // Mostrar card
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 50);
                } else {
                    // Ocultar card
                    card.classList.remove('visible');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Mostrar todas las cards al inicio con delay escalonado
    setTimeout(() => {
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
        });
    }, 200);
}

// ===== GALERÍA INTERACTIVA (SIN LIGHTBOX PROPIO) =====
function initGalleryInteraction() {
    const galleries = document.querySelectorAll('.sucursal-gallery');

    galleries.forEach(gallery => {
        const mainImg = gallery.querySelector('.gallery-img');
        const thumbs = gallery.querySelectorAll('.thumb-img');
        const mainContainer = gallery.querySelector('.gallery-main');

        if (!mainImg || !thumbs.length) return;

        // Click en thumbnails para cambiar imagen principal
        thumbs.forEach(thumb => {
            thumb.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Cambiar imagen principal con efecto fade
                const tempSrc = mainImg.src;
                const tempAlt = mainImg.alt;
                
                mainImg.style.opacity = '0';
                mainImg.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    mainImg.src = this.src;
                    mainImg.alt = this.alt;
                    this.src = tempSrc;
                    this.alt = tempAlt;
                    
                    mainImg.style.opacity = '1';
                    mainImg.style.transform = 'scale(1)';
                }, 200);
            });

            // Efecto hover en thumbnails
            thumb.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
                this.style.opacity = '1';
            });

            thumb.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.opacity = '0.7';
            });
        });

        // Click en imagen principal para abrir en lightbox (usa el lightbox de features.js)
        mainContainer.addEventListener('click', function() {
            // Si existe el lightbox de features.js, lo usamos
            if (typeof openLightboxImage === 'function') {
                openLightboxImage(mainImg.src, mainImg.alt);
            } else {
                // Fallback: abrir en nueva pestaña si no hay lightbox
                window.open(mainImg.src, '_blank');
            }
        });
    });
}

// ===== ACTUALIZAR HORARIOS EN TIEMPO REAL =====
function actualizarHorarios() {
    const badges = document.querySelectorAll('.horario-badge');
    
    if (!badges.length) return;

    // Obtener hora y día actual
    const ahora = new Date();
    const horaActual = ahora.getHours();
    const minutoActual = ahora.getMinutes();
    const diaActual = ahora.getDay(); // 0 = Domingo, 6 = Sábado

    // Horarios por sucursal
    const horarios = [
        { lun_vie: [9, 20], sab: [9, 15], dom: null },      // Villa Rosa
        { lun_vie: [9, 20], sab: [9, 15], dom: null },      // Villa de Mayo
        { lun_vie: [8.5, 20.5], sab: [9, 16], dom: null },  // Villa Rosa II (8:30)
        { lun_vie: [9, 20], sab: [9, 14], dom: null },      // Adolfo Sourdeaux
        { lun_vie: [8, 20], sab: [8, 15], dom: null },      // Matheu
        { lun_vie: [9, 20], sab: [9, 15], dom: null }       // Don Torcuato
    ];

    badges.forEach((badge, index) => {
        const horario = horarios[index] || horarios[0];
        let estaAbierto = false;
        const horaActualDecimal = horaActual + (minutoActual / 60);

        // Verificar según el día
        if (diaActual >= 1 && diaActual <= 5) { // Lunes a Viernes
            const [horaInicio, horaCierre] = horario.lun_vie;
            estaAbierto = horaActualDecimal >= horaInicio && horaActualDecimal < horaCierre;
        } else if (diaActual === 6) { // Sábado
            if (horario.sab) {
                const [horaInicio, horaCierre] = horario.sab;
                estaAbierto = horaActualDecimal >= horaInicio && horaActualDecimal < horaCierre;
            }
        } else if (diaActual === 0) { // Domingo
            estaAbierto = false; // Cerrado los domingos
        }

        // Actualizar badge con animación
        const nuevoTexto = estaAbierto ? '🟢 Abierto ahora' : '🔴 Cerrado';
        
        if (badge.textContent !== nuevoTexto) {
            badge.style.transform = 'scale(0.9)';
            badge.style.opacity = '0.7';
            
            setTimeout(() => {
                badge.textContent = nuevoTexto;
                
                if (estaAbierto) {
                    badge.classList.remove('cerrado');
                } else {
                    badge.classList.add('cerrado');
                }
                
                badge.style.transform = 'scale(1)';
                badge.style.opacity = '1';
            }, 150);
        }
    });
}

// ===== STICKY CONTROLS CON EFECTO =====
let lastScrollPosition = 0;
window.addEventListener('scroll', function() {
    const controls = document.querySelector('.controls-section');
    
    if (!controls) return;

    const currentScroll = window.pageYOffset;
    
    // Efecto de sombra al hacer scroll
    if (currentScroll > 100) {
        controls.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        controls.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }

    lastScrollPosition = currentScroll;
});

// ===== ACTUALIZAR HORARIOS CADA MINUTO =====
setInterval(actualizarHorarios, 60000);

// ===== FUNCIÓN GLOBAL PARA ABRIR LIGHTBOX (COMPATIBLE CON FEATURES.JS) =====
// Esta función puede ser llamada desde features.js si existe
window.openLightboxImage = function(src, alt) {
    // Buscar el lightbox existente de features.js
    let lightbox = document.querySelector('.lightbox');
    
    if (lightbox) {
        const img = lightbox.querySelector('img');
        const caption = lightbox.querySelector('.lightbox-caption');
        
        if (img) img.src = src;
        if (caption) caption.textContent = alt || '';
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

// ===== EFECTO PARALLAX EN HEADER (OPCIONAL) =====
window.addEventListener('scroll', function() {
    const header = document.querySelector('.page-header');
    
    if (header && window.pageYOffset < window.innerHeight) {
        const scrolled = window.pageYOffset;
        header.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===== LOG DE INICIALIZACIÓN =====
console.log('🏪 Módulo de Sucursales - Sistema de horarios activo');
console.log('📸 Galerías interactivas habilitadas');
console.log('🗺️ Mapa y filtros configurados');