document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form[action^="/users/editUsers/"]');
    const firstNameInput = document.querySelector('#first_name');
    const lastNameInput = document.querySelector('#last_name');
    const userNameInput = document.querySelector('#user_name');

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

        if (errors.length > 0) {
            event.preventDefault();
            alert('Se encontraron los siguientes errores:\n\n' + errors.join('\n'));
        }
    });
});