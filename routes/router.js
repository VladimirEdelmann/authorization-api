import Router from 'express';
import UserController from '../controllers/UserController.js';
import authenticateToken from '../middleware/authenticateToken.js';
import checkAdminRole from '../middleware/checkAdminRole.js';

const router = new Router();

router.get('/home', authenticateToken, (req, res) => {
    res.json('Hi there!');
});

router.post('/register', UserController.register);
router.get('/confirmEmail/:confirmationToken', UserController.confirmEmail);
router.post('/login', UserController.login);
router.post('/forgetPassword', UserController.forgetPassword);
router.post('/reset/:resetToken', UserController.reset);
router.get('/getAllUsers', checkAdminRole, UserController.getAll);

export default router;
