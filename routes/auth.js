//* Users/Auth Routes
//* host + /api/auth

const express = require('express');
const router = express.Router();

router.post('/new', (req, res) => {
    console.log('route')
    res.json({
        ok: true,
        msg: 'register'
    });
});

router.post('/', (req, res) => {
    console.log('route')
    res.json({
        ok: true,
        msg: 'login'
    });
});

router.get('/renew', (req, res) => {
    console.log('route')
    res.json({
        ok: true,
        msg: 'token renew'

    });
});

module.exports = router;