document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form[action="/products/add"]');
    const nameInput = document.querySelector('#product_name');
    const descriptionInput = document.querySelector('#product_description');
    const imageInput = document.querySelector('#image');

    const isValidFileType = (file) => {
        if (!file) return true;
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        return allowedTypes.includes(file.type);
    };

    form.addEventListener('submit', function(event) {
        let errors = [];

        // Nombre
        if (!nameInput.value.trim()) {
            errors.push('El nombre del producto es obligatorio.');
        } else if (nameInput.value.trim().length < 5) {
            errors.push('El nombre del producto debe tener al menos 5 caracteres.');
        }

        // Descripción
        if (!descriptionInput.value.trim()) {
            errors.push('La descripción es obligatoria.');
        } else if (descriptionInput.value.trim().length < 20) {
            errors.push('La descripción debe tener al menos 20 caracteres.');
        }

        // Imagen
        if (!imageInput.files[0]) {
            errors.push('La imagen del producto es obligatoria.');
        } else if (!isValidFileType(imageInput.files[0])) {
            errors.push('El archivo de imagen debe ser JPG, JPEG, PNG o GIF.');
        }

        if (errors.length > 0) {
            event.preventDefault();
            alert('Se encontraron los siguientes errores:\n\n' + errors.join('\n'));
        }
    });
});