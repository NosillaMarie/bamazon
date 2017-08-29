var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");


var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "bamazon"
});


connection.connect(function (err) {
    if (err) throw err

    console.log("Connected as ID: " + connection.threadId);
});


function readProducts() {
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
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].sale_price, res[i].available_quantity
                       ]);
        }
        console.log(table.toString());

        inquirer.prompt([{
                name: "item",
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
                var query = "SELECT available_quantity FROM products WHERE ?"
                var selectedItem;

                for (var i = 0; i < res.length; i++) {
                    if (res[i].item_id === answer.item) {
                        selectedItem = res[i];
                        console.log(res[i]);
                    }
                }

                if (selectedItem.available_quantity > parseInt(answer.quantity)) {

                    connection.query(
                        "UPDATE products SET ? WHERE ?", [
                            {
                                available_quantity: ((selectedItem.available_quantity) - (parseInt(answer.quantity)))
                                                }, {
                                item_id: selectedItem.item_id
                                                }
                                            ],
                        function (err) {
                            if (err) {
                                throw err
                            };
                            console.log("Your total is: $");

                            readProducts();
                        }
                    );
                } else {
                    console.log("Order qty exceeds available qty please select a number <= :" + selectedItem.avaiaible_quantity);

                    readProducts();
                }
            })
    });
}
readProducts();
