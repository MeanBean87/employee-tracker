const { faker } = require("@faker-js/faker");

const seedDepartments = async (pool) => {
  const departments = [
    { name: "Sales" },
    { name: "Engineering" },
    { name: "Finance" },
    { name: "Legal" },
    { name: "Human Resources" },
    { name: "Marketing" },
    { name: "Customer Service" },
    { name: "Research and Development" },
    { name: "Purchasing" },
    { name: "Information Technology" },
  ];

  await pool.query(`INSERT INTO departments (name) VALUES ?`, [
    departments.map((dep) => [dep.name]),
  ]);
};

const seedRoles = async (pool) => {
  const rolesData = [
    // Engineering department
    { title: "Engineering Manager", salary: 90000, department_id: 2 }, // Manager role for Engineering department
    { title: "Software Engineer", salary: 80000, department_id: 2 },
    { title: "Systems Engineer", salary: 75000, department_id: 2 },
    { title: "QA Engineer", salary: 72000, department_id: 2 },

    // Sales department
    { title: "Sales Manager", salary: 100000, department_id: 1 }, // Manager role for Sales department
    { title: "Sales Representative", salary: 60000, department_id: 1 },
    { title: "Sales Associate", salary: 55000, department_id: 1 },

    // Marketing department
    { title: "Marketing Manager", salary: 85000, department_id: 3 }, // Manager role for Marketing department
    { title: "Marketing Specialist", salary: 70000, department_id: 3 },
    { title: "Digital Marketing Coordinator", salary: 65000, department_id: 3 },

    // Finance department
    { title: "Finance Manager", salary: 95000, department_id: 4 }, // Manager role for Finance department
    { title: "Financial Analyst", salary: 85000, department_id: 4 },
    { title: "Accountant", salary: 75000, department_id: 4 },

    // Legal department
    { title: "Legal Manager", salary: 92000, department_id: 5 }, // Manager role for Legal department
    { title: "Legal Consultant", salary: 80000, department_id: 5 },
    { title: "Paralegal", salary: 70000, department_id: 5 },

    // Human Resources department
    { title: "HR Manager", salary: 90000, department_id: 6 }, // Manager role for Human Resources department
    { title: "HR Specialist", salary: 75000, department_id: 6 },
    { title: "Recruiter", salary: 70000, department_id: 6 },

    // Customer Service department
    { title: "Customer Service Manager", salary: 80000, department_id: 7 }, // Manager role for Customer Service department
    {
      title: "Customer Service Representative",
      salary: 60000,
      department_id: 7,
    },
    { title: "Customer Support Specialist", salary: 55000, department_id: 7 },

    // Research and Development department
    { title: "R&D Manager", salary: 92000, department_id: 8 }, // Manager role for Research and Development department
    { title: "Research Scientist", salary: 80000, department_id: 8 },
    { title: "Product Development Engineer", salary: 75000, department_id: 8 },

    // Purchasing department
    { title: "Purchasing Manager", salary: 88000, department_id: 9 }, // Manager role for Purchasing department
    { title: "Purchasing Specialist", salary: 75000, department_id: 9 },
    { title: "Procurement Officer", salary: 70000, department_id: 9 },

    // Information Technology department
    { title: "IT Manager", salary: 90000, department_id: 10 }, // Manager role for Information Technology department
    { title: "IT Specialist", salary: 80000, department_id: 10 },
    { title: "Network Administrator", salary: 75000, department_id: 10 },
  ];

  await pool.query(`INSERT INTO role (title, salary, department_id) VALUES ?`, [
    rolesData.map((role) => [role.title, role.salary, role.department_id]),
  ]);
};

const seedEmployees = async (pool) => {
  const employeesData = [
    // Engineering department
    {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      role_id: 1,
      manager_id: null,
    },
    {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      role_id: 2,
      manager_id: 1,
    },
    {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      role_id: 2,
      manager_id: 1,
    },
    {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      role_id: 2,
      manager_id: 1,
    },
    {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      role_id: 3,
      manager_id: 1,
    },
    {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      role_id: 3,
      manager_id: 1,
    },

    // Sales department
    {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      role_id: 4,
      manager_id: null,
    },
    {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      role_id: 5,
      manager_id: 2,
    },
    {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      role_id: 5,
      manager_id: 2,
    },
    {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      role_id: 6,
      manager_id: 2,
    },

    // Marketing department
    {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      role_id: 7,
      manager_id: null,
    },
    {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      role_id: 8,
      manager_id: 3,
    },
    {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      role_id: 8,
      manager_id: 3,
    },

    // Finance department
    {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      role_id: 9,
      manager_id: null,
    },
    {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      role_id: 10,
      manager_id: 4,
    },

    // Legal department
    {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      role_id: 11,
      manager_id: null,
    },
    {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      role_id: 12,
      manager_id: 5,
    },

    // Human Resources department
    {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      role_id: 13,
      manager_id: null,
    },
    {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      role_id: 14,
      manager_id: 6,
    },

    // Customer Service department
    {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      role_id: 15,
      manager_id: null,
    },
    {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      role_id: 16,
      manager_id: 7,
    },

    // Research and Development department
    {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      role_id: 17,
      manager_id: null,
    },
    {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      role_id: 18,
      manager_id: 8,
    },

    // Purchasing department
    {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      role_id: 19,
      manager_id: null,
    },
    {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      role_id: 20,
      manager_id: 9,
    },

    // Information Technology department
    {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      role_id: 21,
      manager_id: null,
    },
    {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      role_id: 22,
      manager_id: 10,
    },
  ];

  await pool.query(
    `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ?`,
    [
      employeesData.map((emp) => [
        emp.first_name,
        emp.last_name,
        emp.role_id,
        emp.manager_id,
      ]),
    ]
  );
};

module.exports = { seedDepartments, seedRoles, seedEmployees };