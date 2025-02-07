import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            const response = await fetch('https://mit-valentine-service.vercel.app/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }
            
            localStorage.setItem('userId', data.userId);
            console.log('Logged in successfully');
            
        } catch (error) {
            setError(error.message || 'An error occurred during login');
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="login" className="py-16 bg-gradient-to-br from-pink-100 to-purple-100">
            <div className="container mx-auto px-4">
                <div className="max-w-md mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:scale-[1.02]">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back! ❤️</h2>
                            <p className="text-gray-600">Sign in to find your valentine</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 rounded-lg">
                                <p className="text-red-600 text-sm">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                                    placeholder="Enter your email"
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium 
                                ${!isLoading ? 'hover:from-pink-600 hover:to-purple-700 hover:-translate-y-0.5' : 'opacity-75 cursor-not-allowed'}
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transform transition-all`}
                            >
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <button className="font-medium text-pink-600 hover:text-pink-500">
                                    Sign up
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginForm; 