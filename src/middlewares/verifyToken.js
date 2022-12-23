import jwt from 'jsonwebtoken';

// verify token
export const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(500).json('Please Sign in ');
  }
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      message: 'You are not authenticated.',
    });
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return res.status(401).json({
        message: 'You are not authenticated.',
      })
    }
    req.user = user;
    next();
  })
}