

const createUser = (req, res) => {
    console.log('route')
    res.json({
        ok: true,
        msg: 'register'
    });
};

module.exports = {
    createUser,
}