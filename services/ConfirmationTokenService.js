import crypto from 'crypto';
import { confirmationTokenExpiration } from '../constants.js';

class ConfirmationTokenService {
    constructor() {
        this.createdAt = Date.now();
    }

    generateToken() {
        const token = crypto.randomBytes(32).toString('hex');
        return token;
    }

    isTokenExpired() {
        const now = Date.now();
        return now - this.createdAt > confirmationTokenExpiration;
    }
}

export default ConfirmationTokenService;
