const express = require("express")

const app = express();

const PORT =8000;

const Student=[
    {id:2,name:"raj", branch: "cse"},
    {id:4,name:"Kishan", branch: "ec"},
    {id:3,name:"Kashyap", branch: "dep"},
    {id:7,name:"Rohit", branch: "cld"},
    {id:8,name:"kunal", branch: "dep"}


];


app.get("/",(req, res)=>{
    res.send("<h1>wellcome to home page</h1>")
})

app.get("/Student",(req, res)=>{
   res.json(Student);
})

app.listen(PORT, ()=>{
    console.log('server is running on port:${PORT}')
})


// Search through id
app.get("/Student/:id/id", (req, res)=>{
    const id = req.params.id;
    const arrayindex = Student.findIndex(s=>s.id==id);
    if (arrayindex<0){
        return res.status(404).send("data not found")
    }
    const data =Student[arrayindex];
    res.json(data);
})

// Search through branch

app.get("/Student/:branch/branch", (req, res)=>{
    const branch = req.params.branch;
    console.log(branch)
    const data = Student.filter(s=>s.branch==branch);
    if (data<0){
        return res.status(404).send("data not found")
    }
    res.json(data);
    
})