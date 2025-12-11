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
    user: 'root',
    password: '',
    database: 'neu_lostfound'
});

db.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed:', err);
        return;
    }
    console.log('✅ Connected to UNIVERSITY Lost & Found database!');
});
console.log('✅ Server routes loaded');

// ===== HELPER: Log logins =====
function logLogin(username, role) {
    const sql = 'INSERT INTO login_logs (username, role) VALUES (?, ?)';
    db.query(sql, [username, role], (err) => {
        if (err) console.error('Login log failed:', err);
    });
}

// ===== GET ROUTES =====
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/student_signup.html', (req, res) => {
    res.sendFile(__dirname + '/public/student_signup.html');
});

app.get('/student_login.html', (req, res) => {
    res.sendFile(__dirname + '/public/student_login.html');
});

app.get('/lost_item_form.html', (req, res) => {
    res.sendFile(__dirname + '/public/lost_item_form.html');
});

app.get('/admin_login.html', (req, res) => {
    res.sendFile(__dirname + '/public/admin_login.html');
});

app.get('/admin_dashboard.html', (req, res) => {
    res.sendFile(__dirname + '/public/admin_dashboard.html');
});

// ===== POST ROUTES =====

// Student signup
app.post('/signup', (req, res) => {
    const { username, email, studentNo, password } = req.body;
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

// Student login (with logging)
app.post('/login', (req, res) => {
    const { loginId, password } = req.body;
    const sql = 'SELECT * FROM students WHERE email = ? OR student_no = ?';
    db.query(sql, [loginId, loginId], (err, results) => {
        if (err) return res.status(500).send('Login error');
        if (results.length === 0 || results[0].password !== password) {
            return res.status(400).send('Wrong credentials');
        }
        logLogin(results[0].username, 'student');
        res.redirect('/lost_item_form.html');
    });
});

// Report item
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

// Admin login (with logging)
app.post('/admin-login', (req, res) => {
    const { adminUsername, adminPassword } = req.body;
    const sql = 'SELECT * FROM admins WHERE username = ?';
    db.query(sql, [adminUsername], (err, results) => {
        if (err || results.length === 0 || results[0].password !== adminPassword) {
            return res.status(400).send('Invalid admin credentials');
        }
        logLogin(adminUsername, 'admin');
        res.redirect('/admin_dashboard.html');
    });
});

// ===== NEW: Admin Data API =====
app.get('/api/admin-data', (req, res) => {
    const data = {};
    let completed = 0;

    function checkDone() {
        if (completed === 3) {
            res.json(data);
        }
    }

    // Get students
    db.query('SELECT student_no, username, email FROM students', (err, rows) => {
        data.students = rows || [];
        completed++;
        checkDone();
    });

    // Get login logs (latest 20)
    db.query('SELECT username, role, login_time FROM login_logs ORDER BY login_time DESC LIMIT 20', (err, rows) => {
        data.logins = rows || [];
        completed++;
        checkDone();
    });

    // Get items
    db.query('SELECT * FROM lost_items ORDER BY created_at DESC', (err, rows) => {
        data.items = rows || [];
        completed++;
        checkDone();
    });
});

// Update item status
app.post('/api/update-item-status', express.json(), (req, res) => {
    const { id, status } = req.body;

    if (!id || !status) {
        return res.status(400).json({ error: 'Item ID and status are required' });
    }

    const sql = 'UPDATE lost_items SET status = ? WHERE id = ?';
    db.query(sql, [status, id], (err, result) => {
        if (err) {
            console.error('Update error:', err);
            return res.status(500).json({ error: 'Database update failed' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json({ success: true });
    });
});
// ===== START SERVER =====
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📁 Your website: http://localhost:${PORT}`);
});