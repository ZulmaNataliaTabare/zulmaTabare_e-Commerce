
module.exports = (err, req, res, next) => {
    console.error(err.stack); // Registra la traza del error en la consola

    next(err);
};