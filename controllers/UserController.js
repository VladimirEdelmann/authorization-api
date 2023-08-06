import JWTService from '../services/JWTService.js';
import UserService from '../services/UserService.js';
import { JWT_SECRET_KEY, ACCESS_TOKEN_EXPIRATION } from '../constants.js';

const jwtService = new JWTService(JWT_SECRET_KEY, ACCESS_TOKEN_EXPIRATION);

class UserController {
    async register(req, res) {
        try {
            const createdUser = await UserService.register(req.body);

            if (createdUser.error) {
                return res.status(user.status).json({ error: user.error });
            }
        
            res.json(createdUser);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    
    async confirmEmail(req, res) {
        try {
            const user = await UserService.confirmEmail(req.params);

            if (user.error) {
                return res.status(user.status).json({ error: user.error });
            }

            const token = jwtService.generateToken({user});

            res.cookie('access_token', token, {
                httpOnly: true,
                secure: true,
            });

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async login(req, res) {
        try {
            const user = await UserService.login(req.body);
            
            if (user.error) {
                return res.status(user.status).json({ error: user.error });
            }

            const token = jwtService.generateToken({user});

            res.cookie('access_token', token, {
                httpOnly: true,
                secure: true,
            });

            console.log('Login successful');

            res.json({ message: 'Login successful', user });
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async forgetPassword(req, res) {
        try {
            const user = await UserService.sendResetEmail(req.body);

            if (user.error) {
                return res.status(user.status).json({error: user.error});
            }

            res.json({ message: 'Check your email for password reset' });
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async reset(req, res) {
        try {
            const user = await UserService.reset(req.params.resetToken, req.body.password);

            if (user.error) {
                return res.status(user.status).json({ error: user.error });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async getAll(req, res) {
        try {
            const users = await UserService.getAll();

            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    }

}

export default new UserController();
