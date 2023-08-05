import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../constants.js';

function authenticateToken(req, res, next) {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

export default authenticateToken;
