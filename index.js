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

//Start prompts
function empprompt(){
    inquirer.prompt([
    {
        type :"list",
        message :"What would you like to do?",
        name : "choices",
        choices: ['View all departments',
                 'View all roles',
                 'View all Employees',
                 'Add a department',
                 'Add a role',
                 'Add an employee',
                 'Update an employee role',
                 'Exit']
    }
    ]).then(function(res)
    {
        switch (res.choices)
        {
            case "View all departments" :
                viewAllDepartments();
                break;

            case "View all roles" :
                viewAllRoles();
                break;

            case "View all Employees" :
                viewAllEmployee();
                break;

            case "Add a department" :
                addDepartment();
                break;

            case "Add a role" :
                addRole();
                break;

            case "Add an employee" :
                addEmployee();
                break;

            case "Update an employee role" :
                updateEmployeeRole();
                break;

            case "Exit" :
                 con.end();
                 break;
            
        }

    });
};
