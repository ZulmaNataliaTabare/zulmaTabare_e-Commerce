
module.exports = (req, res, next) => {
    console.log(`Archivo solicitado: ${req.originalUrl}`);
    next();
};