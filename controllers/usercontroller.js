const User = require("../models/usermodel");
const bcrypt = require('bcryptjs');
const generateToken = require('../services/tokenservice');

const createUser = async (req, res) => {
    try {
        const data = req.body;
        const existingUser = await User.findOne({ username: data.username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        const newUser = new User(data);

        const response = await newUser.save();
        const token = generateToken({ id: response._id, username: response.username }); 

        res.status(201).json({ message: 'User created successfully', response: response, token: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const payload = {
            id: user._id, 
            username: user.username
        };
        const token = generateToken(payload);

        res.status(200).json({ message: 'User login successful', user: { id: user._id, name: user.username }, token: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createUser,
    loginUser,
};
