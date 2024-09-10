const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8081;
const secretKey = 'teacher';

app.use(express.json({ limit: '800mb' }));

app.use(cors());
app.use(express.json({ limit: '800mb' }));
app.use(express.urlencoded({ limit: '800mb', extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'KritsadaBM224688',
    database: 'swensens'
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
});

app.post("/api/register", (req, res) => {
    const { first_name, last_name, email, passwords, date_of_birth, phone_number, role_Id } = req.body;
    const sqlInsertUser = `INSERT INTO user (first_name, last_name, email, passwords, date_of_birth, phone_number, role_Id) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(sqlInsertUser, [first_name, last_name, email, passwords, date_of_birth, phone_number, role_Id], (userError, userResult) => {
        if (userError) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const user_Id = userResult.insertId;
        res.json({ user_Id });
    });
});

app.post("/api/role", (req, res) => {
    const { role_Name, user_Id } = req.body;
    const sqlInsertRole = `INSERT INTO role (role_Name, user_Id) VALUES (?,?)`;

    db.query(sqlInsertRole, [role_Name, user_Id], (roleError, roleResult) => {
        if (roleError) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ message: 'Role Added Successful' });
    });
});

app.put("/api/update-user-role/:user_Id", (req, res) => {
    const { user_Id } = req.params;
    const { role_Name } = req.body;

    db.query("SELECT role_Id FROM role WHERE user_Id = ?", [user_Id], (roleError, roleResult) => {
        if (roleError) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const userRoleIds = roleResult.map((row) => row.role_Id);

        db.query("UPDATE user SET role_Id = ? WHERE user_Id = ?", [userRoleIds.join(','), user_Id], (updateError, updateResult) => {
            if (updateError) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.json({ message: 'User Role Updated Successful' });
        });
    });
});

app.post("/api/login", async (req, res) => {
    const { email, passwords } = req.body;

    db.query('SELECT user.*, role.role_Name FROM user JOIN role ON user.role_Id = role.role_Id WHERE user.email = ? AND user.passwords = ?', [email, passwords],
        (err, results) => {
            if (err) {
                console.error('Error querying database', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            if (results.length > 0) {
                const user = results[0]
                const token = jwt.sign({ user }, secretKey, { expiresIn: '3h' });

                res.status(200).json({
                    message: 'Login Successful',
                    user: {
                        user_Id: user.user_Id,
                        email: user.email,
                        role_Name: user.role_Name,
                    }, token,
                });
            } else {
                res.status(401).json({ message: 'Invalid Email or Password' });
            }
        });
});

app.post("/api/item", (req, res) => {
    const { item_name, item_price } = req.body;

    const sqlInsertAdmin = `INSERT INTO item (item_name, item_price) VALUES (?, ?)`;

    db.query(sqlInsertAdmin, [item_name, item_price], (adminError, adminResult) => {
        if (adminError) {
            console.error('Database Error:', adminError);
            return res.status(500).json({ error: 'Internal Server Error', message: adminError.message });
        }
        const item_Id = adminResult.insertId;
        res.json({ item_Id });
    });
});

app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ Status: "Failed", Message: "No file uploaded" });
    }
    
    const image = req.file.filename;
    const sql = `UPDATE item SET image = ?`;

    db.query(sql, [image], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ Status: "Failed", Message: "Database error" });
        }
        return res.json({ Status: "Success" });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
