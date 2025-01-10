import React, { useState, useEffect } from "react";
import axios from "axios";

function HODCourseSelection() {
    const [courses, setCourses] = useState([]); // All courses from backend
    const [selectedCourses, setSelectedCourses] = useState([]); // Selected courses
    const [department, setDepartment] = useState(""); // Selected department
    const [year, setYear] = useState(""); // Selected year
    const [message, setMessage] = useState(""); // Success/Error message

    // Fetch all courses from the backend
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("http://localhost:8000/get-courses");
                setCourses(response.data);
                setMessage("");
            } catch (err) {
                setMessage("Failed to fetch courses. Please try again.");
            }
        };
        fetchCourses();
    }, []);

    // Handle course selection
    const handleCourseSelection = (course) => {
        // Check for slot conflicts
        if (selectedCourses.some((selected) => selected.slot === course.slot)) {
            setMessage(`Slot conflict detected! ${course.slot} is already selected.`);
            return;
        }
        setSelectedCourses([...selectedCourses, course]);
        setMessage("");
    };

    // Save timetable to backend
    const saveTimetable = async () => {
        if (!department || !year) {
            setMessage("Please specify the department and year.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/save-timetable", {
                department,
                year: parseInt(year),
                courses: selectedCourses,
            });
            setMessage({ type: "success", text: response.data.message });
            setSelectedCourses([]);
        } catch (err) {
            setMessage({ type: "error", text: err.response?.data?.error || "Error saving timetable." });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6">
                <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
                    HOD Course Selection
                </h2>

                {/* Input Department and Year */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {/* Dropdown for Department */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Department:</label>
                        <select
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Department</option>
                            <option value="CSE">CSE</option>
                            <option value="ECE">ECE</option>
                            <option value="EE">EE</option>
                            <option value="ME">ME</option>
                        </select>
                    </div>

                    {/* Dropdown for Year */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Year:</label>
                        <select
                            value={year}
                            onChange={(e) => setYear(parseInt(e.target.value))}
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Year</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                        </select>
                    </div>
                </div>

                {/* Available Courses */}
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Courses</h3>
                <div className="bg-gray-50 rounded-md p-4 max-h-60 overflow-y-auto">
                    {courses.length === 0 ? (
                        <p className="text-gray-500">No courses available.</p>
                    ) : (
                        <ul className="space-y-2">
                            {courses.map((course, index) => (
                                <li key={index} className="flex justify-between items-center">
                                    <span className="text-gray-700">
                                        {course.course_name} (Slot: {course.slot}, Dept:{" "}
                                        {course.department}, Year: {course.year})
                                    </span>
                                    <button
                                        onClick={() => handleCourseSelection(course)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                                    >
                                        Select
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Selected Courses */}
                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-4">
                    Selected Courses
                </h3>
                <div className="bg-gray-50 rounded-md p-4 max-h-60 overflow-y-auto">
                    {selectedCourses.length === 0 ? (
                        <p className="text-gray-500">No courses selected.</p>
                    ) : (
                        <ul className="space-y-2">
                            {selectedCourses.map((course, index) => (
                                <li key={index} className="text-gray-700">
                                    {course.course_name} (Slot: {course.slot}, Dept:{" "}
                                    {course.department}, Year: {course.year})
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Save Timetable Button */}
                <div className="mt-6 text-center">
                    <button
                        onClick={saveTimetable}
                        className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
                    >
                        Save Timetable
                    </button>
                </div>

                {/* Success/Error Message */}
                {message && (
                    <div
                        className={`mt-4 py-2 px-4 rounded-md text-center ${
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

export default HODCourseSelection;
