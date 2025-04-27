const authenticateRequest = (req, res, next) => {
    const userId = req.headers['x-auth-id'];

    if(!userId){
        return res.status(401).json({
            error: 'Access denied',
        });
    }

    req.user = userId;
    next();
}