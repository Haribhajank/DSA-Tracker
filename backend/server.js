const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const app = express();
app.use(cors({ origin: 'https://dsa-tracker-peach.vercel.app' }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://haribhajank5:j7vbWLuUymNCKLFU@cluster2.kp2snpl.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// User model
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    progress: { type: Map, of: Number, default: {} } // Example: { "Arrays": 50, "Graphs": 30 }
});
const User = mongoose.model('User', UserSchema);

// Routes
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err.message); // Log the error
        res.status(400).json({ message: 'Registration failed. Username may already exist.' });
    }
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.log("User not found");
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("Invalid password");
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
        res.status(200).json({ token, message: 'Login successful' });
    } catch (err) {
        console.error("Login error:", err.message);
        res.status(500).json({ message: 'Login error. Try again later.' });
    }
});


app.post('/update-progress', async (req, res) => {
    const { token, progress } = req.body; // token to authenticate and progress to update
    try {
        const decoded = jwt.verify(token, 'secretkey');
        await User.findByIdAndUpdate(decoded.id, { progress });
        res.status(200).send('Progress updated');
    } catch (err) {
        res.status(500).send('Error updating progress');
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
