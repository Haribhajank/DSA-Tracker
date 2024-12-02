import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = process.env.REACT_APP_BACKEND_URL;
            console.log(apiUrl); // Should log: https://your-backend-url.onrender.com

            const res = await axios.post('${process.env.REACT_APP_BACKEND_URL}/login', { username, password });
            login(res.data.token);
            alert(res.data.message);
            navigate('/dashboard');
        } catch (err) {
            alert('Error during login. Check credentials.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full px-4 py-2 border rounded-lg"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

