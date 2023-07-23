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

    async login(req, res) {
        try {
            const user = await UserService.login(req.body);
            
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwtService.generateToken({user});
            
            res.json({ token });
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

export default new UserController();
