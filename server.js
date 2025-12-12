// server.js
// This is the backend server file for the University Lost & Found System
// Implements Node.js and Express.js concepts from Week 8 lessons
// Handles routing, database connections, and form processing
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
// This section establishes a connection to the MySQL database
// Implements database connectivity concepts from Week 7 lessons
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
// These routes serve static HTML files to the client
// Implements Express.js routing concepts from Week 9 lessons
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
// These routes handle form submissions and data processing
// Implements POST request handling from Week 9 lessons

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
                return res.status(400).send(`
                    <div style="background-color: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; padding: 25px; border-radius: 10px; margin: 30px auto; max-width: 600px; text-align: center; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                        <h2 style="font-size: 1.8rem; margin-bottom: 15px;">⚠️ Registration Error</h2>
                        <p style="font-size: 1.1rem; margin-bottom: 20px;">Email or student number already exists!</p>
                        <a href="/student_signup.html" class="btn" style="display: inline-block; margin-top: 15px; padding: 12px 25px; font-size: 1.1rem;">← Go Back to Signup</a>
                    </div>
                `);
            }
            return res.status(500).send(`
                <div style="background-color: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; padding: 25px; border-radius: 10px; margin: 30px auto; max-width: 600px; text-align: center; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                    <h2 style="font-size: 1.8rem; margin-bottom: 15px;">❌ Server Error</h2>
                    <p style="font-size: 1.1rem; margin-bottom: 20px;">An unexpected error occurred. Please try again.</p>
                    <a href="/student_signup.html" class="btn" style="display: inline-block; margin-top: 15px; padding: 12px 25px; font-size: 1.1rem;">← Go Back to Signup</a>
                </div>
            `);
        }
       // In server.js → /signup route
        res.send(`
            <div style="max-width: 600px; margin: 50px auto; padding: 30px; background: #d4edda; border-radius: 8px; text-align: center; font-family: Arial;">
            <h2 style="color: #155724;">🎉 Account Created Successfully!</h2>
            <p style="color: #155724; font-size: 1.1rem;">
                Your student account has been successfully created.<br>
                You can now log in to start reporting found items on campus.
            </p>
            <div style="margin-top: 20px;">
                <a href="student_login.html" style="display: inline-block; background: #003366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin: 5px;">Log In Now</a>
                <a href="index.html" style="display: inline-block; background: #6c757d; color: white; padding: 10 20px; text-decoration: none; border-radius: 4px; margin: 5px;">Return to Home</a>
            </div>
            </div>
        `);
    });
});

// Student login (with logging) - FIXED VERSION
app.post('/login', (req, res) => {
    const { loginId, password } = req.body;

    // Fix: Check if loginId matches email, username, OR student_no
    const sql = 'SELECT * FROM students WHERE email = ? OR username = ? OR student_no = ?';

    db.query(sql, [loginId, loginId, loginId], (err, results) => {
        if (err) {
            console.error('❌ Login error:', err);
            return res.status(500).send('Login error');
        }

        if (results.length === 0) {
            return res.status(400).send(`
                <div style="background-color: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; padding: 25px; border-radius: 10px; margin: 30px auto; max-width: 600px; text-align: center; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                    <h2 style="font-size: 1.8rem; margin-bottom: 15px;">⚠️ Login Failed</h2>
                    <p style="font-size: 1.1rem; margin-bottom: 20px;">Wrong credentials: User not found</p>
                    <a href="/student_login.html" class="btn" style="display: inline-block; margin-top: 15px; padding: 12px 25px; font-size: 1.1rem;">← Go Back to Login</a>
                </div>
            `);
        }

        const user = results[0];

        // Simple password check (in production, use hashed passwords!)
        if (user.password !== password) {
            return res.status(400).send(`
                <div style="background-color: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; padding: 25px; border-radius: 10px; margin: 30px auto; max-width: 600px; text-align: center; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                    <h2 style="font-size: 1.8rem; margin-bottom: 15px;">⚠️ Login Failed</h2>
                    <p style="font-size: 1.1rem; margin-bottom: 20px;">Wrong credentials: Incorrect password</p>
                    <a href="/student_login.html" class="btn" style="display: inline-block; margin-top: 15px; padding: 12px 25px; font-size: 1.1rem;">← Go Back to Login</a>
                </div>
            `);
        }

        // Log the login
        logLogin(user.username, 'student');

        // Redirect to lost item form
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
            return res.status(500).send(`
                <div style="background-color: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; padding: 25px; border-radius: 10px; margin: 30px auto; max-width: 600px; text-align: center; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                    <h2 style="font-size: 1.8rem; margin-bottom: 15px;">❌ Submission Error</h2>
                    <p style="font-size: 1.1rem; margin-bottom: 20px;">Failed to report item. Please try again.</p>
                    <a href="/lost_item_form.html" class="btn" style="display: inline-block; margin-top: 15px; padding: 12px 25px; font-size: 1.1rem;">← Go Back to Form</a>
                </div>
            `);
        }
        res.send(`
            <div style="background-color: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 20px; border-radius: 8px; margin: 20px auto; max-width: 800px;">
                <h2>✅ Thank you!</h2>
                <p>Your report has been submitted successfully.</p>
                <p><strong>Important:</strong> Please submit this item to the NEU Lost & Found room (Student Center 101) within 48 hours.</p>
                <p>Office Hours: Mon-Fri 9AM-5PM</p>
                <a href="/" class="btn" style="display:inline-block; margin-top:20px;">Return to Home</a>
                <a href="/lost_item_form.html" class="btn secondary" style="display:inline-block; margin-top:20px; margin-left: 10px;">Report Another Item</a>
            </div>
        `);
    });
});

// Admin login (with logging)
app.post('/admin-login', (req, res) => {
    const { adminUsername, adminPassword } = req.body;
    const sql = 'SELECT * FROM admins WHERE username = ?';
    db.query(sql, [adminUsername], (err, results) => {
        if (err || results.length === 0 || results[0].password !== adminPassword) {
            return res.status(400).send(`
                <div style="background-color: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; padding: 25px; border-radius: 10px; margin: 30px auto; max-width: 600px; text-align: center; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                    <h2 style="font-size: 1.8rem; margin-bottom: 15px;">⚠️ Login Failed</h2>
                    <p style="font-size: 1.1rem; margin-bottom: 20px;">Invalid admin credentials</p>
                    <a href="/admin_login.html" class="btn" style="display: inline-block; margin-top: 15px; padding: 12px 25px; font-size: 1.1rem;">← Go Back to Admin Login</a>
                </div>
            `);
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