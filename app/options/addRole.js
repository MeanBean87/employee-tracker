const addRole = async () => {
  await pool.query("SELECT * from departments", (err, res) => {
    if (err) {
      console.error("Error occurred while fetching departments:", err);
      return;
    }

    const departments = res.map((department) => ({
      id: department.id,
      name: department.name,
    }));

    const questions = [
      {
        type: "input",
        name: "title",
        message: "What is the role's title?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the role's salary?",
      },
      {
        type: "list",
        name: "departmentName",
        message: "What is the role's department?",
        choices: departments.map((department) => department.name),
      },
    ];

    inquirer.prompt(questions).then((answers) => {
      const selectedDepartment = departments.find(
        (department) => department.name === answers.departmentName
      );

      pool.query(
        "INSERT INTO roles SET ?",
        {
          title: answers.title,
          salary: answers.salary,
          department_id: selectedDepartment.id,
        },
        (err, res) => {
          if (err) throw err;
          console.log("Successfully added role!");
          mainMenu();
        }
      );
    });
  });
};

module.exports = addRole;
