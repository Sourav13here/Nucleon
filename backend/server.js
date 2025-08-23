//server.js
const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to handle form submission
app.post("/contacts", (req, res) => {
  const { name, email, phone, program, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: "Please fill all required fields" });
  }

  const sql = `INSERT INTO contacts (name, email, phone, program, message) VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [name, email, phone, program, message], function (err) {
    if (err) {
      console.error("Error saving data:", err.message);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ success: true, message: " Message saved successfully!" });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
