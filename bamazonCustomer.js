var inquirer = require('inquirer');
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1Likeomlets',
    database: 'bamazon'
});


afterConnection();

function afterConnection() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Please input the product ID (1-11)",
                choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
                name: "productSearched"
            },
        
            {
                type: "input",
                message: "How many would you like?",
                name: "productCount",
            }
        ])
        .then(function (inquirerResponse) {


            var searchedInt = parseInt(inquirerResponse.productSearched);
            var countInt = parseInt(inquirerResponse.productCount);

            connection.query("SELECT * FROM products WHERE ?", { ID: searchedInt }, function (err, res) {
                if (err) throw err;


                if (isNaN(countInt)) {
                    console.log("You must enter a number.")
                    afterConnection();
                }
                else {
                    var specificProduct = res[0];

                    if (specificProduct.stock_quantity < countInt) {
                        console.log("There are not enough of that item.")
                        afterConnection();
                    }
                    else {
                        var updateQueryStr = "UPDATE products SET stock_quantity = " + (specificProduct.stock_quantity - countInt) + ' WHERE ID = ' + searchedInt;
                        connection.query(updateQueryStr, function (err, data) {
                            if (err) throw err;
                            console.log("The price for each " + (specificProduct.product_name) + " is $" + specificProduct.price);
                            console.log("Your total is $" + (specificProduct.price * countInt));
                            console.log("Thank you for shopping with us!");
                            connection.end();
                        })


                    }

                }
            });
        });
}

