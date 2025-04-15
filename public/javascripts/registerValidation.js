document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form[action="/users/register"]');
    const firstNameInput = document.querySelector('input[name="first_name"]');
    const lastNameInput = document.querySelector('input[name="last_name"]');
    const userNameInput = document.querySelector('input[name="user_name"]');
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="user_password"]');
    const imageInput = document.querySelector('input[name="image"]');

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidFileType = (file) => {
        if (!file) return true;
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        return allowedTypes.includes(file.type);
    };

    form.addEventListener('submit', function(event) {
        let errors = [];

        // Nombre
        if (!firstNameInput.value.trim()) {
            errors.push('El nombre es obligatorio.');
        } else if (firstNameInput.value.trim().length < 2) {
            errors.push('El nombre debe tener al menos 2 caracteres.');
        }

        // Apellido
        if (!lastNameInput.value.trim()) {
            errors.push('El apellido es obligatorio.');
        } else if (lastNameInput.value.trim().length < 2) {
            errors.push('El apellido debe tener al menos 2 caracteres.');
        }

        // Nombre de Usuario
        if (!userNameInput.value.trim()) {
            errors.push('El nombre de usuario es obligatorio.');
        } else if (userNameInput.value.trim().length < 2) {
            errors.push('El nombre de usuario debe tener al menos 2 caracteres.');
        }

        // Email
        if (!emailInput.value.trim()) {
            errors.push('El email es obligatorio.');
        } else if (!isValidEmail(emailInput.value.trim())) {
            errors.push('El email debe ser válido.');
        }

        // Contraseña
        if (!passwordInput.value) {
            errors.push('La contraseña es obligatoria.');
        } else if (passwordInput.value.length < 8) {
            errors.push('La contraseña debe tener al menos 8 caracteres.');
        } else if (passwordInput.value.length > 20) {
            errors.push('La contraseña no puede tener más de 20 caracteres.');
        }

        // Imagen
        if (!imageInput.files[0]) {
            errors.push('La imagen es obligatoria.'); // Según tu formulario, es 'required'
        } else if (!isValidFileType(imageInput.files[0])) {
            errors.push('El archivo debe ser JPG, JPEG, PNG o GIF.');
        }

        if (errors.length > 0) {
            event.preventDefault();
            alert('Se encontraron los siguientes errores:\n\n' + errors.join('\n'));
        }
    });
});