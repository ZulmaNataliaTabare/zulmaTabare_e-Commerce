
module.exports = (req, res, next) => {
    res.status(404).render('not-found', { title: 'Página no encontrada' }); // Pasa un título a la vista
};