import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './loginform';  // Import the LoginForm component
import Dashboard from './Dashboard';  // Import the Dashboard component
import Register from './Register';      // Import the Register component

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Route for the login form */}
                <Route path="/" element={<LoginForm />} />

                {/* Route for the registration form */}
                <Route path="/register" element={<Register />} />

                {/* Route for the dashboard (only accessible after login) */}
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

export default App;