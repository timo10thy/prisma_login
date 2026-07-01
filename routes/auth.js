const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');

// Register
router.post('/register', async (req, res) => {
    let name = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword
        }
    });

    res.status(201).json({ message: 'User registered successfully', userId: user.id });
});

// Login
router.post('/login', async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
        where: { email: email }
    });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token: token });
});

module.exports = router;