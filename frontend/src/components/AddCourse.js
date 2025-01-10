import React, { useState } from "react";
import axios from "axios";

function AddCourse() {
    // State for form data
    const [formData, setFormData] = useState({
        professor_name: "",
        course_name: "",
        course_code: "",
        department: "",
        year: "",
        slot: ""
    });

    // State for messages (success/error)
    const [message, setMessage] = useState("");

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make API call to backend
            const response = await axios.post("http://localhost:8000/add-course", formData);
            setMessage({ type: "success", text: response.data.message }); // Display success message
            setFormData({
                professor_name: "",
                course_name: "",
                course_code: "",
                department: "",
                year: "",
                slot: ""
            }); // Reset form
        } catch (error) {
            setMessage({ type: "error", text: error.response?.data?.message || "Error adding course" });
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
                    Faculty Course Addition
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Professor Name:
                        </label>
                        <input
                            type="text"
                            name="professor_name"
                            value={formData.professor_name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Course Name:
                        </label>
                        <input
                            type="text"
                            name="course_name"
                            value={formData.course_name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Course Code:
                        </label>
                        <input
                            type="text"
                            name="course_code"
                            value={formData.course_code}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Department:
                        </label>
                        <input
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Year:
                        </label>
                        <input
                            type="number"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Slot:
                        </label>
                        <input
                            type="text"
                            name="slot"
                            value={formData.slot}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Add Course
                    </button>
                </form>

                {/* Display success/error message */}
                {message && (
                    <div
                        className={`mt-4 text-center py-2 rounded-md ${
                            message.type === "success"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
                        {message.text}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddCourse;
