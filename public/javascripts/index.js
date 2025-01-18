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




// controla el menú hamburguesa
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('.main-nav');

hamburgerMenu.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});



