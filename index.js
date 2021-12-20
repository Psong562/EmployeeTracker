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
const db = require('./db')
const { initial } = require('lodash')
require('console.table')

init();

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
    case 'ADD_EMPLOYEE':
      return addEmployee();
    case 'REMOVE_EMPLOYEE':
      return removeEmployee();
    case 'UPDATE_EMPLOYEE_ROLE':
      return updateEmployeeRole();
    case 'VIEW_ROLES':
      return viewRoles();
      default:
        return quit();
  }

}



async function viewEmployees() {
  const employees = await db.findAllEmployees();
  console.log(employees);
  
}



