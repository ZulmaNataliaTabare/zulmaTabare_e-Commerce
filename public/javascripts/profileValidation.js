document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form[action="/users/profile"]');
    const firstNameInput = form.querySelector('#nombre');
    const lastNameInput = form.querySelector('#apellido');
    const emailInput = form.querySelector('#email');
    const userNameInput = form.querySelector('#user_name');
    const passwordInput = form.querySelector('#contrasena'); // "contrasena" en el ID, "password" en el name
    const imageInput = form.querySelector('#image');

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
        clearError(emailInput);
        clearError(userNameInput);
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

        // Email
        if (!emailInput.value.trim()) {
            displayError(emailInput, 'El email es obligatorio.');
            hasErrors = true;
        } else if (!isValidEmail(emailInput.value.trim())) {
            displayError(emailInput, 'El email debe ser válido.');
            hasErrors = true;
        }
        // (Opcional) Validación de email repetido se manejará en el backend.

        // Nombre de Usuario
        if (!userNameInput.value.trim()) {
            displayError(userNameInput, 'El nombre de usuario es obligatorio.');
            hasErrors = true;
        } else if (userNameInput.value.trim().length < 2) {
            displayError(userNameInput, 'El nombre de usuario debe tener al menos 2 caracteres.');
            hasErrors = true;
        }

        // Contraseña (opcional, solo validar si se escribe algo)
        if (passwordInput.value.trim() && passwordInput.value.length < 8) {
            displayError(passwordInput, 'La contraseña debe tener al menos 8 caracteres.');
            hasErrors = true;
        }
        // (Opcional) Validación de complejidad de contraseña podría añadirse aquí.

        // Imagen (opcional, solo validar si se selecciona un archivo)
        if (imageInput.files[0] && !isValidFileType(imageInput.files[0])) {
            displayError(imageInput, 'El archivo debe ser JPG, JPEG, PNG o GIF.');
            hasErrors = true;
        }

        if (hasErrors) {
            event.preventDefault();
        }
    });
});