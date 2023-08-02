const inquire = require("inquirer");
const express = require("express");
const mysql = require("mysql2");
const cTable = require("console.table");
const menu = require("./app/questions/menu");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));

const connection = mysql.createConnection(dbConfigCRUD);


const init = () => {
    inquire.prompt(menu).then((answers) => { });

 };

init();
 

