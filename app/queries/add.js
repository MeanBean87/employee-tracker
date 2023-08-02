const addDepartment = (name) => {
    return `INSERT INTO department (name) VALUES ("${name}");`;
};

const addRole = (title, salary, department_id) => {
    return `INSERT INTO role (title, salary, department_id) VALUES ("${title}", ${salary}, ${department_id});`;
};

const addEmployee = (first_name, last_name, role_id, manager_id) => {
    return `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${first_name}", "${last_name}", ${role_id}, ${manager_id});`;
};

module.exports = { addDepartment, addRole, addEmployee };