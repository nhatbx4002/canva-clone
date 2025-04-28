const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const authenticateRequest = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                error: 'Access denied. No token provided.',
            });
        }

        const token = authHeader.split(' ')[1];

        // Verify the Google OAuth token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        // Add user info to request
        req.user = {
            id: payload.sub,
            email: payload.email,
            name: payload.name
        };

        // Add user info to headers for downstream services
        // Encode values to ensure they are valid header content
        req.headers['x-user-id'] = payload.sub;
        req.headers['x-user-email'] = Buffer.from(payload.email || '').toString('base64');
        req.headers['x-user-name'] = Buffer.from(payload.name || '').toString('base64');

        next();
    } catch (error) {
        console.error('Auth Error:', error);
        return res.status(401).json({
            error: 'Invalid token',
            message: error.message
        });
    }
};

module.exports = authenticateRequest;

