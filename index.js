const express = require('express');

//? Create express server
const app = express();

//* Routes
app.get('/', (req, res) => {
    console.log('route')
    res.json({
        ok: true
    });
});

//? Listen
app.listen(4000, () => {
    console.log(`Server running on port ${4000}`)
});