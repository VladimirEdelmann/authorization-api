import crypto from 'crypto';

const confirmationTokenExpiration = 60 * 60 * 1000; // 1 hour

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
