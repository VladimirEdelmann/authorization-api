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
            const decoded = jwt.verify(token, this.secretKey);

            const isTokenExpired = Date.now() >= decoded.exp * 1000;

            if (isTokenExpired) {
                return res.status(401).json({ message: 'Token has expired' });
            }

            return decoded;
        } catch (err) {
            console.log('Token is invalid or expired: \n', err);
            return null;
        }
    }
}

export default JWTService;
