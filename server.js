const inquire = require("inquirer");
const express = require("express");
const mysql = require("mysql2");
const cTable = require("console.table");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    database: "corporate",
    user: "root",
    password: "password",
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);
    start();
});


 

