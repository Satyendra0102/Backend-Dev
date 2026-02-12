const fs = require("fs").promises;
const express = require("express");
const path = require("path");

const app = express();
const PORT = 8000;

// ---------------- MIDDLEWARE ----------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static("Views"));

// Basic Middleware
app.use((req, res, next) => {
  console.log("Middleware running...");
  next();
});

// Logger Middleware
app.use(async (req, res, next) => {
  try {
    const log = `${new Date().toLocaleString()} | ${req.method} | ${req.url}\n`;
    await fs.appendFile("log.txt", log);
    next();
  } catch (err) {
    console.error("Log error:", err.message);
    next();
  }
});

// ---------------- HELPER FUNCTIONS ----------------

const readStudents = async () => {
  try {
    const data = await fs.readFile("students.json", "utf-8");
    return JSON.parse(data || "[]");
  } catch {
    return [];
  }
};

const writeStudents = async (students) => {
  await fs.writeFile("students.json", JSON.stringify(students, null, 2));
};

// ---------------- ROUTES ----------------

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Views", "form.html"));
});

// Register Student
app.post("/students/register", async (req, res) => {
  try {
    const students = await readStudents();

    const newStudent = {
      id: parseInt(req.body.id),
      name: req.body.name,
      branch: req.body.branch
    };

    if (!newStudent.id || !newStudent.name) {
      return res.status(400).send("ID and Name required");
    }

    const exists = students.find(s => s.id === newStudent.id);
    if (exists) {
      return res.status(400).send("Student already exists");
    }

    students.push(newStudent);
    await writeStudents(students);

    res.send(`
      <h2>Student Registered Successfully ✅</h2>
      <a href="/">Go Back</a>
    `);

  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// View All Students
app.get("/students", async (req, res) => {
  const students = await readStudents();

  let output = "<h1>All Students</h1><ul>";

  students.forEach(s => {
    output += `<li>${s.id} - ${s.name} - ${s.branch}</li>`;
  });

  output += "</ul><a href='/'>Go Back</a>";

  res.send(output);
});

// ---------------- START SERVER ----------------
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
