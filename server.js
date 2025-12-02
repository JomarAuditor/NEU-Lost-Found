// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, images)
app.use(express.static('public'));

// Parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MySQL (XAMPP)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',     // XAMPP default
    password: '',     // XAMPP default = no password
    database: 'neu_lostfound'
});

db.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed:', err);
        return;
    }
    console.log('✅ Connected to NEU Lost & Found database!');
});

// ===== ROUTES =====

// Home page (GET)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Student signup form (GET)
app.get('/student_signup.html', (req, res) => {
    res.sendFile(__dirname + '/public/student_signup.html');
});

// Student login form (GET)
app.get('/student_login.html', (req, res) => {
    res.sendFile(__dirname + '/public/student_login.html');
});

// Report item form (GET)
app.get('/lost_item_form.html', (req, res) => {
    res.sendFile(__dirname + '/public/lost_item_form.html');
});

// Admin login (GET)
app.get('/admin_login.html', (req, res) => {
    res.sendFile(__dirname + '/public/admin_login.html');
});

// Admin dashboard (GET)
app.get('/admin_dashboard.html', (req, res) => {
    res.sendFile(__dirname + '/public/admin_dashboard.html');
});

// ===== POST HANDLERS =====

// Handle student signup
app.post('/signup', (req, res) => {
    const { username, email, studentNo, password } = req.body;

    // Simple validation
    if (!username || !email || !studentNo || !password) {
        return res.status(400).send('All fields are required!');
    }

    const sql = 'INSERT INTO students (student_no, username, email, password) VALUES (?, ?, ?, ?)';
    db.query(sql, [studentNo, username, email, password], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).send('Email or student number already exists!');
            }
            return res.status(500).send('Server error');
        }
        res.send('🎉 Student account created! You can now log in.');
    });
});

// Handle student login (simple check)
app.post('/login', (req, res) => {
    const { loginId, password } = req.body;

    // Check if loginId is email or student_no
    const sql = 'SELECT * FROM students WHERE email = ? OR student_no = ?';
    db.query(sql, [loginId, loginId], (err, results) => {
        if (err) return res.status(500).send('Login error');

        if (results.length === 0) {
            return res.status(400).send('No account found');
        }

        const user = results[0];
        if (user.password !== password) {
            return res.status(400).send('Wrong password');
        }

        // In real app: create session here
        // For now: redirect to report form
        res.redirect('/lost_item_form.html');
    });
});

// Handle item report
app.post('/report-item', (req, res) => {
    const {
        itemName, quantity, category, description,
        location, dateFound, timeFound, building,
        foundByName, studentNo, notes
    } = req.body;

    const sql = `
    INSERT INTO lost_items 
    (item_name, quantity, category, description, location_found, building, date_found, time_found, found_by_name, student_no, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    db.query(sql, [
        itemName, quantity || 1, category || null, description,
        location, building || null, dateFound, timeFound,
        foundByName, studentNo || null, notes || null
    ], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to report item');
        }
        res.send(`
      <h2>✅ Thank you!</h2>
      <p>Your report has been submitted successfully.</p>
      <p><strong>Important:</strong> Please submit this item to the NEU Lost & Found room (Student Center 101) within 48 hours.</p>
      <p>Office Hours: Mon-Fri 9AM-5PM</p>
      <a href="/" class="btn" style="display:inline-block; margin-top:20px; padding:10px 20px; background:#2D5852; color:white; text-decoration:none; border-radius:4px;">Return to Home</a>
    `);
    });
});

// Handle admin login
app.post('/admin-login', (req, res) => {
    const { adminUsername, adminPassword } = req.body;

    const sql = 'SELECT * FROM admins WHERE username = ?';
    db.query(sql, [adminUsername], (err, results) => {
        if (err) return res.status(500).send('Admin login error');

        if (results.length === 0 || results[0].password !== adminPassword) {
            return res.status(400).send('Invalid admin credentials');
        }

        res.redirect('/admin_dashboard.html');
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📁 Your website: http://localhost:${PORT}`);
});