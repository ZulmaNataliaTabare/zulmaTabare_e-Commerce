// routes/apiUsers.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); 


router
        .get('/', userController.getUsersAPI)
        .get('/count/', userController.getTotalUsers)
        .get('/latest', userController.getLastUsersAPI)
        .get('/:id', userController.getUserDetailAPI)
        
module.exports = router;