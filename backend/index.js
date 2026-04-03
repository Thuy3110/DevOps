// update 2
require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Kết nối DB
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: "root",
  password: "",
  database: "testdb"
});

db.connect(err => {
  if (err) console.log("DB Error:", err);
  else console.log("DB Connected");
});

// API health
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// API about
app.get("/about", (req, res) => {
  res.json({
    name: "ĐÀO THỊ THANH THÚY",
    studentId: "2251220118",
    class: "22ct3"
  });
});

// GET users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    res.json(result);
  });
});

// POST users
app.post("/users", (req, res) => {
  const { name } = req.body;
  db.query("INSERT INTO users (name) VALUES (?)", [name], () => {
    res.json({ message: "Added" });
  });
});

app.listen(PORT, () => console.log("Server chạy tại port", PORT));