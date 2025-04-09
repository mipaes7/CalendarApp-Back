const express = require('express');
require('dotenv').config();

//? Create express server
const app = express();


app.use(express.static('public'));

//* Routes
app.use('/api/auth', require('./routes/auth'));


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
});