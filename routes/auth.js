//* Users/Auth Routes
//* host + /api/auth

const express = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/fieldValidator');
const { createUser, renewToken, loginUser } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/jwtValidator');

const router = express.Router();

router.post(
    '/new',
    [ // middlewares
        check('name', 'Name is mandatory').not().isEmpty(),
        check('email', 'Email is mandatory').isEmail(),
        check('password', 'Password must be have at least 6 chars').isLength({min: 6}),
        validateFields
    ], 
    createUser
);

router.post(
    '/',
    [ // middlewares
        check('email', 'Email is mandatory').isEmail(),
        check('password', 'Password must be have at least 6 chars').isLength({min: 6}),
        validateFields
    ], 
    loginUser
);

router.get('/renew', validateJWT, renewToken);

module.exports = router;