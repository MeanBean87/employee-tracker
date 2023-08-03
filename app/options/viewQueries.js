const consoleTable = require("console.table");

const viewAllDepartments = () => {
  pool.query("SELECT * FROM departments", (err, res) => {
    if (err) throw err;
    consoleTable(res);
  });
};

const viewAllRoles = () => {
  pool.query("SELECT * FROM roles", (err, res) => {
    if (err) throw err;
    consoleTable(res);
  });
};

const viewAllEmployees = () => {
  pool.query("SELECT * FROM employees", (err, res) => {
    if (err) throw err;
    consoleTable(res);
  });
};

const viewEmployeesByManager = () => { };

const viewEmployeesByDepartment = () => { };

module.exports = { viewAllDepartments, viewAllRoles, viewAllEmployees };
