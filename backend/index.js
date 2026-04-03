require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// 🔥 Serve frontend
const frontendPath = path.join(__dirname, "../frontend");
app.use(express.static(frontendPath));

// 👉 Trang chủ
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// 👉 Health
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// 👉 About
app.get("/about", (req, res) => {
  res.json({
    name: "ĐÀO THỊ THANH THÚY",
    studentId: "2251220118",
    class: "22ct3"
  });
});

// 👉 GET students
app.get("/students", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM students");
    res.json(rows);
  } catch (err) {
    console.error("❌ DB Error:", err.message);
    res.status(500).json({ error: "Lỗi DB" });
  }
});

// 👉 POST student
app.post("/students", async (req, res) => {
  try {
    const { name, age, class: studentClass, email } = req.body;

    // ❗ validate
    if (!name || !age || !studentClass || !email) {
      return res.status(400).json({ error: "Thiếu dữ liệu" });
    }

    await db.query(
      "INSERT INTO students(name, age, class, email) VALUES (?, ?, ?, ?)",
      [name, age, studentClass, email]
    );

    res.json({ message: "✅ Added" });

  } catch (err) {
    console.error("❌ Insert Error:", err.message);
    res.status(500).json({ error: "Lỗi thêm dữ liệu" });
  }
});

// 👉 Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});