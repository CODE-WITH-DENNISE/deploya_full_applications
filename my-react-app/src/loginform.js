import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';  // Import Link for navigation
import './App.css'; // Import your CSS file

const LoginForm = () => {
    const [username, setUsername] = useState('');  // Manage username input
    const [password, setPassword] = useState('');  // Manage password input
    const [error, setError] = useState('');        // Manage error messages
    const [loading, setLoading] = useState(false); // Manage loading state

    const navigate = useNavigate();  // Hook for programmatic navigation

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);  // Set loading state to true

        try {
            const response = await fetch(`http://localhost:5000/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();
            console.log('Login successful:', data);

            // Store JWT token (in localStorage for simplicity)
            localStorage.setItem('token', data.token);

            // Redirect to another page (e.g., dashboard) after successful login
            navigate('/dashboard');  // Redirect to /dashboard

        } catch (error) {
            setError(error.message);
            console.error('Error:', error);
        } finally {
            setLoading(false);  // Reset loading state
        }
    };

    return (
        <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
            <form onSubmit={handleLogin}>
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

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div className="social">
                    <div className="go"><i className="fab fa-google"></i> Google</div>
                    <div className="fb"><i className="fab fa-facebook"></i> Facebook</div>
                </div>

                {/* Link to switch to registration */}
                <p style={{ marginTop: '20px', textAlign: 'center', color: '#fff' }}>
                    Don't have an account?{' '}
                    <Link to="/register" style={{ color: '#23a2f6', textDecoration: 'none' }}>
                        Register here
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;
