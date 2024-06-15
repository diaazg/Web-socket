const jwt = require('jsonwebtoken');
const {jwt_secret} = require('../constants');

exports.authjwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, jwt_secret, (err, user) => {
      if (err) {
        console.log(err.expiredAt)
        console.log(token)
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    
    res.sendStatus(401);
  }
};
