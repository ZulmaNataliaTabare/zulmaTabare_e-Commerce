document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form[action="/users/profile"]');
    const firstNameInput = document.querySelector('#nombre');
    const lastNameInput = document.querySelector('#apellido');
    const emailInput = document.querySelector('#email');
    const userNameInput = document.querySelector('#user_name');
    const passwordInput = document.querySelector('#contrasena'); 
    const imageInput = document.querySelector('#image');

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

        // Email
        if (!emailInput.value.trim()) {
            errors.push('El email es obligatorio.');
        } else if (!isValidEmail(emailInput.value.trim())) {
            errors.push('El email debe ser válido.');
        }

        // Nombre de Usuario
        if (!userNameInput.value.trim()) {
            errors.push('El nombre de usuario es obligatorio.');
        } else if (userNameInput.value.trim().length < 2) {
            errors.push('El nombre de usuario debe tener al menos 2 caracteres.');
        }

        // Contraseña 
        if (passwordInput.value.trim() && passwordInput.value.length < 8) {
            errors.push('La contraseña debe tener al menos 8 caracteres.');
        }
    

        // Imagen 
        if (imageInput.files[0] && !isValidFileType(imageInput.files[0])) {
            errors.push('El archivo debe ser JPG, JPEG, PNG o GIF.');
        }

        if (errors.length > 0) {
            event.preventDefault();
            alert('Se encontraron los siguientes errores:\n\n' + errors.join('\n'));
        }
    });
});