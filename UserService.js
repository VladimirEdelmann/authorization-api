import ConfirmationTokenService from './ConfirmationTokenService.js';
import EmailConfirmationService from './EmailConfirmationService.js';
import User from './User.js';
import Utils from './Utils.js';

const confirmationTokenService = new ConfirmationTokenService();

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
                console.log('Error: This account already exist');
                return;
            }

            const confirmationToken = confirmationTokenService.generateToken();

            const hashedPassword = await Utils.hash(user.password);
            const createdUser = await User.create({
                ...user,
                password: hashedPassword,
                confirmationToken: confirmationToken,
            });

            await createdUser.save();

            EmailConfirmationService.sendEmail(createdUser);

            console.log('User successfully created');

            return createdUser;
        } catch (err) {
            console.log('User generating error: \n', err);
        }
    }

    async confirmEmail(params) {
        try {
            const confirmationToken = params.confirmationToken;
    
            const user = await User.findOne({ confirmationToken: confirmationToken});
    
            if (!user) {
                throw new Error('User not found');
            }

            if (!user.confirmationToken) {
                throw new Error('Invalid confirmation token');
            }

            if (user.isEmailConfirmed) {
                throw new Error('User already confirmed');
            }

            if (confirmationTokenService.isTokenExpired()) {
                throw new Error('Confirmation token expired');
            }
    
            user.isEmailConfirmed = true;

            await user.save();
            
            console.log('Confirmation passed successfully');

            return user;
        } catch (err) {
            console.log('Confirmation error: ', err);
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

            if(!foundUser.confirmationToken) {
                throw new Error('Confirmation has not been passed');
            }

            const match = await Utils.compare(user.password, foundUser.password);
            
            if (!match) {
                throw new Error('Invalid credentials');
            }

            return foundUser;
        } catch (err) {
            console.error('Login error', err);
        }
    }

    async getAll() {
        const users = await User.find();

        return users;
    }
}

export default new UserService();
