/**
 *Validación y envío del formulario de contacto
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearError(input));
        });
    }
});

// ===== MANEJADOR DE ENVÍO DEL FORMULARIO =====
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('.submit-button');
    
    // Validar todos los campos
    if (!validateForm(form)) {
        showNotification('Por favor, completa todos los campos correctamente.', 'error');
        return;
    }
    
    // Deshabilitar el botón de envío y mostrar estado de carga
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    
    // Obtener datos del formulario
    const formData = new FormData(form);
    
    try {
        // Enviar datos al manejador PHP
        const response = await fetch('../php/enviar_contacto.php', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        
        const text = await response.text();
        
        // Intentar parsear como JSON
        let result;
        try {
            result = JSON.parse(text);
        } catch (e) {
            console.error('Response:', text);
            throw new Error('El servidor no respondió correctamente. Por favor, intenta más tarde.');
        }
        
        if (result.success) {
            showNotification('¡Mensaje enviado con éxito! Nos contactaremos pronto.', 'success');
            form.reset();
        } else {
            throw new Error(result.message || 'Error al enviar el mensaje');
        }
        
    } catch (error) {
        console.error('Error:', error);
        showNotification('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
    } finally {
        // Rehabilitar el botón de envío
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar Mensaje';
    }
}

// ===== VALIDACIÓN DEL FORMULARIO =====
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let errorMessage = '';
    
    // Limpiar error previo
    clearError(field);
    
    // Verificar si el campo requerido está vacío
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'Este campo es requerido.';
    }
    // Validación de email
    else if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Por favor, ingresa un email válido.';
        }
    }
    // Validación de teléfono (opcional)
    else if (fieldName === 'telefono' && value) {
        const phoneRegex = /^[\d\s\+\-\(\)]+$/;
        if (!phoneRegex.test(value)) {
            errorMessage = 'Por favor, ingresa un teléfono válido.';
        }
    }
    // Validación de nombre
    else if (fieldName === 'nombre' && value) {
        if (value.length < 2) {
            errorMessage = 'El nombre debe tener al menos 2 caracteres.';
        }
    }
    // Validación de mensaje
    else if (fieldName === 'mensaje' && value) {
        if (value.length < 10) {
            errorMessage = 'El mensaje debe tener al menos 10 caracteres.';
        }
    }
    
    if (errorMessage) {
        showError(field, errorMessage);
        return false;
    }
    
    return true;
}

// ===== MOSTRAR ERROR =====
function showError(field, message) {
    const formGroup = field.closest('.form-group');
    
    // Agregar clase de error al campo
    field.classList.add('error');
    
    // Crear o actualizar mensaje de error
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearError(field) {
    const formGroup = field.closest('.form-group');
    
    // Eliminar clase de error
    field.classList.remove('error');
    
    // Eliminar mensaje de error
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// ===== SISTEMA DE NOTIFICACIONES =====
function showNotification(message, type = 'info') {
    // Eliminar notificaciones existentes
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '✕'}</span>
            <span class="notification-message">${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    // Agregar a la página
    document.body.appendChild(notification);
    
    // Activar animación
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Eliminar automáticamente después de 5 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ===== FORMATEO DE ENTRADA =====
function formatPhoneInput(input) {
    let value = input.value.replace(/\D/g, '');
    
    // Formatear como: (XXX) XXX-XXXX
    if (value.length > 0) {
        if (value.length <= 3) {
            value = `(${value}`;
        } else if (value.length <= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
    }
    
    input.value = value;
}

// Aplicar formateo de teléfono si el campo de teléfono existe
const phoneInput = document.querySelector('input[name="telefono"]');
if (phoneInput) {
    phoneInput.addEventListener('input', function() {
        formatPhoneInput(this);
    });
}