// Imports
let port = 9090;
let app = require("express")();
let bodyParser = require("body-parser");
let obj = require("mongoose"); 
obj.Promise= global.Promise;      
let url = "mongodb://localhost:27017/meanstack";
const mongooseDbOption ={      
    useNewUrlParser: true,
    useUnifiedTopology: true
}
let fs = require("fs");
app.use(bodyParser.urlencoded({extended:true}));


// Get Requests
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})
app.get("/addCourse",(req,res)=>{
    res.sendFile(__dirname+"/addCourse.html");
})
app.get("/updateCourse",(req,res)=>{
    res.sendFile(__dirname+"/updateCourse.html");
})
app.get("/deleteCourse",(req,res)=>{
    res.sendFile(__dirname+"/deleteCourse.html");
})
app.get("/fetchCourses", (req, res) => {
    courseData = ``;
    obj.connect(url, mongooseDbOption); 
    let db = obj.connection;    
    db.on("error", (err) => console.log(err));
    db.once("open", () => {
        Course.find({}, (err, result) => {
            if (!err) {
                result.forEach(course => {
                    courseData+=`
                    <tr>
                        <td>${course._id}</td>
                        <td>${course.name}</td>
                        <td>${course.desc}</td>
                        <td>${course.amount}</td>
                    </tr>
                    `;
                })
            }
            obj.disconnect();
        }).then(()=>{
            res.write(courseTableHead);
            res.write(courseData);
            res.write(courseTableEnd);
            res.end();
        })
        .catch((err)=>{
            console.log("Error: "+err)
        })
    })
})


//Post Requests
app.post("/addCourse", (req, res) => {
    obj.connect(url, mongooseDbOption);
    let db = obj.connection;
    db.on("error", (err) => console.log(err));
    db.once("open", () => {
        let course = new Course({ _id: req.body.id, name: req.body.name, desc: req.body.desc, amount: req.body.amount });
        course.save((err, result) => {
            if (!err) {
                console.log("class added successfully" + result)
            } else {
                console.log(err);
            }
            obj.disconnect();
        })
    })
    console.log("here")
    res.sendFile(__dirname + "/addCourse.html");
})
app.post("/deleteCourse", (req, res) => {
    obj.connect(url, mongooseDbOption);
    let db = obj.connection;
    db.on("error", (err) => console.log(err));
    db.once("open", () => {
        Course.deleteOne({ _id: req.body.id }, (err, result) => {
            if (!err) {
                if (result.deletedCount > 0) {
                    console.log("Record deleted ");
                } else {
                    console.log("Record not present");
                }
            }
            obj.disconnect();
        })
    })
    res.sendFile(__dirname + "/deleteCourse.html");
})
app.post("/updateCourse", (req, res) => {
    obj.connect(url, mongooseDbOption);
    let db = obj.connection;
    db.on("error", (err) => console.log(err));
    db.once("open", () => {
        Course.updateOne({_id:{$eq:req.body.id}},{$set:{amount:req.body.amount}},(err,result) => {
            if (!err) {
                if (result.nModified > 0) {
                    console.log("Record updated ");
                } else {
                    console.log("Record didn't update");
                }
            }
            else {
                console.log("Error: "+err);
            }
            obj.disconnect();
        })
    })
    res.sendFile(__dirname + "/updateCourse.html");
})



// Run app
app.listen(port,()=>console.log(`Running on Port ${port}`));


// Local Vars
let CourseSchema = obj.Schema({
    _id: Number,
    name: String,
    desc: String,
    amount: String
});
let Course = obj.model("", CourseSchema, "Courses");

let courseTableHead = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>List of Courses</title>
</head>
<body>
    <div>
        <h1>List of Courses</h1>
        
    </div>
    <div>
        <table>
            <thead>
                <th>Id</th>
                <th>Course Name</th>
                <th>Course Description</th>
                <th>Amount</th>
            </thead>
`;
let courseData = ``;
let courseTableEnd = `
</table>
    </div>
    <div>
        <a href="/">Back</a>
    </div>
</body>
</html>
`;