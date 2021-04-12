let app = require("express")();
let http = require("http").Server(app);   // to load the library we have run port number using hhtp module 
let io = require("socket.io")(http);
let port = 9999;

app.get("/",(req,res)=> {
    res.sendFile(__dirname+"/index.html");
})

io.on("connection",(socket)=> {
    console.log("Client Connected to Message Application...");
    socket.on("name",(name)=> {
        console.log("Hello "+name+",");
    })
    socket.on("message",(msg)=> {
        console.log("Your Message: "+msg)
    })
})
http.listen(port,()=>console.log(`Server Running on Port ${port}`));