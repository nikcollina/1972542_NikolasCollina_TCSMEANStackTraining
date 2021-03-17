var blogsData = [];

function addBlog(){
    var blogData = readFormData();
    insertNewBlog(blogData);
    insertGrid(blogData)
    clear();
    blogsData.push(blogData);
    storeInSession();
}

function storeInSession() {
    sessionStorage.setItem("blogsInfo", JSON.stringify(blogsData));
}

function retrieveFromSession() {
    var blogsData = JSON.parse(sessionStorage.getItem("blogsInfo"));
    if (blogsData) {
        blogsData.forEach(blog => {
            insertNewBlog(blog);
        });
    }
}


function readFormData() {
    var blogData = {}
    blogData.title = document.getElementById("title").value
    blogData.desc = document.getElementById("desc").value;
    if (document.getElementById("imageId").files[0]) {
    blogData.imageInfo = document.getElementById("imageId").files[0].name;
    }
    else {
        blogData.imageInfo = ""
    }
    return blogData;
}

function insertNewBlog(blogData){
    var table = document.getElementById("blogs");
    var tableBody = table.getElementsByTagName("tbody")[0];
    var newRow = tableBody.insertRow(tableBody.length);
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML="<h2>"+blogData.title+"</h2>";
    newRow = tableBody.insertRow(tableBody.length);
    var cell2 =newRow.insertCell(0);
    cell2.innerHTML= blogData.desc;
    if (blogData.imageInfo) {
    newRow = tableBody.insertRow(tableBody.length);
    var cell3 = newRow.insertCell(0);
    cell3.innerHTML="<img src='" + blogData.imageInfo +"' alt='blog image'>";
    }
}

function insertGrid(blogdata){
    var last = document.getElementById("lastRow")
    console.log(last)
}

function clear(){
    document.getElementById("title").value="";
    document.getElementById("desc").value="";
    document.getElementById("imageId").value="";
}
