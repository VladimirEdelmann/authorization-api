import Router from 'express';
import UserController from './UserController.js';
import User from './User.js';

const router = new Router();

router.get('/home', (req, res) => {
    res.json('Hi there!');
});

router.post('/register', UserController.register);
router.post('/login', UserController.login);

export default router;
