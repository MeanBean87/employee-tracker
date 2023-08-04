const cliTable = require("cli-table3");
const pool = require("../dbUtils/connectDb");

const showTable = (columnArr, tableData) => {
  const table = new cliTable({ head: columnArr });
  table.push(...tableData.map((row) => Object.values(row)));
  console.log(table.toString());
};

const viewAllDepartments = async () => {
  try {
    const [departments] = await pool.query(
      "SELECT * FROM departments ORDER by id"
    );
    process.stdout.write("\x1B[2J\x1B[0f");
    showTable(["Department ID", "Department Name"], departments);
  } catch (err) {
    console.error("Error occurred while fetching departments:", err);
  }
};

const viewAllRoles = async () => {
  try {
    const [roles] = await pool.query("SELECT * FROM roles ORDER by id");
    process.stdout.write("\x1B[2J\x1B[0f");
    showTable(["Role ID", "Role Title", "Salary", "Department ID"], roles);
  } catch (err) {
    console.error("Error occurred while fetching roles:", err);
  }
};

const viewAllEmployees = async () => {
  try {
    const [employees] = await pool.query("SELECT * FROM employees ORDER by id");
    process.stdout.write("\x1B[2J\x1B[0f");
    showTable(
      ["Employee ID", "First Name", "Last Name", "Role ID", "Manager ID"],
      employees
    );
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
    showTable(
      [
        "Employee ID",
        "First Name",
        "Last Name",
        "Manager ID",
        "Manager Name",
        "Role",
      ],
      employeesByManager
    );
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
    showTable(
      [
        "Employee ID",
        "First Name",
        "Last Name",
        "Department",
        "Role",
        "Salary",
        "Manager Name",
      ],
      employeesByDepartment
    );
  } catch (err) {
    console.error("Error occurred while fetching employees:", err);
  }
};

const generateLaborCostReport = async () => {
  try {
    const query = `SELECT d.id AS department_id,
    d.name AS department_name,
    SUM(COALESCE(r.salary, 0)) AS labor_cost
    FROM departments d
    LEFT JOIN roles r ON d.id = r.department_id
    LEFT JOIN employees e ON r.id = e.role_id
    GROUP BY d.id, d.name
    ORDER BY d.id ASC;`;

    const [laborCostReport] = await pool.query(query);
    process.stdout.write("\x1B[2J\x1B[0f");
    showTable(
      ["Department ID", "Department Name", "Labor Cost"],
      laborCostReport
    );
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
