const viewAllDepartments = () => {
    return `SELECT * FROM departments`;
};

const viewAllRoles = () => {
  return `SELECT * FROM roles`;
};

const viewAllEmployees = () => {
    return `SELECT * FROM employees`;
};

module.exports = { viewAllDepartments, viewAllRoles, viewAllEmployees };
