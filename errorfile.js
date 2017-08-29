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
    shop();
});


var shop = function () {
    var productsChosen = {
        properties: {
            item_ID: ('Please enter the Item ID of the product you would like to purchase: '),
            quantity: ('Please enter a quantity for how many you would like to purchase: ')
        },
    };
    prompt.start();

    prompt.get(productsChosen, function (err, res) {
        var customerPicked = {
            item_ID: res.item_ID,
            quantity: res.quantity
        };
        itemPurchased.push(customerPicked);

        connection.query('SELECT * FROM products WHERE item_ID=?', itemPurchased[0].item_id, function (err, res) {
            if (res[0].availible_quantity >= itemPurchased[0].quantity) {
                console.log('');
                console.log(itemPurchased[0].quantity + ' items purchased');

                console.log(res[0].product_name + ' ' + res[0].sale_price);

                var total = res[0].sale_price * itemPurchased[0].quantity;


                console.log('Total: ' + total);

                updatedQuantity = res[0].availible_quantity - itemPurchased[0].quantity;

                connection.query('UPDATE products SET availible_quantity =' + updatedQuantity + " WHERE item_ID = " + itemPurchased[0].item_ID, function (err, res) {
                    if (err) {
                        throw err
                    };
                    console.log('Thank you for your order.  Please allow 3 - 7 business days for delivery!');

                    connection.end();
                })
            }
        })
    })
}