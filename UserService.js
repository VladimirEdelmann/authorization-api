import User from './User.js';
import Utils from './Utils.js';

class UserService {
    async register(user) {
        try {
            const foundUser = await User.findOne({
                $or: [
                    { username: user.username }, 
                    { email: user.email }
                ],
              });
            
            if (foundUser) {
                console.log('Error: Your account already exist');
                return;
            }

            const hashedPassword = await Utils.hash(user.password);
            const createdUser = User.create({
                ...user,
                password: hashedPassword
            });

            return createdUser;
        } catch (err) {
            console.log('User generating error: \n', err);
        }
    }

    async login(user) {
        try {
            const foundUser = await User.findOne({
                $or: [
                    { username: user.username }, 
                    { email: user.email }
                ],
            });

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
