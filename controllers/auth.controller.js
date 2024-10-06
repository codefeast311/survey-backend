const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

/**
 * Controller to register users.
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = new User({ email, password });
        await user.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.status(201).json({ token: token, userId: user._id });
    } catch (err) {
        res.status(400).send(err);
    }
}

/**
 * Controller to login user.
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.json({ token: token, userId: user._id });
    } catch (err) {
        res.status(500).send('Server error');
    }
}

module.exports = { register, login };