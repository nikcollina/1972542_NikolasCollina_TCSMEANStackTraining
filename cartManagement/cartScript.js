var cart = [];
var total = 0;
var Product = /** @class */ (function () {
    function Product(name, price, imageLink, quantity) {
        if (quantity === void 0) { quantity = 1; }
        this.name = name;
        this.price = price;
        this.imageLink = imageLink;
        this.quantity = quantity;
    }
    Product.prototype.getName = function () {
        //console.log(this.name)
        return this.name;
    };
    Product.prototype.getPrice = function () {
        console.log(this.price);
        return this.price;
    };
    Product.prototype.getImage = function () {
        console.log(this.imageLink);
        return this.imageLink;
    };
    return Product;
}());
var ps5Console = new Product("Playstation 5", 499.99, "https://images-na.ssl-images-amazon.com/images/I/619BkvKW35L._SX342_.jpg");
var xboxConsole = new Product("Xbox Series X", 499.99, "https://compass-ssl.xbox.com/assets/f0/85/f085c120-d3d5-4424-8b70-eb25deaa326e.png?n=XBX_A-BuyBoxBGImage01-D.png");
var switchConsole = new Product("Nintendo Switch", 299.99, "https://www.nintendo.com/content/dam/noa/en_US/images/switch/system/three-modes-in-one.png");
var ps5Controller = new Product("Dualsense Controller", 69.99, "https://i5.walmartimages.com/asr/c4ced5e4-6dd2-44d4-b8cf-795336f18864.b36f9bb71bcf08d98fd96c6d656da5d5.png");
var xboxController = new Product("Xbox Series X Controller", 59.99, "https://media.gamestop.com/i/gamestop/11108954/Microsoft-Xbox-Series-X-Carbon-Black-Wireless-Controller?$pdp$");
var switchController = new Product("Joycon", 79.99, "https://cdn.geekwire.com/wp-content/uploads/2020/11/switch-joycon-630x391.png");
function addToCart(product) {
    if (cart.some(function (p) { return p.name === product.getName(); })) {
        cart.forEach(function (p) {
            if (p.name === product.getName()) {
                p.quantity += 1;
            }
        });
    }
    else {
        cart.push(product);
    }
    console.log(cart);
    getCartCount();
}
function removeFromCart(product) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name == product.getName()) {
            cart[i].quantity = 1;
            cart.splice(i, 1);
        }
    }
    console.log(cart);
    getCartCount();
}
function storeSession() {
    sessionStorage.setItem("cart", JSON.stringify(cart));
    console.log("stored");
}
function retrieveSession() {
    cart = JSON.parse(sessionStorage.getItem("cart"));
    if (cart == null) {
        cart = [];
    }
    //console.log(cart)
}
function getCartCount() {
    var cartItems = document.getElementById("cartItemNumber");
    if (cartItems) {
        cartItems.innerHTML = "Items in cart: " + itemsInCart();
    }
}
function loadCart() {
    if (cart) {
        cart.forEach(function (product) {
            displayProduct(product);
        });
    }
    var table = document.getElementById("cart");
    var tableBody = table.getElementsByTagName("tbody")[0];
    var newRow = tableBody.insertRow(-1);
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = "Total:";
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = "$" + total.toFixed(2);
    var cell3 = newRow.insertCell(1);
    var cell4 = newRow.insertCell(1);
    var cell5 = newRow.insertCell(1);
}
function displayProduct(product) {
    /*console.log(product.name)*/
    var table = document.getElementById("cart");
    var tableBody = table.getElementsByTagName("tbody")[0];
    var newRow = tableBody.insertRow(-1);
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = product.name;
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = "<img src='" + product.imageLink + "' alt='blog image' class='cartImage'>";
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = "$" + product.price;
    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = product.quantity;
    var cell5 = newRow.insertCell(4);
    cell5.innerHTML = "$" + (product.quantity * product.price).toFixed(2);
    total += product.quantity * product.price;
}
function itemsInCart() {
    var num = 0;
    cart.forEach(function (p) {
        num += p.quantity;
    });
    return num;
}
