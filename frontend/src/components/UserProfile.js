import React, { useState, useEffect } from "react";

function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        // Fetch user details from local storage
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
                setLoading(false);
            } catch (err) {
                setError("Error loading user details.");
                setLoading(false);
            }
        } else {
            setError("No user details available. Please log in.");
            setLoading(false);
        }
    }, []); // Runs once on component mount

    if (loading) {
        return <p>Loading user details...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">User Profile</h2>
                <div className="space-y-4">
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    <p><strong>Department:</strong> {user.department}</p>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
