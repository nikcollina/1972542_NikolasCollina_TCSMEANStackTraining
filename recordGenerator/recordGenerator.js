let obj = require("readline-sync");
let fs = require("fs");
let entries = new Array();
let addEntries = true;

function addEntry(){
    debugger;
    getPreviousEntries();
    let fname = obj.question("Enter first name: ");
    let lname = obj.question("Enter last name: ");
    let gender = obj.question("Enter gender: ");
    let email = obj.question("Enter email: ");
    let dateObj = new Date();
    let json = makeJSON(fname,lname,gender,email,dateObj);
    entries.push(json)
    let jsonData = JSON.stringify(entries)
    fs.writeFileSync("logRecords.json", jsonData);
    console.log('Record Successfully Added');
    //console.log(json.date);
    //console.log(json.time);
}

function makeJSON(fname,lname,gender,email,dateObj) {
    debugger;
    let date = (dateObj.getMonth()+1)+"-"+dateObj.getDate()+"-"+dateObj.getFullYear();
    let time = dateObj.getHours()+":"+dateObj.getMinutes();
    return {"fname":fname, "lname":lname,"email":email, "date":date, "time":time};
}

function getPreviousEntries(){
    try {
        debugger;
        let data = fs.readFileSync("logRecords.json");
        let jsonString = data.toString();
        let json = JSON.parse(jsonString);
        //console.log(json);
        entries = [];
        for (var i in json){
            debugger;
            entries.push(json[i]);
        }
        return;
        
      } catch (error) {
          debugger;
          // no records yet
          return;
    }
    
}


function addMultipleEntries(){
    debugger;
    addEntries = true;
    while (addEntries) {
        debugger;
        addEntry()
        addEntries = addAnother()
    }
}

function addAnother() {
    while (true) {
        let add = obj.question("Would you like to add another entry(y/n): ");
        if (add == "y"){
            return true;
        }
        else if (add == "n"){
            return false;
        }
    }
}

function clearRecord(){
    fs.writeFileSync("logRecords.json", "[]");
}

module.exports={addEntry,addMultipleEntries, clearRecord}