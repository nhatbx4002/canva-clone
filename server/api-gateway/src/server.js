require('dotenv').config();
const express = require('express');
const proxy = require('express-http-proxy');
const cors = require('cors');
const helmet = require('helmet');
const authMiddleware = require('./middleware/auth-middleware');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000',  // Cấu hình domain của frontend nếu cần
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//proxy options
const proxyOptions = {
    proxyReqPathResolver: (req) => {
        return req.originalUrl.replace(/^\v1/, '/api');
    },

    proxyErrorHandler: (err, req, res) => {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message ,
        })
    }
};


app.use('/v1/designs', authMiddleware, proxy(process.env.DESIGN, {
    ...proxyOptions,
}));

app.use('/v1/media',
    authMiddleware,
    proxy(process.env.UPLOAD, {
    ...proxyOptions,
    parseBody: false
}));

app.use('/v1/subscription',
    authMiddleware,
    proxy(process.env.SUBSCRIPTION, {
    ...proxyOptions,
}));

app.listen(PORT , () => {
    console.log(`API Gateway is running on ${PORT}`);
    console.log(`Design Services is running on ${process.env.DESIGN}`);
    console.log(`UPLOAD Services is running on ${process.env.UPLOAD}`);
    console.log(`Subscription Services is running on ${process.env.SUBSCRIPTION}`);

})