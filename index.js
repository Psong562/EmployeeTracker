// const express = require('express')
// const path = require('path')

// const app = express()

// app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())

// app.use(require('./routes'))

// require('./db').connect(() => app.listen(3000))



const { promp } = require ('inquirer')
const logo = require ('asciiart-logo')
const db = require ('./db')
const { initial } = require('lodash')
require ('console.table')

init() ;

function  init() {
    const logoText = logo ({name :'Employee Tracker'}).render();
    console.log(logoText)
    loadPrompt();
}

async function loadPromp() {
  const { choice } = await prompt ([
    {
      type: 'list',
      name: 'choice',
      message: 'Please choose what you would like to do?',
      choices :[
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
          name: 'ADD Employee',
          value: 'ADD_EMPLOYEE'
        },
        {
          name: 'REMOVE Employee',
          value: 'REMOVE_EMPLOYEE'
        },
        {
          name: 'UPDATE Employee ROLE',
          value: 'UPDATE_EMPLOYEE+ROLE'
        },
        {
          name: 'UPDATE Employees MANAGER',
          value: 'UPDATE_EMPLOYEE_MANAGER'
        },
        {
          name: 'VIEW all roles',
          value: 'VIEW_ROLES'
        },
        {
          name: 'ADD roles',
          value: 'ADD_ROLES'
        },
        {
          name: 'REMOVE roles',
          value: 'REMOVE_ROLES'
        },
        {
          name: 'VIEW all departments',
          value: 'VIEW_DEPARTMENTS'
        },
        {
          name: 'ADD departments',
          value: 'ADD_DEPARTMENTS'
        },
        {
          name: 'REMOVE departments',
          value: 'REMOVE_DEPARTMENTS'
        },
        {
          name: 'VIEW all departments',
          value: 'VIEW_DEPARTMENTS'
        },
        {
          name: 'Quit',
          value: 'Quit'
        },
      ]
    }
  ]);
  
// Using switch case call function on users choice


}