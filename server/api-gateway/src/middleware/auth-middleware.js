const {OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

const authenticateRequest = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    const token = authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({
            error: 'Access Denied!',
        })
    }
    try {
       const ticket = await client.verifyIdToken({
           idToken: token,
           audience: process.env.GOOGLE_CLIENT_ID,
       })

        const payload = ticket.getPayload();

       req.user = {
           userId : payload['sub'],
           email: payload['email'],
           name: payload['name'],
       }

       req.headers['x-user-id'] = payload['sub'];


        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token', message: error.message });
    }
};

module.exports = authenticateRequest;
