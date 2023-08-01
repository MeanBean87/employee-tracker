addEmpQuestions = [
  {
    type: "input",
    name: "firstName",
    message: "Enter the employee's first name: ",
  },
  {
    type: "input",
    name: "lastName",
    message: "Enter the employee's last name: ",
  },
  {
    type: "list",
    name: "title",
    message: "Select the employee's title: ",
    choices: [
      "Sales Lead",
      "Salesperson",
      "Lead Engineer",
      "Software Engineer",
      "Account Manager",
      "Accountant",
      "Legal Team Lead",
      "Lawyer",
    ],
  },
  {
    type: "list",
    name: "department",
    message: "Select the employee's department: ",
    choices: ["Sales", "Engineering", "Finance", "Legal"],
  },
];
