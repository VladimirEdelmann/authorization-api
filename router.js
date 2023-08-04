import Router from 'express';
import UserController from './UserController.js';

const router = new Router();

router.get('/home', (req, res) => {
    res.json('Hi there!');
});

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/confirmEmail/:confirmationToken', UserController.confirmEmail);
router.get('/getAllUsers', UserController.getAll);

export default router;
