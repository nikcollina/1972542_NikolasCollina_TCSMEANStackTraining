let obj = require("mongoose"); 
obj.Promise= global.Promise;      
let url = "mongodb://localhost:27017/meanstack";
const mongooseDbOption ={      
    useNewUrlParser: true,
    useUnifiedTopology: true
}
let fs = require("fs");
let records = new Array();

getRecords();
//console.log(records)

obj.connect(url, mongooseDbOption);
let db = obj.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => {

    let CallSchema = obj.Schema({
        _id: Number,
        source: String,
        destination: String,
        sourceLocation: String,
        destinationLocation: String,
        callDuration: String,
        roaming: String,
        callCharge: String
    });
    let Call = obj.model("", CallSchema, "Calls");

    Call.insertMany(records)
    .then(()=>{
        console.log("Records Inserted Successfully")
        obj.disconnect();
    })
    .catch((err)=>{
        console.log("Error: "+err)
        obj.disconnect();
})
})

function getRecords() {
    try {
        let data = fs.readFileSync("call_data.json");
        let jsonString = data.toString();
        let json = JSON.parse(jsonString);
        records = [];
        for (var i in json) {
            records.push(json[i]);
        }
        return;
    } catch (err) {
        console.log("Error: "+err);
        return;
    }
}
