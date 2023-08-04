const inquirer = require("inquirer");
const pool = require("../dbUtils/connectDb");

const updateEmpRole = async () => {
  try {
    const employeesArray = [];
    const [employees] = await pool.query("SELECT * FROM employees");
    
    employees.forEach((employee) => {
      employeesArray.push({ name: `${employee.first_name} ${employee.last_name}`, id: employee.id });
    });

    const rolesArray = [];
    const [roles] = await pool.query("SELECT * FROM roles");

    roles.forEach((role) => {
      rolesArray.push({ name: role.title, id: role.id });
    });

    const questions = [
      {
        type: "list",
        name: "employee",
        message: "Which employee would you like to update?",
        loop: false,
        pageSize: 15,
        choices: employeesArray.map((employee) => employee.name),
      },
      {
        type: "list",
        name: "role",
        message: "What is the employee's new role?",
        loop: false,
        pageSize: 15,
        choices: rolesArray.map((role) => role.name),
      },
    ];

    const answers = await inquirer.prompt(questions);
    const selectedEmployee = employeesArray.find(
      (employee) => employee.name === answers.employee
    );

    const selectedRole = rolesArray.find(
      (role) => role.name === answers.role
    );

    await pool.query(
      "UPDATE employees SET role_id = ? WHERE id = ?",
      [selectedRole.id, selectedEmployee.id]);
    console.log("Successfully updated employee!");
  } catch (err) {
    console.error("Error occurred while updating the employee:", err);
  }
};

const updateEmpManager = async () => {
  try {
    const employeesArray = [];
    const [employees] = await pool.query("SELECT * FROM employees");

    employees.forEach((employee) => {
      employeesArray.push({ name: `${employee.first_name} ${employee.last_name}`, id: employee.id });
    });

    const managersArray = [];
    const [managers] = await pool.query("SELECT * FROM employees WHERE manager_id IS NULL");

    managers.forEach((employee) => {
      managersArray.push({ name: `${employee.first_name} ${employee.last_name}`, id: employee.id });
    });

    const questions = [
      {
        type: "list",
        name: "employee",
        message: "Which employee would you like to update?",
        loop: false,
        pageSize: 15,
        choices: employeesArray.map((employee) => employee.name),
      },
      {
        type: "list",
        name: "manager",
        message: "Who is the employee's new manager?",
        loop: false,
        pageSize: 15,
        choices: managersArray.map((manager) => manager.name),
      },
    ];

    const answers = await inquirer.prompt(questions);
    const selectedEmployee = employeesArray.find(
      (employee) => employee.name === answers.employee
    );

    const selectedManager = managersArray.find(
      (manager) => manager.name === answers.manager
    );

    await pool.query(
      "UPDATE employees SET manager_id = ? WHERE id = ?",
      [selectedManager.id, selectedEmployee.id]);
    console.log("Successfully updated employee!");
  } catch (err) {
    console.error("Error occurred while updating the employee:", err);
  }
};

module.exports = { updateEmpRole, updateEmpManager };
