addRoleQuestions = [
  {
    type: "input",
    name: "roleName",
    message: "Enter the name of the role you would like to add: ",
  },
  {
    type: "input",
    name: "salary",
    message: "Enter the salary for this role: ",
  },
  {
    type: "list",
    name: "department",
    message: "Select the department for this role: ",
    choices: ["Sales", "Engineering", "Finance", "Legal"],
  },
];
