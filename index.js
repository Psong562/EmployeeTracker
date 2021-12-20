// const express = require('express')
// const path = require('path')

// const app = express()

// app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())

// app.use(require('./routes'))

// require('./db').connect(() => app.listen(3000))



const { prompt } = require('inquirer')
const logo = require('asciiart-logo')
// const db = require('./db')
const { initial } = require('lodash')
require('console.table')
const mysql = require('mysql2')

const db = mysql.createConnection('mysql://root:rootroot@localhost:3306/employee_db')

db.connect(err => {
  if (err) console.log(err) ;
  init();
});





function init() {
  const logoText = logo({ name: 'Employee Tracker' }).render();
  console.log(logoText)
  loadPrompt();
}

async function loadPrompt() {
  const { choice } = await prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'Please choose what you would like to do?',
      choices: [
        {
          name: 'View All Employees',
          value: 'VIEW_EMPLOYEES'
        },
        {
          name: 'View All Employees by Department',
          value: 'VIEW_EMPLOYEES_BY_DEPARTMENT'
        },
        {
          name: 'View All Employees by MANAGER',
          value: 'VIEW_EMPLOYEES_BY_MANAGER'
        },
        {
          name: 'VIEW all roles',
          value: 'VIEW_ROLES'
        },
        {
          name: 'ADD Employee',
          value: 'ADD_EMPLOYEE'
        },
        {
          name: 'REMOVE Employee',
          value: 'REMOVE_EMPLOYEE'
        },
        {
          name: 'UPDATE Employee ROLE',
          value: 'UPDATE_EMPLOYEE_ROLE'
        },
        {
          name: 'Quit',
          value: 'Quit'
        },
      ]
    }
  ]);

  // Using switch case call function on users choice
  switch (choice) {
    case 'VIEW_EMPLOYEES':
      return viewEmployees();
    case 'VIEW_EMPLOYEES_BY_DEPARTMENT':
      return viewEmployeesByDepartment();
    case 'VIEW_EMPLOYEES_BY_MANAGER':
      return viewEmployeesByManager();
    case 'VIEW_ROLES':
      return viewRoles();
    case 'ADD_EMPLOYEE':
      return addEmployee();
    case 'REMOVE_EMPLOYEE':
      return removeEmployee();
    case 'UPDATE_EMPLOYEE_ROLE':
      return updateEmployeeRole();
      default:
        return quit();
  }

}


function viewEmployees () {
  const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id)
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY employee.id;`;

  db.query(query, (err, res) => {
    if (err) console.log(err);
    console.log('\n');
    console.log('Viewing all Employees:')
    console.table(res);
    loadPrompt();
  });

}

function viewEmployeesByDepartment() {
  const query = `SELECT department.name AS department, role.title, employee.id, employee.first_name, employee.last_name
    FROM employee
    LEFT JOIN role ON (role.id = employee.role_id)
    LEFT JOIN department ON (department.id = role.department_id)
    ORDER BY department.name;`;
  db.query(query, (err, res) => {
    if (err) console.log(err);
    console.log('\n');
    console.log('Viewing employees by Department');
    console.table(res);
    loadPrompt();
  });
}


function viewEmployeesByManager() {
  const query = `SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS manager, department.name AS department, employee.id, employee.first_name, employee.last_name, role.title
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id && employee.manager_id != 'NULL')
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY manager;`;
  db.query(query, (err, res) => {
    if (err) console.log(err);
    console.log('\n');
    console.log('Viewing Employess by Manager:')
    console.table(res);
    loadPrompt();
  });
}



function viewRoles() {
  const query = `SELECT role.title, employee.id, employee.first_name, employee.last_name, department.name AS department
    FROM employee
    LEFT JOIN role ON (role.id = employee.role_id)
    LEFT JOIN department ON (department.id = role.department_id)
    ORDER BY role.title;`;
  db.query(query, (err, res) => {
    if (err) consol.log(err);
    console.log('\n');
    console.log('Viewing all roles');
    console.table(res);
    loadPrompt();
  });

}



