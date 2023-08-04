const consoleTable = require("console.table");

const pool = require("../dbUtils/connectDb");

const viewAllDepartments = async () => {
  try {
    const [departments] = await pool.query("SELECT * FROM departments");
    process.stdout.write("\x1B[2J\x1B[0f");
    const table = consoleTable.getTable(departments);
    console.log(table);
    console.log("\nPress Up/Down Arrow to return to main menu");
  } catch (err) {
    console.error("Error occurred while fetching departments:", err);
  }
};

const viewAllRoles = async () => {
  try {
    const [roles] = await pool.query("SELECT * FROM roles");
    process.stdout.write("\x1B[2J\x1B[0f");
    const table = consoleTable.getTable(roles);
    console.log(table);
    console.log("\nPress Up/Down Arrow to return to main menu");
  } catch (err) {
    console.error("Error occurred while fetching roles:", err);
  }
};

const viewAllEmployees = async () => {
  try {
    const [employees] = await pool.query("SELECT * FROM employees");
    process.stdout.write("\x1B[2J\x1B[0f");
    const table = consoleTable.getTable(employees);
    console.log(table);
  } catch (err) {
    console.error("Error occurred while fetching employees:", err);
  }
};

const viewEmployeesByManager = async () => {
  try {
    const query = `
    SELECT 
    e1.id,
    e1.first_name,
    e1.last_name,
    e1.manager_id,
    CONCAT(e2.first_name, ' ', e2.last_name) AS manager_name,
    r.title AS role
    FROM employees e1
    LEFT JOIN employees e2 ON e1.manager_id = e2.id
    LEFT JOIN roles r ON e1.role_id = r.id
    `;
    const [employeesByManager] = await pool.query(query);
    process.stdout.write("\x1B[2J\x1B[0f");
    const table = consoleTable.getTable(employeesByManager);
    console.log(table);
  } catch (err) {
    console.error("Error occurred while fetching employees:", err);
  }
};

const viewEmployeesByDepartment = async () => {
  try {
    const query = `SELECT 
    e.id AS employee_id,
    e.first_name AS employee_first_name,
    e.last_name AS employee_last_name,
    d.name AS department,
    r.title AS role,
    r.salary,
    CONCAT(m.first_name, ' ', m.last_name) AS manager_name
    FROM employees e
    LEFT JOIN roles r ON e.role_id = r.id
    LEFT JOIN departments d ON r.department_id = d.id
    LEFT JOIN employees m ON e.manager_id = m.id;
    `;

    const [employeesByDepartment] = await pool.query(query);
    process.stdout.write("\x1B[2J\x1B[0f");
    const table = consoleTable.getTable(employeesByDepartment);
    console.log(table);
  } catch (err) {
    console.error("Error occurred while fetching employees:", err);
  }
};

const generateLaborCostReport = async () => {
  try {
    const query = `SELECT d.id AS department_id,
    d.name AS department_name,
    SUM(r.salary) AS labor_cost
    FROM departments d
    LEFT JOIN roles r ON d.id = r.department_id
    LEFT JOIN employees e ON r.id = e.role_id
    GROUP BY d.id, d.name;`;

    const [laborCostReport] = await pool.query(query);
    process.stdout.write("\x1B[2J\x1B[0f");
    const table = consoleTable.getTable(laborCostReport);
    console.log(table);
  } catch (err) {
    console.error("Error occurred while fetching employees:", err);
  }
};

module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  viewEmployeesByManager,
  viewEmployeesByDepartment,
  generateLaborCostReport,
};
