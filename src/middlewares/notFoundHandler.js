const path = require('path');
const fs = require('fs');

module.exports = (req, res, next) => {
    const viewPath = path.join(__dirname, '../views/error.ejs');

    fs.access(viewPath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Error al cargar la vista de error:', err);
            return res.status(404).send('Recurso no encontrado');
        }

        res.status(404).render('error', { 
            errorMessage: err ? err.message : 'Error desconocido', 
            errorStack: err ? err.stack : 'No hay detalles disponibles' 
        }); 
    });
};