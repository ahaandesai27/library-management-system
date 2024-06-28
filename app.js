//Imports
require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/connectDB');
const wrap = require('express-async-wrapper');      //for server start

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Static assets
app.use(express.static('./public'));

//Routes
app.use('/api/books', require('./routes/books'));        
app.use('/api/members', require('./routes/members')); 
app.use('/api/transactions', require('./routes/transactions')); 
app.use('/', require('./pages'));       //Static routes


const port = 5000;
const start = wrap(async () => {
    await connectDB(process.env.MONGO_URI);
    console.log('Connected to the database');
    console.log(__dirname)
    app.listen(port, console.log(`Server is running on http://localhost:${port}`));
})


start();
