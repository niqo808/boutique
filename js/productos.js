/**
 * PRODUCTOS - LA PAZ
 * Funcionalidades interactivas para la página de productos
 */

// Base de datos de productos
const productsData = {
    'bife-chorizo': {
        title: 'Bife de Chorizo',
        image: '../images/bife_chorizo.jpg',
        rating: 5,
        description: 'El corte estrella de la parrilla argentina. Con un marmoleado excepcional que le da su característico sabor intenso y jugosidad incomparable.',
        weight: '400-500g',
        cooking: 'Parrilla o Plancha',
        time: '15-20 minutos',
        temp: '60-65°C (medio)',
        recommendations: [
            'Dejar temperar 30 minutos antes de cocinar',
            'Sellar a fuego fuerte 3-4 minutos por lado',
            'Dejar reposar 5 minutos antes de cortar',
            'Acompañar con chimichurri casero',
            'Ideal para término medio o medio jugoso'
        ]
    },
    'lomo': {
        title: 'Lomo',
        image: '../images/carne2.jpg',
        rating: 5,
        description: 'El corte más tierno y magro de la res. Ideal para ocasiones especiales y preparaciones gourmet que requieren máxima terneza.',
        weight: '300-400g',
        cooking: 'Plancha, Parrilla o Horno',
        time: '10-15 minutos',
        temp: '55-60°C (jugoso)',
        recommendations: [
            'Perfecto para medallones o lomo entero',
            'No sobrecocinar para mantener jugosidad',
            'Marinar con hierbas frescas 2 horas antes',
            'Sellar rápido a alta temperatura',
            'Ideal para término jugoso o medio jugoso'
        ]
    },
    'bife-ancho': {
        title: 'Bife Ancho',
        image: '../images/carne3.jpg',
        rating: 4.5,
        description: 'Corte generoso con hueso que aporta sabor intenso. Su marmoleado perfecto lo hace ideal para parrilla tradicional.',
        weight: '500-600g',
        cooking: 'Parrilla',
        time: '15-20 minutos',
        temp: '60-65°C (medio)',
        recommendations: [
            'El hueso aporta sabor durante la cocción',
            'Cocinar con el hueso hacia abajo primero',
            'Dar vuelta solo una vez',
            'Dejar reposar con papel aluminio',
            'Excelente con sal gruesa y pimienta'
        ]
    },
    'bife-angosto': {
        title: 'Bife Angosto',
        image: '../images/carne4.jpg',
        rating: 4.5,
        description: 'Corte magro y sabroso, perfecto para quienes buscan menos grasa sin sacrificar el sabor característico de la carne argentina.',
        weight: '300-400g',
        cooking: 'Parrilla o Plancha',
        time: '12-18 minutos',
        temp: '60-65°C (medio)',
        recommendations: [
            'Ideal para quienes prefieren cortes magros',
            'No requiere mucho tiempo de cocción',
            'Acompañar con ensalada fresca',
            'Perfecto para sandwiches gourmet',
            'Marinar con limón y ajo realza su sabor'
        ]
    },
    'asado-tira': {
        title: 'Asado de Tira',
        image: '../images/carne6.jpg',
        rating: 4,
        description: 'El clásico argentino por excelencia. Las tiras de costilla con su carne jugosa y el hueso que aporta sabor único son infaltables en toda parrillada.',
        weight: 'Por kilogramo',
        cooking: 'Parrilla',
        time: '20-25 minutos',
        temp: '65-70°C (medio a cocido)',
        recommendations: [
            'Cocinar a fuego medio-bajo constante',
            'Comenzar con el hueso hacia las brasas',
            'No pinchar la carne durante la cocción',
            'Ideal para parrilladas familiares',
            'Acompañar con provoleta y chorizo'
        ]
    },
    'vacio': {
        title: 'Vacío',
        image: '../images/carne7.jpg',
        rating: 5,
        description: 'Corte versátil y jugoso con su característica capa de grasa. Perfecto tanto para parrilla como para cocción al horno.',
        weight: 'Por kilogramo',
        cooking: 'Parrilla o Horno',
        time: '25-30 minutos',
        temp: '65-70°C (medio a cocido)',
        recommendations: [
            'Cocinar con la capa de grasa hacia arriba',
            'No retirar la grasa antes de cocinar',
            'Ideal para vacío a la estaca',
            'Excelente para sandwiches al día siguiente',
            'Marcar cruzado la grasa para mejor cocción'
        ]
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Verificar que los elementos existan
    const filtersSection = document.querySelector('.filters-section');
    const filterButtons = document.querySelectorAll('.filter-btn-product');
    
    console.log('👁️ Verificando elementos...');
    console.log('Sección de filtros:', filtersSection);
    console.log('Cantidad de botones:', filterButtons.length);
    
    // Forzar visibilidad
    if (filtersSection) {
        filtersSection.style.display = 'block';
        filtersSection.style.visibility = 'visible';
        filtersSection.style.opacity = '1';
        console.log('✅ Filtros forzados a visible');
    }
    
    initFilters();
    initModal();
    console.log('✅ Módulo de Productos cargado');
});

// ===== SISTEMA DE FILTROS =====
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn-product');
    const productCards = document.querySelectorAll('.product-card-full');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');

            // Actualizar botones activos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filtrar productos
            productCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category');

                if (category === 'all' || cardCategories.includes(category)) {
                    card.style.display = 'flex';
                    // Animación de entrada
                    card.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ===== SISTEMA DE MODAL =====
function initModal() {
    const modal = document.getElementById('productModal');
    const modalOverlay = document.querySelector('.modal-overlay-product');
    const closeBtn = document.querySelector('.modal-close-product');
    const viewDetailButtons = document.querySelectorAll('.btn-view-detail');
    const moreInfoButtons = document.querySelectorAll('.btn-product-secondary');

    // Abrir modal desde botones "Ver Detalles"
    viewDetailButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            openModal(productId);
        });
    });

    // Abrir modal desde botones "Más Info"
    moreInfoButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            openModal(productId);
        });
    });

    // Cerrar modal
    closeBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Cerrar con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function openModal(productId) {
        const product = productsData[productId];
        
        if (!product) {
            console.error('Producto no encontrado:', productId);
            return;
        }

        // Llenar información del modal
        document.getElementById('modalImage').src = product.image;
        document.getElementById('modalImage').alt = product.title;
        document.getElementById('modalTitle').textContent = product.title;
        document.getElementById('modalDescription').textContent = product.description;
        document.getElementById('modalWeight').textContent = product.weight;
        document.getElementById('modalCooking').textContent = product.cooking;
        document.getElementById('modalTime').textContent = product.time;
        document.getElementById('modalTemp').textContent = product.temp;

        // Llenar rating
        const ratingContainer = document.getElementById('modalRating');
        ratingContainer.innerHTML = '';
        const fullStars = Math.floor(product.rating);
        const hasHalfStar = product.rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            ratingContainer.innerHTML += '<i class="fas fa-star"></i>';
        }
        if (hasHalfStar) {
            ratingContainer.innerHTML += '<i class="fas fa-star-half-alt"></i>';
        }

        // Llenar recomendaciones
        const recommendationsContainer = document.getElementById('modalRecommendations');
        recommendationsContainer.innerHTML = '';
        product.recommendations.forEach(rec => {
            const li = document.createElement('li');
            li.textContent = rec;
            recommendationsContainer.appendChild(li);
        });

        // Mostrar modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Animación de entrada
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
