const express = require('express');
const app = express();
const port = 5000;
const connectDB = require('./db/connectDB');
const wrap = require('express-async-wrapper')
const password = encodeURIComponent("htRhp4BsHhTdLWce");
const connectionString = `mongodb+srv://eclipsesword777:${password}@cluster0.dvhrksp.mongodb.net/Library?retryWrites=true&w=majority&appName=Cluster0`;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('/public'));
app.use('/api/books', require('./routes/books'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const start = wrap(async () => {
    await connectDB(connectionString);
    console.log('Connected to the database');
    app.listen(port, console.log(`Server is running on http://localhost:${port}`));
})


start();