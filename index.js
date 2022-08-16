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

//Select department to add role

function selectDepartment()
{
    const deptname = [];
    con.query("select * from department;",
        function(err, results) {
            if (err) throw err;
            for(let i=0;i<results.length;i++)
            {
                deptname.push(results[i].name);
            }
            
        })
    return deptname;
};

//Add new role
function addRole()
{
    inquirer.prompt([
        {
            type :"input",
            message :"Please enter role title: ",
            name : "role_title",
            validate: titleInput => {
                if (titleInput) {
                  return true;
                } else {
                  console.log('Please enter role title!');
                  return false;
                }
              }
        },
        {
            type :"input",
            message :"Please enter role salary: ",
            name : "role_salary",
            validate: salaryInput => {
                if (salaryInput) {
                  return true;
                } else {
                  console.log('Please enter role salary!');
                  return false;
                }
              }
        },
        {
            type : "list",
            message: "Please select department",
            name :"dept",
            choices: selectDepartment()
        }
    ]).then(function(res){
        var sq = "select id from department where name = " + mysql.escape(res.dept);
        con.query(sq, function (err, result) {
            if (err) throw err;
            //console.log(result);         

            con.query("INSERT INTO role SET ?",
            {
                title :res.role_title,
                salary :res.role_salary,
                department_id:result[0].id
            },
            function (err, result) {
                if (err) throw err;
                console.log("");
                console.log("----------------------------------------------------");
                console.log(chalk.yellow("     Number of records inserted: ") + result.affectedRows);
                console.log("----------------------------------------------------");
                console.log("");
                empprompt();
            });
    });
        
    });
};

//Select roles
function selectEmpRole()
{
    const rolename = [];
    con.query("select * from role;",
        function(err, results) {
            if (err) throw err;
            for(let i=0;i<results.length;i++)
            {
                rolename.push(results[i].title);
            }
            
        })
    return rolename;
};

//Select manager
function selectManager()
{
    const managername = ['none'];
    con.query("select * from employee;",
        function(err, results) {
            if (err) throw err;
            for(let i=0;i<results.length;i++)
            {
                let empname = results[i].first_name+' '+results[i].last_name;
                managername.push(empname);
            }
            
        })
    return managername;
};


//Add new employee
function addEmployee()
{
    inquirer.prompt([
        {
            type :"input",
            message :"Please enter first name: ",
            name : "firstname",
            validate: firstInput => {
                if (firstInput) {
                  return true;
                } else {
                  console.log('Please enter first name!');
                  return false;
                }
              }
        },
        {
            type :"input",
            message :"Please enter last name: ",
            name : "lastname",
            validate: lastInput => {
                if (lastInput) {
                  return true;
                } else {
                  console.log('Please enter last name!');
                  return false;
                }
              }
        },
        {
            type : "list",
            message: "Please select employee role: ",
            name :"emprole",
            choices: selectEmpRole()
        },
        {
            type : "list",
            message : "Please select employee manager: ",
            name : "empmanager",
            choices : selectManager()
        }

        ]).then(function(res){
            var roleid;
            var mgrid;
            var sq = "select id from role where title = " + mysql.escape(res.emprole); 
            con.query(sq, function (err, result) {
                if (err) throw err;
                roleid = result[0].id;
               // console.log(roleid);
               
                if(res.empmanager !=='none')
                {
                    var sqmg = "select id from employee where CONCAT(first_name,' ',last_name) = " + mysql.escape(res.empmanager); 
                        con.query(sqmg, function (err, result) {
                            if (err) throw err;
                            mgrid = result[0].id;
                           // console.log(mgrid);
                            con.query("INSERT INTO employee SET ?",
                            {
                                first_name :res.firstname,
                                last_name :res.lastname,
                                role_id:roleid,
                                manager_id : mgrid
                            },
                            function (err, result) {
                                if (err) throw err;
                                console.log("");
                                console.log("----------------------------------------------------");
                                console.log(chalk.yellow("     Number of records inserted: ")+ result.affectedRows);
                                console.log("----------------------------------------------------");
                                console.log("");
                                empprompt();
                            });
                        });
                }
                else
                {   mgrid = null;
                    con.query("INSERT INTO employee SET ?",
                    {
                        first_name :res.firstname,
                        last_name :res.lastname,
                        role_id :roleid,
                        manager_id : mgrid
                    },
                    function (err, result) {
                        if (err) throw err;
                        console.log("");
                        console.log("----------------------------------------------------");
                        console.log(chalk.yellow("     Number of records inserted: ") + result.affectedRows);
                        console.log("----------------------------------------------------");
                        console.log("");
                        empprompt();
                    });
                }
                });
                       
        });     
           
};
