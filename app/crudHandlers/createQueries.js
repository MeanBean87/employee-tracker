const inquirer = require("inquirer");
const pool = require("../dbUtils/connectDb");
const consoleTable = require("console.table");

const addDepartment = async () => {
  const questions = [
    {
      type: "input",
      name: "name",
      message: "What is the department's name?",
    },
  ];

  const answers = await inquirer.prompt(questions);

  pool.query(
    "INSERT INTO departments (name) VALUES (?)",
    [answers.name],
    (err, res) => {
      if (err) throw err;
      console.log("Successfully added department!");
    }
  );
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

const addNewEmployee = () => {
  pool.query("SELECT id from roles", (err, res) => {
    if (err) {
      console.error("Error occurred while fetching roles:", err);
      return;
    }

    const roles = res.map((role) => role.id);

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
        choices: roles,
      },
    ];

    inquirer.prompt(questions).then((answers) => {
      pool.query("INSERT INTO employees SET ?", answers, (err, res) => {
        if (err) throw err;
        console.log("Successfully added employee!");
        returnPrompt;
      });
    });
  });
};

module.exports = { addDepartment, addRole, addNewEmployee };
