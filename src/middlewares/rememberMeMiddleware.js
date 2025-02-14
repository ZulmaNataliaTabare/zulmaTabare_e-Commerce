
module.exports = async (req, res, next) => {
    if (!req.session.user && req.cookies.remember) {
        try {
            const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8')); // Ajusta la ruta si es necesario
            const user = users.find(u => u.NombreUsuario === req.cookies.remember);

            if (user) {
                req.session.user = user;
            }
        } catch (error) {
            console.error("Error al verificar la cookie:", error);
        }
    }
    next();
};