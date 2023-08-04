const inquirer = require("inquirer");
const pool = require("../dbUtils/connectDb");

const deleteDepartments = async () => {
  try {
    const validDepartmentsArray = [];
    const [validDepartmentsList] = await pool.query(`SELECT d.id, d.name
    FROM departments d
    LEFT JOIN roles r ON d.id = r.department_id
    LEFT JOIN employees e ON r.id = e.role_id
    GROUP BY d.id, d.name
    HAVING COUNT(r.id) = 0 AND COUNT(e.id) = 0;`);
    
    validDepartmentsList.forEach((department) => {
      validDepartmentsArray.push({ name: department.name, id: department.id });
    });

    if (validDepartmentsArray.length === 0) {
      console.log(`There are no valid departments to delete currently.\nPlease remove the departments employees and roles and try again.`);
      return;
    }

    const questions = [
      {
        type: "list",
        name: "department",
        message:
          "***Attention*** Only departments without employees or roles can be deleted.\nWhich department would you like to delete?",
        choices: validDepartmentsArray.map((department) => department.name),
      },
      {
        type: "confirm",
        name: "confirm",
        message: "Are you sure you want to delete this department?",
        default: false,
      }
    ];
  
    const answers = await inquirer.prompt(questions);
    
    if (!answers.confirm) {
      console.log(`Department ${answers.department} will not be deleted.`);
      return;
    }

    const selectedDepartment = validDepartmentsArray.find(
      (department) => department.name === answers.department
    );
  
    await pool.query(
      `DELETE FROM departments WHERE id = ?`,
      [selectedDepartment.id]);
    
    console.log(`Department ${answers.department} has been deleted.`);
  } catch (err) {
    console.error("Error deleting department:", err);
  };
};

const deleteRoles = async () => {
  try {
    const validRolesArray = [];
    const [validRolesList] = await pool.query(`SELECT r.id, r.title
      FROM roles r
      LEFT JOIN employees e ON r.id = e.role_id
      WHERE e.id IS NULL;`);
    
    validRolesList.forEach((role) => {
      validRolesArray.push({ name: role.title, id: role.id });
    });
    
    const questions = [
      {
        type: "list",
        name: "role",
        loop: false,
        message:
          "Only empty roles can be deleted.\nWhich role would you like to delete?",
        choices: validRolesArray.map((role) => role.name),
      },
    ];
  
    const answers = await inquirer.prompt(questions);
    const selectedRole = validRolesArray.find(
      (role) => role.name === answers.role
    );

    await pool.query(
      `DELETE FROM roles WHERE id = ?`,
      [selectedRole.id]);
    
    console.log(`Role ${answers.role} has been deleted.`);
  } catch (err) {
    console.error("Error deleting role:", err);
    
  }
};

const deleteEmployees = async () => {
  try {
    const employeesArray = [];
    const [employees] = await pool.query("SELECT * FROM employees");

    employees.forEach((employee) => {
      employeesArray.push({ name: `${employee.first_name} ${employee.last_name}`, id: employee.id });
    });

    const questions = [
      {
        type: "list",
        name: "employee",
        message: "Which employee would you like to delete?",
        loop: false,
        choices: employeesArray.map((employee) => employee.name),
      },
    ];

    const answers = await inquirer.prompt(questions);
    const selectedEmployee = employeesArray.find(
      (employee) => employee.name === answers.employee
    );

    await pool.query(
      "DELETE FROM employees WHERE id = ?",
      [selectedEmployee.id]);
    
    console.log("Successfully deleted employee!");
  } catch (err) {
    console.error("Error occurred while deleting the employee:", err);
  }
};
  
module.exports = { deleteDepartments, deleteRoles, deleteEmployees };
    


