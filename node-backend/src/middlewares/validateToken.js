exports.validateToken = async (req, res, next) => {
    const redis = req.app.locals.redis;
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    const userKey = await redis.get(`auth:tokens:${token}`);
    if (!userKey) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  
    req.userKey = userKey;
    next();
  };
  