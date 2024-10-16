import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router for navigation

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return; // Stop further execution
        }

        setError(''); // Reset error state

        try {
            // Send registration data to the backend
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Registration successful');
                // Optionally, you can redirect to the login page or clear the form
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            } else {
                setError(data.message || 'Registration failed'); // Show error message from backend
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to register. Please try again later.');
        }
    };

    return (
        <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
            <form onSubmit={handleSubmit}>
                <h3>Register Here</h3>

                <label htmlFor="username">Username</label>
                <input 
                    type="text" 
                    id="username" 
                    placeholder="Enter your username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />

                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />

                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder="Enter your password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input 
                    type="password" 
                    id="confirmPassword" 
                    placeholder="Confirm your password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required 
                />

                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}

                <button type="submit">Register</button>

                {/* Link to switch to login */}
                <p style={{ marginTop: '20px', textAlign: 'center', color: '#fff' }}>
                    Already have an account?{' '}
                    <Link to="/" style={{ color: '#23a2f6', textDecoration: 'none' }}>
                        Login here
                    </Link>
                </p>

                <div className="social">
                    <div className="go">Google</div>
                    <div className="fb">Facebook</div>
                </div>
            </form>
        </div>
    );
};

export default Register;
