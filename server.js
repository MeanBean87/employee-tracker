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
  addEmployee,
} = require("./app/crudHandlers/createQueries");

const showMenu = async () => {
  const menu = [
    {
      type: "list",
      name: "menu",
      message: "What would you like to do?",
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
        "Show labor cost by deparment",
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
        await addEmployee();
        break;
      case "Update Employee Role":
        await updateEmployee();
        break;
      case "Update Employee Manager":
        await updateEmployeeManager();
        break;
      case "Delete Department":
        await deleteDepartment();
        break;
      case "Delete Role":
        await deleteRole();
        break;
      case "Delete Employee":
        await deleteEmployee();
        break;
      case "Show labor cost by deparment":
        await generateLaborCostReport();
        break;
      case "Exit":
        console.log("Goodbye!");
        pool.end((err) => {
          if (err) {
            console.error("Error closing the database connection:", err);
          }
          process.stdout.write("\x1Bc");
        });
        process.exit();
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
