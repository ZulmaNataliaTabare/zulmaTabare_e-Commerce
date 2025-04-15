document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form[action^="/products/edit/"]');
    const nameInput = document.querySelector('#name');
    const descriptionInput = document.querySelector('#description');
    const imageInput = document.querySelector('#image');
    const priceInput = document.querySelector('#price');
    const categorySelect = document.querySelector('#category');
    const featuresInput = document.querySelector('#features');
    const stockInput = document.querySelector('#stock');

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
        if (imageInput.files[0] && !isValidFileType(imageInput.files[0])) {
            errors.push('El archivo de imagen debe ser JPG, JPEG, PNG o GIF.');
        }

        // Precio
        if (!priceInput.value.trim()) {
            errors.push('El precio es obligatorio.');
        } else if (isNaN(parseFloat(priceInput.value)) || parseFloat(priceInput.value) <= 0) {
            errors.push('El precio debe ser un número mayor que cero.');
        }

        // Categoría
        if (!categorySelect.value) {
            errors.push('La categoría es obligatoria.');
        }

        // Características
        if (!featuresInput.value.trim()) {
            errors.push('Las características son obligatorias.');
        }

        // Stock
        if (!stockInput.value.trim()) {
            errors.push('El stock es obligatorio.');
        } else if (isNaN(parseInt(stockInput.value)) || parseInt(stockInput.value) < 0) {
            errors.push('El stock debe ser un número entero no negativo.');
        }

        if (errors.length > 0) {
            event.preventDefault();
            alert('Se encontraron los siguientes errores:\n\n' + errors.join('\n'));
        }
    });
});