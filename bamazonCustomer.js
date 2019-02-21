var inquirer = require('inquirer');
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1Likeomlets',
    database: 'bamazon'
});


connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {

        if (err) throw err;

        inquirer
            .prompt([
                // Here we create a basic text prompt.

                {
                    type: "list",
                    message: "Please input the product ID (1-11)",
                    choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
                    name: "productSearched"
                },
                // Here we ask the user to confirm.
                {
                    type: "input",
                    message: "How many would you like?",
                    name: "productCount",
                }
            ])
            .then(function (inquirerResponse) {
                var searchedInt = parseInt(inquirerResponse.productSearched);
                var countInt = parseInt(inquirerResponse.productCount);
                if (isNaN(countInt)) {
                    console.log("You must enter a number")
                    afterConnection();
                }
                else {
                    console.log("great job, keep going")



                    connection.end();
                }
            });
    });
}