const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());


// In-memory user storage (for demonstration purposes)
let users = [];
const secretKey = 'your_secret_key'; // Replace with your actual secret key

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header
    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user; // Save user info in request object
        next(); // Proceed to the next middleware
    });
};

// Register a new user
app.post('/api/v1/users', (req, res) => {
    const { name, email, password } = req.body;

    // Simple validation
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists.' });
    }

    // Create a new user
    const newUser = { name, email, password }; // Hash password in production!
    users.push(newUser);
    return res.status(200).json({ message: 'User registered with success' });
});

// Authenticate user and return token
app.post('/api/v1/auth', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password); // Validate user credentials
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    // Create a token
    const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });
    return res.status(200).json({ token });
});

// Get user info
app.get('/api/v1/users', authenticateToken, (req, res) => {
    // Find the user based on the email stored in req.user by the authenticateToken middleware
    const user = users.find(u => u.email === req.user.email);

    if (!user) return res.status(404).json({ error: 'User not found' });

    // Respond with full user data (adjust fields as necessary)
    return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password, 
        imageUrl: user.imageUrl,
    });
});
// Update user info
app.patch('/api/v1/users', authenticateToken, (req, res) => {
    const { name, email, password } = req.body;
    const user = users.find(u => u.email === req.user.email);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Update user details
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password; // Hash password in production!
    
    return res.status(200).json({ message: 'User updated with success' });
});

// Delete user
app.delete('/api/v1/users', authenticateToken, (req, res) => {
    users = users.filter(u => u.email !== req.user.email); // Remove user from array
    return res.status(200).json({ message: 'User deleted with success' });
});

// Delete all users - Admin endpoint
app.delete('/api/v1/all-users', (req, res) => {
    const { key_admin } = req.body;
    if (key_admin === 'keyadmin123') {
        users = []; // Clear all users
        return res.status(200).json({ message: 'Users deleted with success' });
    }
    return res.status(403).json({ error: 'Invalid admin key' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = secrver; // Export app for testing purposes
