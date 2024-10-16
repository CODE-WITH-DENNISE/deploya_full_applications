// Import required packages
require('dotenv').config({ path: './ls.env' });
const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

// Initialize the Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection pool configuration using environment variables
const pool = mysql.createPool({
    connectionLimit: 10, // Set your connection limit
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 3306 // Default MySQL port is 3306
});

// Test database connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection error:', err);
        process.exit(1); // Exit if the connection fails
    } else {
        console.log('Connected to the MySQL database successfully');
        connection.release(); // Release the connection back to the pool
    }
});

// User registration route
app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    try {
        // Check if the user already exists
        pool.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
            if (err) throw err;

            if (results.length > 0) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Save the new user in the database with the hashed password
            pool.query(
                'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
                [username, hashedPassword, email],
                (error, results) => {
                    if (error) {
                        throw error;
                    }
                    res.status(201).json({ message: 'User registered successfully' });
                }
            );
        });
    } catch (error) {
        console.error('Error in registration route:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Query to find the user by username
        pool.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
            if (err) throw err;

            if (results.length === 0) {
                return res.status(400).json({ message: 'User not found' });
            }

            const user = results[0];

            // Compare the provided password with the stored hashed password
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            // Generate a JWT token for the user
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            // Respond with success message and token
            res.json({ message: 'Login successful', token });
        });
    } catch (error) {
        console.error('Error in login route:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Graceful shutdown
process.on('SIGINT', () => {
    pool.end((err) => {
        if (err) {
            console.error('Error closing MySQL pool:', err);
        }
        process.exit();
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
