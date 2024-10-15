import React, { useState } from 'react';
import './App.css'; // Import your CSS file

const LoginForm = () => {
    const [username, setUsername] = useState('');  // Manage username input
    const [password, setPassword] = useState('');  // Manage password input
    const [error, setError] = useState('');        // Manage error messages
    const [loading, setLoading] = useState(false); // Manage loading state

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            // Check if response is ok (status in the range 200-299)
            if (!response.ok) {
                // Read the response body once here
                const errorData = await response.json(); 
                throw new Error(errorData.message || 'Login failed');
            }
    
            // Read the response body if the login was successful
            const data = await response.json();
            console.log('Login successful:', data);
            // Handle successful login (e.g., save token, redirect, etc.)
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., display error message)
        }
    };
    

    return (
        <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
            <form onSubmit={handleLogin}> {/* Form submission triggers handleLogin */}
                <h3>Login Here</h3>

                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    placeholder="Email or Phone"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Update username state
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update password state
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? 'Logging In...' : 'Log In'}
                </button>

                {/* Show an error message if login fails */}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div className="social">
                    <div className="go"><i className="fab fa-google"></i> Google</div>
                    <div className="fb"><i className="fab fa-facebook"></i> Facebook</div>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;