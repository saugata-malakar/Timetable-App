import React, { useState } from "react";
import axios from "axios";

function ShowCourses() {
    const [courses, setCourses] = useState([]); // State to store courses
    const [error, setError] = useState(""); // State to store error message
    const [isDataFetched, setIsDataFetched] = useState(false); // Track if data has been fetched
    const [loading, setLoading] = useState(false); // Loading state

    // Function to fetch courses from the backend
    const fetchCourses = async () => {
        setLoading(true);
        setError(""); // Clear previous errors
        try {
            const response = await axios.get("http://localhost:8000/get-courses");
            setCourses(response.data); // Set fetched courses to state
            setIsDataFetched(true);
        } catch (err) {
            setError("Failed to fetch courses. Please try again.");
        } finally {
            // console.log(courses);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
                <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                    HOD/Admin Dashboard
                </h1>

                {/* Fetch Courses Button */}
                <button
                    onClick={fetchCourses}
                    disabled={loading}
                    className={`w-full py-2 mb-4 text-white font-bold rounded-md transition ${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                    {loading ? "Loading..." : "Show Courses"}
                </button>

                {/* Error Message */}
                {error && (
                    <p className="text-red-600 text-center bg-red-100 p-2 rounded-md">
                        {error}
                    </p>
                )}

                {/* No Courses Found */}
                {isDataFetched && courses.length === 0 && (
                    <p className="text-gray-700 text-center bg-gray-100 p-2 rounded-md">
                        No courses available.
                    </p>
                )}

                {/* Courses Table */}
                {isDataFetched && courses.length > 0 && (
                    <div className="overflow-x-auto mt-4">
                        <table className="min-w-full bg-white border border-gray-300 rounded-md">
                            <thead className="bg-blue-500 text-white">
                                <tr>
                                    <th className="py-2 px-4 text-left">Course Name</th>
                                    <th className="py-2 px-4 text-left">Course Code</th>
                                    <th className="py-2 px-4 text-left">Professor Name</th>
                                    <th className="py-2 px-4 text-left">Department</th>
                                    <th className="py-2 px-4 text-left">Year</th>
                                    <th className="py-2 px-4 text-left">Slot</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course, index) => (
                                    <tr
                                        key={index}
                                        className={`${
                                            index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                        }`}
                                    >
                                        <td className="py-2 px-4">{course.course_name}</td>
                                        <td className="py-2 px-4">{course.course_code}</td>
                                        <td className="py-2 px-4">{course.professor_name}</td>
                                        <td className="py-2 px-4">{course.department}</td>
                                        <td className="py-2 px-4">{course.year}</td>
                                        <td className="py-2 px-4">{course.slot}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ShowCourses;
