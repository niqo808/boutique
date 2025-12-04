/**
 * PRIME CUTS - CONTACT FORM HANDLER
 * Form validation and submission
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

// ===== FORM SUBMISSION HANDLER =====
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('.submit-button');
    
    // Validate all fields
    if (!validateForm(form)) {
        showNotification('Por favor, completa todos los campos correctamente.', 'error');
        return;
    }
    
    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    
    // Get form data
    const formData = new FormData(form);
    
    try {
        // Send data to PHP handler
        const response = await fetch('../php/enviar-contacto.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification('¡Mensaje enviado con éxito! Nos contactaremos pronto.', 'success');
            form.reset();
            
            // Reset AOS animations on form fields
            form.querySelectorAll('[data-aos]').forEach(el => {
                el.classList.remove('aos-animate');
            });
        } else {
            throw new Error(result.message || 'Error al enviar el mensaje');
        }
        
    } catch (error) {
        console.error('Error:', error);
        showNotification('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar Mensaje';
    }
}

// ===== FORM VALIDATION =====
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
    
    // Clear previous error
    clearError(field);
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'Este campo es requerido.';
    }
    // Email validation
    else if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Por favor, ingresa un email válido.';
        }
    }
    // Phone validation (optional)
    else if (fieldName === 'telefono' && value) {
        const phoneRegex = /^[\d\s\+\-\(\)]+$/;
        if (!phoneRegex.test(value)) {
            errorMessage = 'Por favor, ingresa un teléfono válido.';
        }
    }
    // Name validation
    else if (fieldName === 'nombre' && value) {
        if (value.length < 2) {
            errorMessage = 'El nombre debe tener al menos 2 caracteres.';
        }
    }
    // Message validation
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

// ===== ERROR DISPLAY =====
function showError(field, message) {
    const formGroup = field.closest('.form-group');
    
    // Add error class to field
    field.classList.add('error');
    
    // Create or update error message
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
    
    // Remove error class
    field.classList.remove('error');
    
    // Remove error message
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '✕'}</span>
            <span class="notification-message">${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ===== INPUT FORMATTING =====
function formatPhoneInput(input) {
    let value = input.value.replace(/\D/g, '');
    
    // Format as: (XXX) XXX-XXXX
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

// Apply phone formatting if phone field exists
const phoneInput = document.querySelector('input[name="telefono"]');
if (phoneInput) {
    phoneInput.addEventListener('input', function() {
        formatPhoneInput(this);
    });
}