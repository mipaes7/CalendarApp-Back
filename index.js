const path = require('path');

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./db/config');

//? Create express server
const app = express();

//* DBcnn
dbConnection();

//* CORS
app.use(cors());

//* Public dir
app.use(express.static('public'));

//* Reading and parsing the body
app.use(express.json());

//* Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/event', require('./routes/events'));

app.use(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
});