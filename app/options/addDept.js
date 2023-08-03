const addDepartment = async () => {
  pool.query("SELECT * from departments", (err, res) => {
    if (err) {
      console.error("Error occurred while fetching departments:", err);
      return;
    }

    const departments = res.map((department) => ({ name: department.name }));

    const questions = [
      {
        type: "input",
        name: "name",
        message: "What is the department's name?",
      },
    ];

    inquirer.prompt(questions).then((answers) => {
      if (departments.find((department) => department.name === answers.name)) {
        console.log("Department already exists!");
        errorQuestions = [
          {
            type: "list",
            name: "error",
            message: "Error: There is already a department with that name, would you like to retry?",
            choices: ["Yes", "No"],
          },
        ];

        inquirer.prompt(errorQuestions).then((answers) => {
          if (answers.error === "Yes") {
            addDepartment();
          } else {
            mainMenu();
          }
        });
      }

      pool.query("INSERT INTO departments SET ?", answers.name, (err, res) => {
        if (err) throw err;
        console.log("Successfully added department!");
        mainMenu();

      });
    });
  });
};
