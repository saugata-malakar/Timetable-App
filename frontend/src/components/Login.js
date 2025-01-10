/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";

function Login() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [message, setMessage] = useState("");
    const [userDetails, setUserDetails] = useState(() => {
        // Load user details from local storage on component mount
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/login", formData);
            const user = response.data.user;

            // Set user details in state and localStorage
            setUserDetails(user);
            localStorage.setItem("user", JSON.stringify(user));
            setMessage(`Login successful! Role: ${user.role}`);

            // Perform any role-specific actions or redirection
            console.log("User Role:", user.role);
        } catch (err) {
            setMessage(err.response?.data?.error || "Error logging in. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Login</h2>

                <form onSubmit={handleSubmit}>
                    {/* Username Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your username"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                </form>

                {/* Feedback Message */}
                {message && (
                    <p
                        className={`mt-4 text-center py-2 rounded-md ${
                            message.includes("successful")
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Login;
