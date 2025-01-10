import React, { useState } from "react";
import axios from "axios";

function ProcessTimetable() {
    const [message, setMessage] = useState(""); // Success/Error message
    const [isProcessing, setIsProcessing] = useState(false); // Loading state

    // Function to process the timetable
    const processTimetable = async () => {
        setIsProcessing(true); // Set loading state
        setMessage(""); // Clear previous messages
        try {
            const response = await axios.post("http://localhost:8000/process-timetable");
            setMessage(response.data.message); // Set success message
        } catch (err) {
            setMessage(err.response?.data?.error || "Error processing timetable."); // Set error message
        } finally {
            setIsProcessing(false); // Reset loading state
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    Institute Admin - Process Timetable
                </h2>
                
                <button
                    onClick={processTimetable}
                    disabled={isProcessing}
                    className={`w-full py-2 rounded-md text-white font-semibold ${
                        isProcessing
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                    } transition`}
                >
                    {isProcessing ? "Processing..." : "Process Timetable"}
                </button>

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

export default ProcessTimetable;
