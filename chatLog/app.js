let app = require("express")();
let http = require("http").Server(app);   
let io = require("socket.io")(http);
let port = 9999;
let obj = require("mongoose");  
obj.Promise= global.Promise;      
let url = "mongodb://localhost:27017/meanstack";
const mongooseDbOption ={      
    useNewUrlParser: true,
    useUnifiedTopology: true
}


app.get("/",(req,res)=> {
    res.sendFile(__dirname+"/index.html");
})

io.on("connection",(socket)=> {
    console.log("Client Connected to Message Application...");
    socket.on("message",(msg)=>{
        obj.connect(url,mongooseDbOption);
        let message = new Message({name:msg.name,message:msg.message});
        console.log(message)
        message.save((err,result)=>{
            if(!err){
                console.log("message saved "+result)
            }else {
                console.log(err);
            }
            obj.disconnect(); 
        })

    })
    
})
http.listen(port,()=>console.log(`Server Running on Port ${port}`));

let MessageSchema = obj.Schema({
    name:String,
    message:String
});

let Message = obj.model("",MessageSchema,"Messages");
