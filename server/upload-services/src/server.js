require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 5002;

mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected to DB')).catch((err) => console.log("Mongodb Error"));

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

async function startServer() {
    try{
        app.listen(PORT, () => console.log(`Upload Service running on port ${PORT}`));
    }catch(err){
        console.error("Failed to start server");
        process.exit(1);
    }
}

startServer();
