const hello = (req, res) => {
    res.status(200).json({
        message: `Hi ${req.user.name}`,
    });
};

module.exports = { hello };
