var budgetObject = [];

function onAdd() {
    var data = readFormData();
    var existingBudget = sessionStorage.getItem("budgetInfo")
    if (existingBudget) {
        budgetObject = JSON.parse(existingBudget)
    }
    budgetObject.push(data);     
    resetData();
    storeBudget()
}

function readFormData() {
    var budgetObject = {}
    budgetObject.clientName = document.getElementById("clientName").value;
    budgetObject.projectName = document.getElementById("projectName").value;
    budgetObject.budget = document.getElementById("budget").value;
    return budgetObject; 
}

function resetData() {
   document.getElementById("clientName").value="";
   document.getElementById("projectName").value="";
   document.getElementById("budget").value="";
}
   

function storeBudget() {
    var budgetString = JSON.stringify(budgetObject)
    sessionStorage.setItem("budgetInfo",budgetString)
}

function retrieveBudget() {
    var obj = sessionStorage.getItem("budgetInfo")
    var budgetObject = JSON.parse(obj)
    var table = document.getElementById("budgetList")
    var body = table.getElementsByTagName("tbody")[0];
    var total = 0
    budgetObject.forEach(element => {
        addRow(element.clientName,element.projectName,element.budget,body)
        total += parseInt(element.budget,10)
    });
    addRow("","Total:",total,body)
}

function addRow(element1,element2,element3,body) {
    var newRow = body.insertRow(body.length);

    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = element1;

    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = element2;

    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = "$"+element3;
}