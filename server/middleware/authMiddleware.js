const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const auth = req.headers.authorization;

  if (auth && auth.startsWith('Bearer ')) {
    const token = auth.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // user ID
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token noto‘g‘ri yoki muddati tugagan' });
    }
  } else {
    return res.status(401).json({ message: 'Token yo‘q' });
  }
};

module.exports = protect;
