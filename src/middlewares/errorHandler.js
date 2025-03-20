module.exports = (err, req, res, next) => {
    console.error(err.stack); // Registra la traza del error en la consola

    // Renderiza la vista de error 500 con la información del error
    res.status(500).render('error', {
        errorMessage: err.message || 'Error desconocido',
        errorStack: err.stack || 'No hay detalles disponibles'
    });
};
