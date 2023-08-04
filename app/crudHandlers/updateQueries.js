const inquirer = require("inquirer");
const returnPrompt = require("./returnFunction");


const updateEmpRole = () => {
  pool.query("SELECT * from employees", (err, res) => {
    if (err) {
      console.error("Error occurred while fetching employees:", err);
      return;
    }

    const employees = res.map((employee) => ({
      id: employee.id,
      name: `${employee.first_name} ${employee.last_name}`,
    }));

    pool.query("SELECT * from roles", (err, res) => {
      if (err) {
        console.error("Error occurred while fetching roles:", err);
        return;
      }

      const roles = res.map((role) => ({
        id: role.id,
        name: role.title,
      }));

      const questions = [
        {
          type: "list",
          name: "employee",
          message: "Select the employee you would like to update: ",
          choices: employees,
        },
        {
          type: "list",
          name: "role",
          message: "Select the employee's new role: ",
          choices: roles,
        },
      ];

      inquirer.prompt(questions).then((answers) => {
        const selectedEmployee = answers.employee.id;
        const selectedRole = answers.role.id;

        pool.query(
          "UPDATE employees SET role_id = ? WHERE id = ?",
          [selectedRole, selectedEmployee],
          (err, res) => {
            if (err) throw err;
            console.log("Successfully updated employee!");
            returnPrompt();
          }
        );
      });
    });
  });
};

const updateEmpManager = () => {
  pool.query("SELECT * from employees", (err, res) => {
    if (err) {
      console.error("Error occurred while fetching employees:", err);
      return;
    }

    const employees = res.map((employee) => ({
      id: employee.id,
      name: `${employee.first_name} ${employee.last_name}`,
    }));

    const questions = [
      {
        type: "list",
        name: "employee",
        message: "Select the employee you would like to update: ",
        choices: employees,
      },
      {
        type: "list",
        name: "manager",
        message: "Select the employee's new manager: ",
        choices: employees,
      },
    ];

    inquirer.prompt(questions).then((answers) => {
      const selectedEmployee = answers.employee.id;
      const selectedManager = answers.manager.id;

      pool.query(
        "UPDATE employees SET manager_id = ? WHERE id = ?",
        [selectedManager, selectedEmployee],
        (err, res) => {
          if (err) throw err;
          console.log("Successfully updated employee!");
          returnPrompt();
        }
      );
    });
  });
};

module.exports = { updateEmpRole, updateEmpManager };
