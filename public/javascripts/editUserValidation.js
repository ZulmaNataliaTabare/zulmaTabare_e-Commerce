document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form[action^="/users/editUsers/"]');
    const firstNameInput = form.querySelector('#first_name');
    const lastNameInput = form.querySelector('#last_name');
    const userNameInput = form.querySelector('#user_name');

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

        if (hasErrors) {
            event.preventDefault();
        }
    });
});