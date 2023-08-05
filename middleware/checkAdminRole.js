import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../constants.js';

function checkAdminRole(req, res, next) {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY
      );
    
    console.log(decoded.user.role)
    if (decoded.user.role !== 'admin') {
        return res.status(403).json('User is not Admin');
    }
    
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

export default checkAdminRole;
