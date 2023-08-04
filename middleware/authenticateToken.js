import jwt from 'jsonwebtoken';

const secretKey = 'df3g4vgw74g0v0dh86';

function authenticateToken(req, res, next) {
  const token = req.cookies.access_token;

//   console.log('access_token: ', token);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    // console.log(decoded);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

export default authenticateToken;
