const jwt = require("jsonwebtoken");
const config = require("config");

// Middleware function for authentication using JWT
module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');

  // Check if token is provided
  if (!token) {
    return res.status(401).send('Access denied. No token provided');
  }

  try {
    // Verify and decode the JWT token using the secret key from the config
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded; // Attach the decoded user information to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};
