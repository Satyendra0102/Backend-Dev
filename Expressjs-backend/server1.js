const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const DATA_FILE = path.join(__dirname, "students.json");

// Helper function to read students
function getStudents() {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify([]));
    }
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
}

// Helper function to save students
function saveStudents(students) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(students, null, 2));
}

// GET form page
app.get("/", (req, res) => {
    const allStudents = getStudents();
    res.render("form", { allStudents });
});

// POST form submission
app.post("/students/register", (req, res) => {
    const { name, branch } = req.body;

    const students = getStudents();
    students.push({ name, branch });
    saveStudents(students);

    res.redirect("/");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});