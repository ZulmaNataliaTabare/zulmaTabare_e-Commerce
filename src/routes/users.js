const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
res.send('Respondiendo a la ruta de usuarios');
});

module.exports = router;
