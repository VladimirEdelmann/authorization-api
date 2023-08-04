import jwt from 'jsonwebtoken';

const secretKey = 'df3g4vgw74g0v0dh86';

function checkAdminRole(req, res, next) {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    
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
