import React, { useState } from "react";
import axios from "axios";

function StudentTimetable() {
    const [department, setDepartment] = useState("CSE"); // Default department
    const [year, setYear] = useState(1); // Default year
    const [timetable, setTimetable] = useState(null); // Timetable data
    const [message, setMessage] = useState(""); // Success/Error message

    // Fetch the timetable from the backend
    const fetchTimetable = async () => {
        setMessage(""); // Clear previous messages
        try {
            const response = await axios.post("http://localhost:8000/get-schedule", {
                department,
                year,
            });
            setTimetable(response.data.schedule);
            if (!response.data.schedule.length) {
                setMessage("No timetable available for the selected department and year.");
            }
        } catch (err) {
            setMessage(err.response?.data?.error || "Error fetching timetable.");
            setTimetable(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Student Timetable
                </h2>

                {/* Dropdowns for Department and Year */}
                <div className="flex flex-wrap justify-between gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Department:</label>
                        <select
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="CSE">CSE</option>
                            <option value="ECE">ECE</option>
                            <option value="EE">EE</option>
                            <option value="ME">ME</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Year:</label>
                        <select
                            value={year}
                            onChange={(e) => setYear(parseInt(e.target.value))}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                        </select>
                    </div>
                </div>

                {/* Fetch Timetable Button */}
                <button
                    onClick={fetchTimetable}
                    className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Show Timetable
                </button>

                {/* Error or Success Message */}
                {message && (
                    <p
                        className={`mt-4 text-center p-2 rounded-md ${
                            timetable ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}
                    >
                        {message}
                    </p>
                )}

                {/* Timetable Table */}
                {timetable && timetable.length > 0 && (
                    <table className="mt-6 w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 p-2">Course Name</th>
                                <th className="border border-gray-300 p-2">Course Code</th>
                                <th className="border border-gray-300 p-2">Slot</th>
                                <th className="border border-gray-300 p-2">Room</th>
                            </tr>
                        </thead>
                        <tbody>
                            {timetable.map((entry, index) => (
                                <tr
                                    key={index}
                                    className={`${
                                        index % 2 === 0 ? "bg-white" : "bg-gray-100"
                                    } hover:bg-gray-200 transition`}
                                >
                                    <td className="border border-gray-300 p-2">
                                        {entry.course_name}
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {entry.course_code}
                                    </td>
                                    <td className="border border-gray-300 p-2">{entry.slot}</td>
                                    <td className="border border-gray-300 p-2">{entry.room}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default StudentTimetable;
