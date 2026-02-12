const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 8000;

app.use(express.json());

const DATA_FILE = path.join(__dirname, "students.json");

const readStudents = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return []; 
  }
};

const writeStudents = (students) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(students, null, 2));
};

let students = readStudents();


app.post("/students/register", (req, res) => {
  try {
    const { id, name, age, marks, branch } = req.body;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is empty" });
    }

    if (!id || !name || !age || !marks || !branch) {
      return res.status(400).json({
        message: "Missing required fields: id, name, age, marks, branch"
      });
    }

    if (
      typeof id !== "number" ||
      typeof name !== "string" ||
      typeof age !== "number" ||
      typeof marks !== "number" ||
      typeof branch !== "string"
    ) {
      return res.status(400).json({ message: "Invalid data types" });
    }

    const existingStudent = students.find(s => s.id === id);
    if (existingStudent) {
      return res.status(409).json({
        message: "Student with this ID already exists"
      });
    }

    if (age <= 0 || marks < 0 || marks > 100) {
      return res.status(400).json({
        message: "Invalid age or marks value"
      });
    }

    const newStudent = { id, name, age, marks, branch };
    students.push(newStudent);

    writeStudents(students);

    return res.status(201).json({
      message: "Student registered successfully",
      student: newStudent
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
});

app.get("/students/search", (req, res) => {
  const branch = req.query.branch;

  if (!branch) {
    return res.status(400).json({ message: "Branch query is required" });
  }

  const result = students.filter(
    s => s.branch.toLowerCase() === branch.toLowerCase()
  );

  if (result.length === 0) {
    return res.status(404).json({
      message: "No students found for this branch"
    });
  }

  res.json(result);
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.get("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
