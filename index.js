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

//View all departments
function viewAllDepartments()
{   
    con.query(
        'SELECT * FROM department',
        function(err, results) {
            if (err) throw err;
            console.log("");
            console.log("--------------------------------");
            console.table(chalk.yellow("       All Departments"),results); // results contains rows returned by server
            console.log("");
            empprompt();
        });
};


//View all roles
function viewAllRoles()
{   
    con.query("select role.id AS role_id,role.title AS job_title,role.salary,department.name as dept_name from role join department on role.department_id = department.id;",
        function(err, results) {
            if (err) throw err;
            console.log("");
            console.log("--------------------------------------------------");
            console.table(chalk.yellow("        All Roles"),results); // results contains rows returned by server
            console.log("");
            empprompt();
        });
};



//View all employees
function viewAllEmployee()
{
    con.query("Select em.id AS emp_id, em.first_name, em.last_name, role.title as job_title, role.salary, department.name as dept_name, CONCAT(ep.first_name, ' ' ,ep.last_name) AS Manager from employee AS em\
    join role on role.id = em.role_id\
    join department on department.id = role.department_id\
    left join employee AS ep on em.manager_id = ep.id\
    order by em.id;",
        function(err, results){
            if (err) throw err;
            console.log("");
            console.log("------------------------------------------------------------------------------------------");
            console.table(chalk.yellow("     All employees by job title,salary,dept and manager"),results);
            console.log("");
            empprompt();
        });
};

//Add a new department
function addDepartment()
{   
    inquirer.prompt([
    {
        type :"input",
        message :"Please enter department name: ",
        name : "dept_name",
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('Please enter department name!');
              return false;
            }
          }
    }
    ]).then(function(res) {
        con.query("INSERT INTO department SET ?",
        {
            name : res.dept_name
        },    
        function (err, result) {
            if (err) throw err;
            console.log("");
            console.log("----------------------------------------------------");
            console.log(chalk.yellow("     Number of records inserted: ") + result.affectedRows);
            console.log("-----------------------------------------------------");
            console.log("");
            empprompt();
          });
    });
   
};