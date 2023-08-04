const inquirer = require("inquirer");
const pool = require("./app/dbUtils/connectDb");

const {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  viewEmployeesByManager,
  viewEmployeesByDepartment,
  generateLaborCostReport,
} = require("./app/crudHandlers/readQueries");

const {
  addDepartment,
  addRole,
  addNewEmployee,
} = require("./app/crudHandlers/createQueries");

const {
  updateEmpRole,
  updateEmpManager,
} = require("./app/crudHandlers/updateQueries");

const {
  deleteDepartments,
  deleteRoles,
  deleteEmployees,
} = require("./app/crudHandlers/deleteQueries");


const showMenu = async () => {
  const menu = [
    {
      type: "list",
      name: "menu",
      message: "What would you like to do?",
      loop: false,
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "View Employees By Manager",
        "View Employees By Department",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "Delete Department",
        "Delete Role",
        "Delete Employee",
        "Show labor cost by department",
        "Exit",
      ],
    },
  ];

  try {
    const answers = await inquirer.prompt(menu);
    switch (answers.menu) {
      case "View All Departments":
        await viewAllDepartments();
        break;
      case "View All Roles":
        await viewAllRoles();
        break;
      case "View All Employees":
        await viewAllEmployees();
        break;
      case "View Employees By Manager":
        await viewEmployeesByManager();
        break;
      case "View Employees By Department":
        await viewEmployeesByDepartment();
        break;
      case "Add Department":
        await addDepartment();
        break;
      case "Add Role":
        await addRole();
        break;
      case "Add Employee":
        await addNewEmployee();
        break;
      case "Update Employee Role":
        await updateEmpRole();
        break;
      case "Update Employee Manager":
        await updateEmpManager();
        break;
      case "Delete Department":
        await deleteDepartments();
        break;
      case "Delete Role":
        await deleteRoles();
        break;
      case "Delete Employee":
        await deleteEmployees();
        break;
      case "Show labor cost by department":
        await generateLaborCostReport();
        break;
      case "Exit":
        try {
          process.stdout.write("\x1Bc");
          await pool.end();
          console.log("Goodbye!");
          process.exit();
        } catch (error) {
          console.error("Error closing the database connection:", error);
        }
    }
  } catch (error) {
    console.error("Error showing menu:", error);
  } finally {
    await promptUser();
  }
};

const promptUser = async () => {
  const questions = [
    {
      type: "list",
      name: "name",
      message: "What would you like to do?",
      choices: ["Return to Main Menu", "Exit"],
    },
  ];
  const answers = await inquirer.prompt(questions);
  switch (answers.name) {
    case "Return to Main Menu":
      init();
      break;
    case "Exit":
      console.log("Goodbye!");
      pool.end();
      process.exit();
  }
};

const init = async () => {
  process.stdout.write("\x1B[2J\x1B[0f");
  console.log(
    "                                                                                                                                                "
  );
  console.log(
    "███████ ███    ███ ██████  ██       ██████  ██    ██ ███████ ███████      █████  ███    ██  █████  ██      ██    ██ ███████ ███████ ██████      "
  );
  console.log(
    "██      ████  ████ ██   ██ ██      ██    ██  ██  ██  ██      ██          ██   ██ ████   ██ ██   ██ ██       ██  ██  ██      ██      ██   ██     "
  );
  console.log(
    "█████   ██ ████ ██ ██████  ██      ██    ██   ████   █████   █████       ███████ ██ ██  ██ ███████ ██        ████   ███████ █████   ██████      "
  );
  console.log(
    "██      ██  ██  ██ ██      ██      ██    ██    ██    ██      ██          ██   ██ ██  ██ ██ ██   ██ ██         ██         ██ ██      ██   ██     "
  );
  console.log(
    "███████ ██      ██ ██      ███████  ██████     ██    ███████ ███████     ██   ██ ██   ████ ██   ██ ███████    ██    ███████ ███████ ██   ██     "
  );
  console.log(
    "                                                                                                                                                "
  );
  showMenu();
};

init();
