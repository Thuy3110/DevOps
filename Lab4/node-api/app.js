const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

// Chỉ cho phép frontend Vite
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Kết nối MySQL
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "appdb"
});

db.connect(err => {
    if (err) {
        console.error("Không thể kết nối MySQL:", err.message);
        process.exit(1);
    }
    console.log("NodeJS kết nối MySQL thành công!");
});

// API lấy tasks từ MySQL
app.get('/api-node/tasks', (req, res) => {
    db.query("SELECT * FROM tasks", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results); // React nhận JSON
    });
});

app.listen(3000, () => console.log("NodeJS chạy ở port 3000"));