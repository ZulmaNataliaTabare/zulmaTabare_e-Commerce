const express = require('express');
const path = require('path');
const app = express();

// Servir archivos estáticos desde la carpeta 'public'
app.use('/public', express.static(path.join(__dirname, 'public')));

// Ruta para servir el archivo HTML
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});






