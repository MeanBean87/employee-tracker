const mysql = require("mysql2");
const { seedDepartments, seedRoles, seedEmployees } = require("./seeds");

const createDepartmentsTable = () => {
  return `CREATE TABLE departments (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(30) NOT NULL, PRIMARY KEY (id));`;
};

const createRoleTable = () => {
  return (
    `CREATE TABLE role (id INT NOT NULL AUTO_INCREMENT,` +
    `title VARCHAR(50) NOT NULL, salary DECIMAL(10,2) NOT NULL,` +
    `department_id INT NOT NULL, PRIMARY KEY (id), FOREIGN KEY (department_id) REFERENCES departments(id));`
  );
};

const createEmployeeTable = () => {
  return (
    `CREATE TABLE employees (id INT NOT NULL AUTO_INCREMENT,` +
    `first_name VARCHAR(255) NOT NULL, last_name VARCHAR(30) NOT NULL,` +
    `role_id INT NOT NULL, manager_id INT, PRIMARY KEY (id), FOREIGN KEY (role_id)` +
    `REFERENCES role(id), FOREIGN KEY (manager_id) REFERENCES employees(id));`
  );
};

const buildAndSeedDatabase = async () => {
  const dbConfig = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
  };

  const pool = mysql
    .createConnection(dbConfig, { multipleStatements: true })
    .promise();

  console.log("Connected as id: " + pool.config.user);
  await pool.query(`DROP DATABASE IF EXISTS corporate;`);
  await pool.query(`CREATE DATABASE IF NOT EXISTS corporate;`);
  await pool.query(`USE corporate;`);
  await pool.query(createDepartmentsTable());
  await pool.query(createRoleTable());
  await pool.query(createEmployeeTable());
  await seedDepartments(pool);
  await seedRoles(pool);
  await seedEmployees(pool);
  console.log("Database created and seeded successfully!");
  pool.end();
};

buildAndSeedDatabase();
