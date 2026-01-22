const jwt = require("jsonwebtoken");

const logon = (req, res) => {
    const { name, password } = req.body;

    const token = jwt.sign({ name }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });

    res.status(200).json({ token });
};

module.exports = { logon };
