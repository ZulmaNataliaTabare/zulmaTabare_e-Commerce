const express = require('express');
const router = express.Router();
const {detail,all,producto} = require('../controllers/productsController')

router.get('/',all);
router.get('/:producto',producto)
router.get('/:id/detail',detail);


module.exports = router;