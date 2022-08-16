//Import required packages
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const chalk = require('chalk');

//Set connection to database
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MyNewPass",
  database:"employee_db"
});

//Check if connection established
con.connect(function(err) {
    if (err) throw err;
    console.log();
    console.log(chalk.cyan("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));
    console.log(chalk.cyan("                       EMPLOYEE TRACKER                     "));
    console.log(chalk.cyan("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"))
    console.log();
    empprompt();
});
