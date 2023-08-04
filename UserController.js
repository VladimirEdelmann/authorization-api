import JWTService from './JWTService.js';
import UserService from './UserService.js';

const jwtSecretKey = 'df3g4vgw74g0v0dh86';
const jwtTokenExpiration = '1h';

const jwtService = new JWTService(jwtSecretKey, jwtTokenExpiration);

class UserController {
    async register(req, res) {
        try {
            const createdUser = await UserService.register(req.body);
        
            res.json(createdUser);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    
    async confirmEmail(req, res) {
        try {
            const user = await UserService.confirmEmail(req.params);
            console.log(user)

            const token = jwtService.generateToken({user});

            res.cookie('access_token', token, {
                httpOnly: true,
                secure: true,
                maxAge: 3600000, // 1 hour
            });

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async login(req, res) {
        try {
            const user = await UserService.login(req.body);
            
            if (!user) {
                throw new Error('Login error');
            }

            const token = jwtService.generateToken({user});

            res.cookie('access_token', token, {
                httpOnly: true,
                secure: true,
                maxAge: 1000, // 1 hour
            });

            res.json({ message: 'Login successful', user });
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async logout(req, res) {
        try {
            const token = req.cookies.access_token;

            if (jwtService.verifyToken(token)) {
                throw new Error('Unauthorized');
            }

            res.cookie('access_token', req.cookies.access_token, {
                httpOnly: true,
                secure: true,
                expires: new Date(0),
            });
        
            res.json({ message: 'Logout successful' });
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
