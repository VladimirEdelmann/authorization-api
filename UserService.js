import User from './User.js';
import Utils from './Utils.js';

class UserService {
    async register(user) {
        try {
            const id = await User.find(user._id);

            if (!id) {
                throw new Error('Your account already exist');
            }

            const hashedPassword = await Utils.hash(user.password);
            createdUser = User.create({ 
                ...user, 
                password: hashedPassword 
            });

            return createdUser;
        } catch (err) {
            console.log('User generating error', err);
        }

    }

    async login(user) {
        try {
            const foundUser = await User.findById(user._id);

            if (!foundUser) {
                throw new Error('User not found');
            }

            const match = await Utils.compare(user.password, foundUser.password);
            
            if (!match) {
                throw new Error('Invalid credentials');
            }

            return foundUser;
        } catch (err) {
            console.log('Login error', err);
        }
    }
}

export default new UserService();
