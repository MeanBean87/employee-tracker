const addNewEmpQuestions = () => {
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
        mainMenu();
      });
    });
  });
};

module.exports = addNewEmpQuestions;