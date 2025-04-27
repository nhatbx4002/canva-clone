const jwt = require('jsonwebtoken');

const authenticateRequest = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                error: 'Access denied. No token provided.',
            });
        }

        const token = authHeader.split(' ')[1];
        
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Add the decoded user info to the request
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            error: 'Invalid token',
        });
    }
}

module.exports = authenticateRequest;

