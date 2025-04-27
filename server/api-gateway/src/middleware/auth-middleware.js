const  {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).json({
            error: 'Access denied token',
        });
    }

    try{
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        })

        const payload = ticket.getPayload();

        //addUserInfo to req.user object

        req.user = {
            userId : payload['sub'],
            email: payload['email'],
            name: payload['name'],
        }

        //add user Id to headers fo downstrem services
        req.headers['x-user-id'] = payload['sub'];

        //optional
        req.headers['x-user-name'] = payload['name'];

    }catch(err){
        console.log('Token verification failed!' , err);
        res.status(401).json({
            error: 'Invalid token',
        })
    }
}

module.exports = authMiddleware;