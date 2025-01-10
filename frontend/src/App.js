import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AddCourse from './components/AddCourse';
import Contact from './components/Contact';
import ShowCourses from './components/ShowCourses';
import HODCourseSelection from './components/HODCourseSelection';
import ProcessTimetable from './components/ProcessTimetable';
import StudentTimetable from './components/StudentTimetable';
import ProfessorTimetable from './components/ProfessorTimetable';
import Signup from './components/Signup';
import Login from './components/Login';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        {/* Navigation Bar */}
        <nav className="bg-blue-600 text-white py-4 shadow-md">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="text-2xl font-bold">
              <Link to="/">Timetable App</Link>
            </div>
            <ul className="hidden md:flex space-x-6">
              <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
              <li><Link to="/addcourse" className="hover:text-gray-300">Add Course</Link></li>
              <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
              <li><Link to="/show_courses" className="hover:text-gray-300">Show All Courses</Link></li>
              <li><Link to="/hodcourseselection" className="hover:text-gray-300">HOD Course Selection</Link></li>
              <li><Link to="/ProcessTimetable" className="hover:text-gray-300">Process Timetable</Link></li>
              <li><Link to="/StudentTimetable" className="hover:text-gray-300">Student Timetable</Link></li>
              <li><Link to="/ProfessorTimetable" className="hover:text-gray-300">Professor Timetable</Link></li>
              <li><Link to="/signup" className="hover:text-gray-300">Signup</Link></li>
              <li><Link to="/login" className="hover:text-gray-300">Login</Link></li>
            </ul>
            <button className="md:hidden block text-white focus:outline-none" aria-label="Toggle Menu">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<AddCourse />} />
            <Route path="/addcourse" element={<AddCourse />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/show_courses" element={<ShowCourses />} />
            <Route path="/hodcourseselection" element={<HODCourseSelection />} />
            <Route path="/ProcessTimetable" element={<ProcessTimetable />} />
            <Route path="/StudentTimetable" element={<StudentTimetable />} />
            <Route path="/ProfessorTimetable" element={<ProfessorTimetable />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/details" element={<UserProfile />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-blue-600 text-white text-center py-4">
          <p>&copy; 2025 Timetable App. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
