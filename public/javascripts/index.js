import express from 'express';
import { join } from 'path';
const app = express();

// Servir archivos estáticos desde la carpeta 'public'
app.use('/public', express.static(join(__dirname, 'public')));

// Ruta para servir el archivo HTML
app.get('/', function(req, res) {
    res.sendFile(join(__dirname, 'index.ejs'));
});






