const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fibbrbue/o14S2NLB1/AEdlVDt+UdWdeG1NgOiC7NCY=';

// ✅ Signup Route
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    // ✅ Check if all fields are provided
    if (!name || !email || !password) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        // ✅ Save user (password hashing handled in the model)
        user = new User({ name, email, password });
        await user.save();

        res.status(201).json({ msg: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // ✅ Check if all fields are provided
    if (!email || !password) {
        return res.status(400).json({ msg: "Email and password are required" });
    }

    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        // ✅ Compare entered password with hashed password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        // ✅ Generate JWT token (Expires in 7 days)
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

        // ✅ Send user details without password
        res.json({
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

