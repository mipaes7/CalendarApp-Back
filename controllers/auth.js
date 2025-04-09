const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {

    const { name, email, password } = req.body;

    try {

        let user = await User.findOne({ email: email });

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

        // save the user in db
        await user.save();

        // Generate jwt
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
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

const loginUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email: email });

        if (!user) {
            res.status(400).json(
                {
                    ok: false,
                    msg: 'User not found'
                }
            )
        }

        // Check pwd
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json(
                {
                    ok: false,
                    msg: 'Invalid password'
                }
            )
        }

        // Generate jwt
        const token = await generateJWT(user.id, user.name);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
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

const renewToken = async(req, res = response) => {

    const uid = req.uid;
    const name = req.name;

    // Generate jwt
    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        token
    });

};

module.exports = {
    createUser,
    loginUser,
    renewToken
}