import ConfirmationTokenService from './ConfirmationTokenService.js';
import EmailConfirmationService from './EmailConfirmationService.js';
import User from '../models/User.js';
import Utils from '../Utils.js';
import ResetService from './ResetService.js';

const confirmationTokenService = new ConfirmationTokenService();
const resetTokenService = new ConfirmationTokenService();

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
                return { error: 'Error: Account already exist', status: 409 };
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
            console.error('User generating error: \n', err);
        }
    }

    async confirmEmail(params) {
        try {
            const confirmationToken = params.confirmationToken;
    
            const user = await User.findOne({ confirmationToken: confirmationToken});
    
            if (!user) {
                return { error: 'User not found', status: 404 };
            }

            if (!user.confirmationToken) {
                return { error: 'Invalid confirmation token', status: 400 };
            }

            if (user.isEmailConfirmed) {
                return { error: 'User already confirmed', status: 400 };
            }

            if (confirmationTokenService.isTokenExpired()) {
                return { error: 'Confirmation token expired', status: 410 };
            }
    
            user.isEmailConfirmed = true;
            user.confirmationToken = '';

            await user.save();
            
            console.log('Confirmation passed successfully');

            return user;
        } catch (err) {
            console.error('Confirmation error: ', err);
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
                return { error: 'User not found', status: 404 };
            }

            const match = await Utils.compare(user.password, foundUser.password);
            
            if (!match) {
                return { error: 'Invalid credentials', status: 401 };
            }

            return foundUser;
        } catch (err) {
            console.error('Login error', err);
            return { error: 'Internal server error', status: 500 };
        }
    }

    async sendResetEmail(user) {
        try {
            if (!user) {
                return { error: 'Password or email did not passed', status: 400 };
            }

            const foundUser = await User.findOne({
                $or: [
                    { username: user.username }, 
                    { email: user.email }
                ],
            });

            if (!foundUser) {
                return { error: 'User not found', status: 404 }
            }

            const resetToken = resetTokenService.generateToken();

            foundUser.resetToken = resetToken;

            await foundUser.save();

            ResetService.sendEmail(foundUser);

            return foundUser;
        } catch (err) {
            console.error('Email generation error: ', err);
        }    
    }

    async reset(token, newPassword) {
        const user = await User.findOne({ resetToken: token });
        
        if (!user) {
            return { error: 'User not found', status: 404 };
        }

        if (!newPassword) {
            return { error: 'Password did not passed', status: 400 };
        }
        
        if(!user.resetToken) {
            return { error: 'Reset token is invalid', status: 400 };
        }
        
        if (resetTokenService.isTokenExpired()) {
            return { error: 'Reset token expired', status: 410 };
        }

        user.password = await Utils.hash(newPassword);

        await user.save();

        console.log('Reset passed successfully');

        return user;
    }

    async getAll() {
        const users = await User.find();

        return users;
    }
}

export default new UserService();
