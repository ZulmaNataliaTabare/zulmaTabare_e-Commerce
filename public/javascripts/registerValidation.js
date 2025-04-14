document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form[action="/users/register"]');
    const firstNameInput = form.querySelector('input[name="first_name"]');
    const lastNameInput = form.querySelector('input[name="last_name"]');
    const userNameInput = form.querySelector('input[name="user_name"]');
    const emailInput = form.querySelector('input[name="email"]');
    const passwordInput = form.querySelector('input[name="user_password"]');
    const imageInput = form.querySelector('input[name="image"]');

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidFileType = (file) => {
        if (!file) return true;
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        return allowedTypes.includes(file.type);
    };

    const displayError = (field, message) => {
        const errorDiv = field.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('invalid-feedback')) {
            errorDiv.textContent = message;
        } else {
            const newErrorDiv = document.createElement('div');
            newErrorDiv.classList.add('invalid-feedback');
            newErrorDiv.textContent = message;
            field.parentNode.insertBefore(newErrorDiv, field.nextSibling);
        }
        field.classList.add('is-invalid');
    };

    const clearError = (field) => {
        const errorDiv = field.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('invalid-feedback')) {
            errorDiv.remove();
        }
        field.classList.remove('is-invalid');
    };

    form.addEventListener('submit', function(event) {
        let hasErrors = false;

        clearError(firstNameInput);
        clearError(lastNameInput);
        clearError(userNameInput);
        clearError(emailInput);
        clearError(passwordInput);
        clearError(imageInput);

        // Nombre
        if (!firstNameInput.value.trim()) {
            displayError(firstNameInput, 'El nombre es obligatorio.');
            hasErrors = true;
        } else if (firstNameInput.value.trim().length < 2) {
            displayError(firstNameInput, 'El nombre debe tener al menos 2 caracteres.');
            hasErrors = true;
        }

        // Apellido
        if (!lastNameInput.value.trim()) {
            displayError(lastNameInput, 'El apellido es obligatorio.');
            hasErrors = true;
        } else if (lastNameInput.value.trim().length < 2) {
            displayError(lastNameInput, 'El apellido debe tener al menos 2 caracteres.');
            hasErrors = true;
        }

        // Nombre de Usuario
        if (!userNameInput.value.trim()) {
            displayError(userNameInput, 'El nombre de usuario es obligatorio.');
            hasErrors = true;
        } else if (userNameInput.value.trim().length < 2) {
            displayError(userNameInput, 'El nombre de usuario debe tener al menos 2 caracteres.');
            hasErrors = true;
        }

        // Email
        if (!emailInput.value.trim()) {
            displayError(emailInput, 'El email es obligatorio.');
            hasErrors = true;
        } else if (!isValidEmail(emailInput.value.trim())) {
            displayError(emailInput, 'El email debe ser válido.');
            hasErrors = true;
        }
        

        // Contraseña
        if (!passwordInput.value) {
            displayError(passwordInput, 'La contraseña es obligatoria.');
            hasErrors = true;
        } else if (passwordInput.value.length < 8) {
            displayError(passwordInput, 'La contraseña debe tener al menos 8 caracteres.');
            hasErrors = true;
        }
            
            else if (passwordInput.value.length > 20) {
                displayError(passwordInput, 'La contraseña no puede tener más de 20 caracteres.');
                hasErrors = true;
            }

        // Imagen
        if (!imageInput.files[0]) {
            displayError(imageInput, 'La imagen es obligatoria.'); // Según tu formulario, es 'required'
            hasErrors = true;
        } else if (!isValidFileType(imageInput.files[0])) {
            displayError(imageInput, 'El archivo debe ser JPG, JPEG, PNG o GIF.');
            hasErrors = true;
        }

        if (hasErrors) {
            event.preventDefault();
        }
    });
});