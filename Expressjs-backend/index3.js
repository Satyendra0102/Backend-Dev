const express = require("express")
const fs = require('fs');

const app = express();
app.use(express.json());

const PORT = 8000;

const students = [
    { id: 2, name: "raj", branch: "cse" },
    { id: 4, name: "Kishan", branch: "ec" },
    { id: 3, name: "Kashyap", branch: "dep" },
    { id: 7, name: "Rohit", branch: "cld" },
    { id: 5, name: "tanmay", branch: "ttd" },


];

app.get("/", (req, res) => {
    return res.send("<h1>wellcome to home page</h1>")
})

app.get("/students", (req, res) => {
    res.json(students);

    // fs.readFile("./Student.json","utf-8",(err,data)=>{
    //     if(err){
    //         return res.status(500).send(err.message)

    //     }
    //     return res.status(200).send(JSON.parse(data));
    // })
})

app.listen(PORT, () => {
    console.log('server is running on port:${PORT}')
})


// Search through id
app.get("/Student/:id/id", (req, res) => {
    const id = req.params.id;
    const arrayindex = Student.findIndex(s => s.id == id);
    if (arrayindex < 0) {
        return res.status(404).send("data not found")
    }
    const data = Student[arrayindex];
    res.json(data);
})

// Search through branch

app.get("/Student/:branch/branch", (req, res) => {
    const branch = req.params.branch;
    console.log(branch)
    const data = Student.filter(s => s.branch == branch);
    if (data.length == 0) {
        return res.status(404).send("data not found")
    }
    res.json(data);

});

// app.post("/student/add", async (req, res) => {
//     const data = req.body;

//     const std = Student.find((s)=>s.id == data.id)
//     if(std){
//         return res.json("User exists")
//     }
//     Student.push(data)


//     // console.log(id, name, branch)
//     res.json(Student)
// })


app.post("/Student/register", (req, res)=>{
    const {name, branch} = req.body;
    if(!name || !branch){
        return res.status(400).send("Invalid student data");
    }

// read the file first
fs.readFile("Student.json", "utf-8", (err, data) => {
    if(err){
        return res.status(500).send("could not read students file");
    }
    // parse existing data or start with an empty array
    const students = JSON.parse(data || "[]");
    console.log("<<<<<>>>>>",typeof students);

     const newStudent = {
        id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
        name,
        branch,
     };
    students.push(newStudent);

    //write the whole array back to the file (overwriting)
    fs.writeFile("./Student.json", JSON.stringify(students, null, 2), (err) => {
        if(err){
            return res.status(500).send("error writing to students file");
            
        }
        // only send response after successfully writing to the file
        return res.status(201).json({message: "Student registered successfully", student: newStudent });
        res.json(students);
    });
});
});