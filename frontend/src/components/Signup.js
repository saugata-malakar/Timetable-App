import React, { useState } from "react";
import axios from "axios";

function Signup() {
    const [formData, setFormData] = useState({
        username: "",
        name: "",
        email: "",
        password: "",
        role: "professor",
        department: "CSE",
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        try {
            const response = await axios.post("http://localhost:8000/signup", formData);
            setMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.error || "Error signing up. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-10">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Signup</h2>
                <form onSubmit={handleSubmit}>
                    {/* Username */}
                    <label className="block text-sm font-medium text-gray-600">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full p-2 mb-4 border rounded-md"
                        required
                    />

                    {/* Name */}
                    <label className="block text-sm font-medium text-gray-600">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 mb-4 border rounded-md"
                        required
                    />

                    {/* Email */}
                    <label className="block text-sm font-medium text-gray-600">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 mb-4 border rounded-md"
                        required
                    />

                    {/* Password */}
                    <label className="block text-sm font-medium text-gray-600">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 mb-4 border rounded-md"
                        required
                    />

                    {/* Role */}
                    <label className="block text-sm font-medium text-gray-600">Role</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full p-2 mb-4 border rounded-md"
                    >
                        <option value="professor">Professor</option>
                        <option value="HOD">HOD</option>
                        <option value="insti_admin">Institute Admin</option>
                    </select>

                    {/* Department */}
                    <label className="block text-sm font-medium text-gray-600">Department</label>
                    <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full p-2 mb-4 border rounded-md"
                    >
                        <option value="CSE">CSE</option>
                        <option value="ECE">ECE</option>
                        <option value="EE">EE</option>
                        <option value="ME">ME</option>
                    </select>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Signup
                    </button>
                </form>

                {/* Success or Error Message */}
                {message && (
                    <p className="mt-4 text-green-600 bg-green-100 p-2 rounded-md text-center">
                        {message}
                    </p>
                )}
                {error && (
                    <p className="mt-4 text-red-600 bg-red-100 p-2 rounded-md text-center">
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Signup;
