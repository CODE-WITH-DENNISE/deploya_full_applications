const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get token from headers
    const token = req.headers['authorization'];

    // Check if token is provided
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied.' });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token is not valid.' });
        }

        // Save decoded user info for use in other routes
        req.user = decoded;
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authMiddleware;
