//Contains the database connection information.
const userName = "root";
const password = "password";

const dbConfig = {
    host: "localhost",
    port: 3306,
    user: userName,
    password: password,
};

const dbConfigCRUD = {
    host: "localhost",
    port: 3306,
    user: userName,
    password: password,
    database: "corporate"
};
  
module.exports = {dbConfig, dbConfigCRUD} ;