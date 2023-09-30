const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const mongoClient = require('mongoose');
const routes = require('./routes/routes');
const PORT = process.env.PORT || 8000;

mongoClient.connect(process.env.MONGODB_URI)
.then(() => {console.log("DB Connected");}) 
.catch ((err) => {console.log("Error connecting db: ", err);});


const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/api/v1', routes)
app.listen(PORT, () => {
    console.log("SERVER RUNNING ON", PORT);
});