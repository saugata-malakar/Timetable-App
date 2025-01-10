const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const session = require('express-session');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: true,
}));

// MongoDB Atlas connection
// mongoose.connect('mongodb://localhost:27017/saugata', {
mongoose.connect('mongodb+srv://debaditya4401:1234abcd@cluster0.ycmuq.mongodb.net/Innovation', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.log('Error connecting to MongoDB:', err);
});

// Define models
const Course = mongoose.model('Course', new mongoose.Schema({
  professor_name: String,
  slot: String,
  course_name: String,
}));

const Timetable = mongoose.model('Timetable', new mongoose.Schema({
  department: String,
  year: Number,
  courses: Array,
}));

const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  role: String,
  department: String,
}));

// Routes
// Add a new course
app.post('/add-course', async (req, res) => {
  const { professor_name, slot, course_name } = req.body;

  const existingCourse = await Course.findOne({ professor_name, slot });
  if (existingCourse) {
    return res.status(400).json({ message: `Professor ${professor_name} already has a course in Slot ${slot}: ${existingCourse.course_name}` });
  }

  const course = new Course({ professor_name, slot, course_name });
  await course.save();
  return res.status(201).json({ message: 'Course added successfully!' });
});

// Save timetable
app.post('/save-timetable', async (req, res) => {
  try {
    const { department, year, courses } = req.body;
    if (!department || !year || !courses) {
      return res.status(400).json({ error: 'Department, year, and selected courses are required.' });
    }

    const slots = courses.map(course => course.slot);
    if (slots.length !== new Set(slots).size) {
      return res.status(400).json({ error: 'Slot conflict detected! Ensure no two courses have the same slot.' });
    }

    const timetableEntry = { department, year, courses };
    const existingEntry = await Timetable.findOne({ department, year });
    if (existingEntry) {
      await Timetable.updateOne({ department, year }, { $set: { courses } });
    } else {
      await new Timetable(timetableEntry).save();
    }
    return res.status(201).json({ message: `Timetable saved for ${department} department, year ${year}!` });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// User Signup
app.post('/signup', async (req, res) => {
  const { username, name, email, password, role, department } = req.body;

  if (!username || !name || !email || !password || !role) {
    return res.status(400).json({ error: 'Username, name, email, password, role, and department are required' });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, name, email, password: hashedPassword, role, department });
  await user.save();
  return res.status(201).json({ message: 'User registered successfully!' });
});

// User Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const user = await User.findOne({ username });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  req.session.user = { username: user.username, name: user.name, role: user.role, department: user.department };
  return res.status(200).json({ message: 'Login successful!', user: req.session.user });
});

// Get current session
app.get('/get-session', (req, res) => {
  if (req.session.user) {
    return res.status(200).json(req.session.user);
  } else {
    return res.status(401).json({ error: 'No active session' });
  }
});

// Logout
app.post('/logout', (req, res) => {
  req.session.destroy();
  return res.status(200).json({ message: 'Logged out successfully!' });
});

// Get all courses
app.get('/get-courses', async (req, res) => {
  const courses = await Course.find();
  return res.status(200).json(courses);
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
