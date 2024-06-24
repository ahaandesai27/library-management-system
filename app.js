const express = require('express');
const app = express();
const port = 5000;
const connectDB = require('./db/connectDB');
const wrap = require('express-async-wrapper');
const {validateID} = require('./middleware/validateID');
const { validate } = require('./schema/books');
const password = encodeURIComponent("htRhp4BsHhTdLWce");
const connectionString = `mongodb+srv://eclipsesword777:${password}@cluster0.dvhrksp.mongodb.net/Library?retryWrites=true&w=majority&appName=Cluster0`;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));
app.use('/api/books', require('./routes/books'));
app.use('/api/members', require('./routes/members')); 
app.use('/api/transactions', require('./routes/transactions')); 

//will set all these routes up later in a file

app.get('/addbook', (req, res) => {
    res.sendFile(__dirname + '/public/Books/addbook.html');
})

app.get('/editbook/:id' , validateID, (req, res) => {  
    res.sendFile(__dirname + '/public/Books/editbook.html');
});

app.get('/addmember', (req, res) => {
    res.sendFile(__dirname + '/public/Members/addmember.html');
});

app.get('/editmember/:id' , validateID, (req, res) => {  
    res.sendFile(__dirname + '/public/Members/editmember.html');
});

app.get('/transactions/add', (req, res) => {
    res.sendFile(__dirname + '/public/Transactions/addtransaction.html');
})

app.get('/transactions/modify', (req, res) => {
    res.sendFile(__dirname + '/public/Transactions/modifytransaction.html');
})
const start = wrap(async () => {
    await connectDB(connectionString);
    console.log('Connected to the database');
    app.listen(port, console.log(`Server is running on http://localhost:${port}`));
})


start();