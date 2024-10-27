const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser'); // Middleware for parsing JSON bodies
const app = express();
dotenv.config();

app.use(bodyParser.json()); // Enable JSON body parsing

// Sample in-memory user storage (for demonstration purposes)
let users = [];
let authenticatedTokens = {}; // To store authenticated user tokens

// POST /api/v1/users - Create User
app.post('/api/v1/users', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (users.find(user => user.email === email)) {
    return res.status(400).json({ error: 'User already exists.' });
  }
  
  users.push({ name, email, password }); // In a real app, hash passwords
  return res.status(201).json({ message: 'User registered with success' });
});

// POST /api/v1/auth - Authenticate User
app.post('/api/v1/auth', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email && user.password === password); // Simplified authentication
  if (user) {
    const token = `${email}-token`; // Simple token generation
    authenticatedTokens[token] = user; // Store the token
    return res.status(200).json({ token });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
});

// GET /api/v1/users - Get User Data
app.get('/api/v1/users', (req, res) => {
  const token = req.headers.authorization; // Retrieve token from headers
  if (!token || !authenticatedTokens[token]) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const user = authenticatedTokens[token]; // Get user from token
  return res.status(200).json(user);
});

// PATCH /api/v1/users - Update User
app.patch('/api/v1/users', (req, res) => {
  const token = req.headers.authorization;
  const { name, email, password } = req.body;
  
  if (!token || !authenticatedTokens[token]) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const user = authenticatedTokens[token]; // Get user from token
  if (name) user.name = name;
  if (email) user.email = email; // In a real app, check for duplicate emails
  if (password) user.password = password; // Hash the new password

  return res.status(200).json({ message: 'User updated with success', user });
});

// DELETE /api/v1/users - Delete User
app.delete('/api/v1/users', (req, res) => {
  const token = req.headers.authorization;
  if (!token || !authenticatedTokens[token]) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  delete authenticatedTokens[token]; // Remove the token
  return res.status(200).json({ message: 'User deleted with success' });
});

// DELETE /api/v1/all-users - Delete All Users (Admin Key)
app.delete('/api/v1/all-users', (req, res) => {
  const { key_admin } = req.body;
  if (key_admin === 'keyadmin123') {
    users = [];
    authenticatedTokens = {};
    return res.status(200).json({ message: 'Users deleted with success' });
  }
  return res.status(403).json({ error: 'Forbidden' });
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app; // Export app for testing purposes
