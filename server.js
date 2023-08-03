const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table"); 
const menu = require("./app/questions/menu.js");
const { dbConfigCRUD } = require("./app/config/dbConfig");

const pool = mysql.createPool(dbConfigCRUD); 




switch (answers.menu) {
    case "View All Departments":
        viewAllDepartments();
        showMenu();
    case "View All Roles":
        viewAllRoles();
        showMenu();
    case "View All Employees":
        viewAllEmployees();
        showMenu();
    case "Add Employee":
        addEmployee();
        showMenu();
    case "Add Role":
        addRole();
        showMenu();
    case "Add Department":
        addDepartment();
        showMenu();
    case "Update Employee":
        updateEmployee();
        showMenu();
    case "Exit":
        console.log("Goodbye!");
        process.exit();
}
    








const showMenu = async () => {
    console.log("Welcome to the Employee Tracker!");
    await inquirer.prompt(menu).then((answers) => {
        console.log(answers);
    });
    showMenu();
};


const init = async () => {
    showMenu();
};



init();
