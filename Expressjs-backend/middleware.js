const fs = require("fs").promises;
const express = require("express");
const app = express();

const PORT = 8000;


app.use(express.json());

const loggerMiddleware = async (req, res, next) => {
  const log = `Time: ${new Date().toLocaleString()} | Method: ${req.method} | URL: ${req.url}\n`;

  try {
    await fs.appendFile("./log.txt", log);
  } catch (err) {
    console.log("Logger error:", err.message);
  }

  next();
};

app.use(loggerMiddleware);


const readStudentsFromFile = async () => {
  const data = await fs.readFile("./students.json", "utf-8");
  return JSON.parse(data || "[]");
};

const writeStudentsToFile = async (records) => {
  await fs.writeFile("./students.json", JSON.stringify(records, null, 2));
};


app.get("/students", async (req, res) => {
  try {
    const students = await readStudentsFromFile();
    return res.status(200).json(students);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/students/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Empty body not allowed" });
    }

    const students = await readStudentsFromFile();

    const index = students.findIndex((s) => s.id === userId);
    if (index === -1) {
      return res.status(404).json({ message: "Student not found" });
    }

    students[index] = { ...students[index], ...req.body };

    await writeStudentsToFile(students);

    return res.status(200).json({
      message: "Student updated successfully",
      student: students[index],
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

app.delete("/students/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const students = await readStudentsFromFile();

    const index = students.findIndex((s) => s.id === userId);
    if (index === -1) {
      return res.status(404).json({ message: "Student not found" });
    }

    const deletedStudent = students.splice(index, 1)[0];

    await writeStudentsToFile(students);

    return res.status(200).json({
      message: "Student deleted successfully",
      deletedStudent,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});