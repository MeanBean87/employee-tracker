const inquirer = require("inquirer");
const pool = require("../dbUtils/connectDb");

const addDepartment = async () => {
  try {
    const questions = [
      {
        type: "input",
        name: "name",
        message: "What is the department's name?",
      },
    ];

    const answers = await inquirer.prompt(questions);

    await pool.query("INSERT INTO departments (name) VALUES (?)", [
      answers.name,
    ]);
    console.log("Successfully added department!");
  } catch (err) {
    console.error("Error occurred while fetching departments:", err);
  }
};

const addRole = async () => {
  try {
    const departmentsArray = [];
    const [departments] = await pool.query("SELECT * FROM departments");

    departments.forEach((department) => {
      departmentsArray.push({ name: department.name, id: department.id });
    });

    const questions = [
      {
        type: "input",
        name: "title",
        message: "What is the role's title?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the role's salary?",
      },
      {
        type: "list",
        name: "departmentName",
        message: "What is the role's department?",
        loop: false,
        choices: departmentsArray.map((department) => department.name),
      },
    ];

    const answers = await inquirer.prompt(questions);
    const selectedDepartment = departmentsArray.find(
      (department) => department.name === answers.departmentName
    );

    if (!selectedDepartment) {
      throw new Error("Selected department not found.");
    }

    await pool.query("INSERT INTO roles SET ?", {
      title: answers.title,
      salary: answers.salary,
      department_id: selectedDepartment.id,
    });
    console.log("Successfully added role!");
  } catch (err) {
    console.error("Error occurred while adding the role:", err);
  }
};

const addNewEmployee = async () => {
  try {
    const rolesArray = [];
    const [roles] = await pool.query("SELECT * FROM roles");

    roles.forEach((role) => {
      rolesArray.push({ name: role.title, id: role.id });
    });

    const managersArray = [];
    const [managers] = await pool.query(
      "SELECT * FROM employees WHERE manager_id IS NULL"
    );

    managers.forEach((employee) => {
      managersArray.push({
        name: `${employee.first_name} ${employee.last_name}`,
        id: employee.id,
      });
    });

    const questions = [
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "role_id",
        message: "What is the employee's role?",
        loop: false,
        choices: rolesArray.map((role) => role.name),
      },
      {
        type: "list",
        name: "manager_id",
        message: "Who is the employees manager?",
        loop: false,
        choices: managersArray.map((manager) => manager.name),
      },
    ];

    const answers = await inquirer.prompt(questions);
    const selectedRole = rolesArray.find(
      (role) => role.name === answers.role_id
    );

    const selectedManager = managersArray.find(
      (manager) => manager.name === answers.manager_id
    );

    await pool.query("INSERT INTO employees SET ?", {
      first_name: answers.first_name,
      last_name: answers.last_name,
      role_id: selectedRole.id,
      manager_id: selectedManager.id,
    });
    console.log("Successfully added new employee!");
  } catch (err) {
    console.error("Error occurred while adding the employee:", err);
  }
};

module.exports = { addDepartment, addRole, addNewEmployee };
