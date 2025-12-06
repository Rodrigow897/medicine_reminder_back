const express = require('express');
const router = express.Router();
const usersRouter = require('../controllers/usersController');

router.get('/', usersRouter.getUsers);
router.get('/:id', usersRouter.getUsersbyId);
router.post('/register', usersRouter.createUser); 
router.post('/login', usersRouter.loginUser);     
router.put('/:id', usersRouter.updateUser);
router.delete('/:id', usersRouter.deleteUser);

module.exports = router;