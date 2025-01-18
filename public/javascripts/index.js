const express = require('express');
const path = require('path');
const app = express();

// Servir archivos estáticos desde la carpeta 'public'
app.use('/public', express.static(path.join(__dirname, 'public')));

// Ruta para servir el archivo HTML
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Servir el servidor en el puerto 3001
app.listen(3001, () => {
    console.log('Servidor corriendo en http://localhost:3001');
});




// JavaScript para controlar la visibilidad del menú hamburguesa
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const nav = document.querySelector('.main-nav');

    
    hamburgerMenu.addEventListener('click', function() {
      nav.classList.toggle('open');  // Alterna la clase "open" para mostrar/ocultar el menú
    });
});


