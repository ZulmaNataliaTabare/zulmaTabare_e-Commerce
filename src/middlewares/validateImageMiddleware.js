const path = require('path');

const validateImage = (req, res, next) => {
    if (req.file) {
        const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
        const ext = path.extname(req.file.originalname).toLowerCase();
        if (!allowedExtensions.includes(ext)) {
            return res.status(400).json({ error: 'Formato de imagen no permitido. Solo se permiten PNG, JPG, JPEG y GIF.' });
        }
    }
    next();
    };

    module.exports = validateImage;