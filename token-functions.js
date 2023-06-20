const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, authData) => {
      if(err) {
        console.log('incorrect token');
        return res.sendStatus(401);
      } else {
        next();
      }
    })
  } else {
    console.log('incorrect bearerHeader');
    return res.sendStatus(401);
  }
}

exports.giveToken = (user) => {
  return jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: '1y'});
}