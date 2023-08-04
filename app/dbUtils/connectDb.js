const mysql = require("mysql2/promise");
const { dbConfigCRUD } = require("../config/dbConfig"); 

const pool = mysql.createPool(dbConfigCRUD);

module.exports = pool;