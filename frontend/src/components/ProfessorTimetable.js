import React, { useState } from "react";
import axios from "axios";

function ProfessorTimetable() {
    const [professorName, setProfessorName] = useState(""); // Professor name input
    const [timetable, setTimetable] = useState([]); // Timetable data
    const [message, setMessage] = useState(""); // Success/Error message
    const [loading, setLoading] = useState(false); // Loading state

    // Fetch courses and corresponding schedule for the professor
    const fetchTimetable = async () => {
        if (!professorName.trim()) {
            setMessage("Please enter a valid professor name.");
            setTimetable([]);
            return;
        }

        setLoading(true); // Start loading
        setMessage(""); // Clear previous messages

        try {
            // Fetch all courses
            const coursesResponse = await axios.get("http://localhost:8000/get-courses");
            const allCourses = coursesResponse.data;

            // Filter courses for the given professor
            const professorCourses = allCourses.filter(
                (course) => course.professor_name.toLowerCase() === professorName.toLowerCase()
            );

            if (professorCourses.length === 0) {
                setMessage("No courses found for this professor.");
                setTimetable([]);
                setLoading(false);
                return;
            }

            // Fetch all schedules
            const schedulesResponse = await axios.get("http://localhost:8000/get-all-schedules");
            const allSchedules = schedulesResponse.data;

            // Map professor courses to their slots and room numbers
            const professorTimetable = professorCourses.map((course) => {
                let room = "Course not allotted"; // Default message for unallocated courses
                let slot = course.slot;

                // Search for the course in the schedules database
                for (let schedule of allSchedules) {
                    const courseSchedule = schedule.schedule.find(
                        (entry) => entry.course_code === course.course_code
                    );
                    if (courseSchedule) {
                        room = courseSchedule.room;
                        slot = courseSchedule.slot;
                        break;
                    }
                }

                return {
                    course_name: course.course_name,
                    course_code: course.course_code,
                    slot: slot,
                    room: room,
                };
            });

            setTimetable(professorTimetable);
        } catch (err) {
            setMessage("Error fetching timetable. Please try again.");
            setTimetable([]);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                    Professor Timetable
                </h2>

                {/* Input Professor Name */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Professor Name:
                    </label>
                    <input
                        type="text"
                        value={professorName}
                        onChange={(e) => setProfessorName(e.target.value)}
                        placeholder="Enter professor name"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Fetch Timetable Button */}
                <button
                    onClick={fetchTimetable}
                    disabled={loading}
                    className={`w-full py-2 text-white font-bold rounded-md transition ${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                    {loading ? "Loading..." : "Show Timetable"}
                </button>

                {/* Message */}
                {message && (
                    <p
                        className={`mt-4 text-center py-2 rounded-md ${
                            message.includes("Error") || message.includes("No courses")
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                        }`}
                    >
                        {message}
                    </p>
                )}

                {/* Timetable Table */}
                {timetable.length > 0 && (
                    <div className="overflow-x-auto mt-6">
                        <table className="min-w-full bg-white border rounded-md">
                            <thead className="bg-blue-500 text-white">
                                <tr>
                                    <th className="py-2 px-4 text-left">Course Name</th>
                                    <th className="py-2 px-4 text-left">Course Code</th>
                                    <th className="py-2 px-4 text-left">Slot</th>
                                    <th className="py-2 px-4 text-left">Room</th>
                                </tr>
                            </thead>
                            <tbody>
                                {timetable.map((entry, index) => (
                                    <tr
                                        key={index}
                                        className={`${
                                            index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                        }`}
                                    >
                                        <td className="py-2 px-4">{entry.course_name}</td>
                                        <td className="py-2 px-4">{entry.course_code}</td>
                                        <td className="py-2 px-4">{entry.slot}</td>
                                        <td className="py-2 px-4">{entry.room}</td>
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

export default ProfessorTimetable;
