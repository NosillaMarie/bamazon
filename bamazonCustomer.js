var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
var prompt = require("prompt");

var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "bamazon"
});

var itemPurchased = [];

connection.connect(function (err) {
    if (err) {
        throw err
    };
    console.log("Connected as ID: " + connection.threadId);
});
var readProducts = function () {
    console.log('Displaying all Products Available...\n');
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) {
            throw err
        };

        var table = new Table({
            head: [
                "Item ID",
                "Product Name",
                "Department",
                "Price",
                "Quantity Available"
            ]
        });
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].sale_price, res[i].availible_quantity
                       ]);
        }
        console.log(table.toString());

        inquirer.prompt([{
                name: "internal_id",
                type: "input",
                message: "What is the ID of the product you would like to purchase?",

                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        return false;
                    }
                }
    }, {
                name: "quantity",
                type: "input",
                message: "Enter the quantity you would like to purchase: ",

                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        return false;
                    }
                }
    }])
            .then(function (answer) {
                var selectedItem = answer.internal_id;
                var purchaseQuantity = answer.quantity;
                purchase(selectedItem, purchaseQuantity);
            });
    });
}

function purchase(ID, quantityNeeded) {
    connection.query("SELECT * FROM products WHERE item_id = " + ID, function (err, res) {
        if (err) throw err;

        if (quantityNeeded <= res[0].availible_quantity) {
            var total = res[0].price * quantityNeeded;

            console.log("Your total is $" + total + ". Thank you, come again!");

            connection.query("UPDATE products SET availible_quantity = availible_quantity -" + quantityNeeded + "WHERE item_id = " + ID);
        } else {
            console.log("Quantity on hand does not meet your needs!");
        };
        readProducts();
    })
}

readProducts();