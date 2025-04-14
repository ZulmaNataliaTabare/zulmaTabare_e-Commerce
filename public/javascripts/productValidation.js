document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form[action="/products/add"]');
    const nameInput = form.querySelector('#product_name');
    const descriptionInput = form.querySelector('#product_description');
    const imageInput = form.querySelector('#image');

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

        clearError(nameInput);
        clearError(descriptionInput);
        clearError(imageInput);

        // Nombre
        if (!nameInput.value.trim()) {
            displayError(nameInput, 'El nombre del producto es obligatorio.');
            hasErrors = true;
        } else if (nameInput.value.trim().length < 5) {
            displayError(nameInput, 'El nombre del producto debe tener al menos 5 caracteres.');
            hasErrors = true;
        }

        // Descripción
        if (!descriptionInput.value.trim()) {
            displayError(descriptionInput, 'La descripción es obligatoria.');
            hasErrors = true;
        } else if (descriptionInput.value.trim().length < 20) {
            displayError(descriptionInput, 'La descripción debe tener al menos 20 caracteres.');
            hasErrors = true;
        }

        // Imagen
        if (!imageInput.files[0]) {
            displayError(imageInput, 'La imagen del producto es obligatoria.'); 
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