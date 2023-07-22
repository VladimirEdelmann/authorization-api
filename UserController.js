import UserService from './UserService.js';

class UserController {
    async register(req, res) {
        try {
            const createdUser = await UserService.register(req.body);
        
            res.json(createdUser);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default new UserController();
