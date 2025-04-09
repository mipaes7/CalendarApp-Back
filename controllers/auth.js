const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createUser = async(req, res = response) => {

    const {name, email, password} = req.body;

    try {

        let user = await User.findOne({email: email});

        if (user) {
            res.status(400).json(
                {
                    ok: false,
                    msg: 'User already registered'
                }
            )
        }
        
        user = new User(req.body);

        // encrypt pwd
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();
    
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name
        });

    } catch (error) {
        res.status(500).json(
            {
                ok: false,
                msg: 'error'
            }
        )
    }

};

const loginUser = (req, res = response) => {
    
    const { email, password } = req.body;

    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    });
    
}

const renewToken = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'renewtoken'
    });

};

module.exports = {
    createUser,
    loginUser,
    renewToken
}