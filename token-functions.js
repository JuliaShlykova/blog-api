const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, authData) => {
      if(err) {
        return res.sendStatus(401);
      } else {
        next();
      }
    })
  } else {
    return res.sendStatus(401);
  }
}

exports.giveToken = (user) => {
  return jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: '1y'});
}