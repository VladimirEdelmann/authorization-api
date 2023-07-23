import jwt from 'jsonwebtoken';

class JWTService {
    constructor(secretKey, tokenExpiration) {
        this.secretKey = secretKey;
        this.tokenExpiration = tokenExpiration; 
    }

    generateToken(payload) {
        return jwt.sign(payload, this.secretKey, { expiresIn: this.tokenExpiration });
    }


    verifyToken(token) {
        try {
            return jwt.verify(token, this.secretKey);
        } catch (err) {
            console.log('Token is invalid or expired: \n', err);
            return;
        }
    }
}

export default JWTService;
