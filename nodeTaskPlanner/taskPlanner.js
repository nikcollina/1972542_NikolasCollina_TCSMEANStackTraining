let http = require("http");
let url = require("url");
let fs = require("fs")
let port=9999;
// create array Task array 

let loginInfo = `
    <h1>Task Planner<h1/>
    <h2>Add Task<h2/>
    <form action="/store" method="get">
        <label>Emp Id</label>
        <input type="text" name="empId"/><br/>
        <label>Task Id</label>
        <input type="text" name="taskId"/><br/>
        <label>Task</label>
        <input type="text" name="task"/><br/>
        <label>Deadline</label>
        <input type="date" name="deadline"/><br/>
        <input type="submit" value="Add Task"/>
        <input type="reset" value="reset"/>
    </form>
    <h2>Delete Task</h2>
    <form action="/delete" method="get">
        <label>Task Id</label>
        <input type="text" name="taskId"/><br/>
        <input type="submit" value="Delete Task"/>
        <input type="reset" value="reset"/>
    </form>
    <h2>List Tasks</h2>
    <form action="/display" method="get">
        <input type="submit" value="List All Tasks"/>
    </form>
`
let tableHead = `
<table>
    <thead>
        <th>Emp Id</th>
        <th>Task Id</th>
        <th>Task</th>
        <th>Deadline</th>
    </thead>
`


let server = http.createServer((req,res)=> {
    console.log(req.url)
    res.setHeader("content-type","text/html");
    res.write(loginInfo);

    if(req.url != "/favicon.ico"){
        var pathInfo = url.parse(req.url,true).pathname;
        if(pathInfo=="/store"){
            console.log("here")
            let data = url.parse(req.url,true).query;
            let canAdd = true;
            let tasks = getTasks();
            for (var i in tasks){
                if (tasks[i].taskId == data.taskId){
                    canAdd = false;
                }
            }
            if (canAdd){
                console.log(canAdd)
            let task = makeJSON(data.empId,data.taskId,data.task,data.deadline);
            tasks.push(task)
            var tasksString = JSON.stringify(tasks);
            fs.writeFileSync("tasks.json",tasksString);
            }
        }else if(pathInfo=="/delete"){
            let data = url.parse(req.url,true).query;
            let tasks = getTasks();
            for (var i in tasks){
                if (tasks[i].taskId == data.taskId){
                    tasks.splice(i,1);
                }
            }
            console.log(tasks)
            var tasksString = JSON.stringify(tasks);
            fs.writeFileSync("tasks.json",tasksString);

        }else if(pathInfo=="/display"){
            let tasks = getTasks()
            let taskData = ``
            console.log(tasks)
            for (var i in tasks){
                taskData += `
                    <tr>
                        <td>${tasks[i].empId}</td>
                        <td>${tasks[i].taskId}</td>
                        <td>${tasks[i].task}</td>
                        <td>${tasks[i].deadline}</td>
                    </tr>
                `
            }
            res.write(tableHead)
            res.write(taskData)
            res.write(`</table>`)
        }
        res.end();
    }
    
});

server.listen(port,()=>console.log(`Server running on port number ${port}`));

function makeJSON(empId,taskId,task,deadline) {
    return {"empId":empId, "taskId":taskId,"task":task, "deadline":deadline};
}
function getTasks(){
    let tasks = new Array();
    try {
        let taskData = fs.readFileSync("tasks.json");
        let jsonString = taskData.toString();
        let json = JSON.parse(jsonString);
        tasks = [];
        for (var i in json){
            tasks.push(json[i]);
        }
        return tasks;
      } catch (error) {
        return tasks;
    }
}