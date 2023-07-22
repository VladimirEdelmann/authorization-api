import Router from 'express';
import UserController from './UserController.js';

const router = new Router();

router.get('/home', (req, res) => {
    res.json('Hi there!')
});

router.post('/register', UserController.register);

export default router;