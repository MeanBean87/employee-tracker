const deleteDepartments = async () => {
  const validDepartmentsList = await pool.query(`SELECT d.id, d.name
    FROM departments d
    LEFT JOIN employees e ON d.id = e.role_id
    WHERE e.id IS NULL;`);

  const questions = [
    {
      type: "list",
      name: "department",
      message:
        "Only empty departments can be deleted.\nWhich department would you like to delete?",
      choices: validDepartmentsList,
    },
  ];

  await inquirer.prompt(questions).then((answers) => {
    pool.query(
      `DELETE FROM departments WHERE id = ?`,
      [answers.department],
      (err, res) => {
        if (err) throw err;
        console.log(`Department ${answers.department} has been deleted.`);
      }
    );
  });
};

const deleteRoles = async () => {
  const validRolesList = await pool.query(`SELECT r.id, r.title
        FROM role r
        LEFT JOIN employees e ON r.id = e.role_id
        WHERE e.id IS NULL;`);

  const questions = [
    {
      type: "list",
      name: "role",
      message:
        "Only empty roles can be deleted.\nWhich role would you like to delete?",
      choices: validRolesList,
    },
  ];

  await inquirer.prompt(questions).then((answers) => {
    pool.query(`DELETE FROM role WHERE id = ?`, [answers.role], (err, res) => {
      if (err) throw err;
      console.log(`Role ${answers.role} has been deleted.`);
    });
  });
};

const deleteEmployees = async () => {
    const employeesList = await pool.query(`SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employees;`);
  
    const questions = [
      {
        type: "list",
        name: "employee",
        message:
          "Which employee would you like to delete?",
        choices: employeesList.map((employee) => ({ name: employee.name, value: employee.id })),
      },
    ];
  
    await inquirer.prompt(questions).then(async (answers) => {
      const employeeIdToDelete = answers.employee;
  
      try {
        // Delete the employee with the specified ID
        await pool.query(`DELETE FROM employees WHERE id = ?`, [employeeIdToDelete]);
        console.log(`Employee with ID ${employeeIdToDelete} has been deleted.`);
      } catch (err) {
        console.error("Error deleting employee:", err);
      }
    });
  };
  
module.exports = { deleteDepartments, deleteRoles, deleteEmployees };
    


