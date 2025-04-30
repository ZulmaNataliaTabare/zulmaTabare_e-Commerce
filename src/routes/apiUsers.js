// routes/apiUsers.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); 


router
        .get('/users/', userController.getUsersAPI)
        .get('/count', userController.getTotalUsers)
        .get('/users/:id', userController.getUserDetailAPI); 
module.exports = router;