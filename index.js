const { prompt } = require('inquirer')
const logo = require('asciiart-logo')
const mysql = require('mysql2')
require('console.table')

// Create connection with my sql and databse
const db = mysql.createConnection('mysql://root:rootroot@localhost:3306/employee_db')
db.connect(err => {
  if (err) console.log(err) ;
  init();
});

// uses logo text to create title of application
function init() {
  const logoText = logo({ name: 'Employee Tracker' }).render();
  console.log(logoText)
  loadPrompt();
}

// Loads prompt to ask questions about employees
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

// function to view all employeses
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

// function to view all employees by department
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

// function to view employess by manager
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


// Function to view roles of all employess
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


// Prompt to ask for employees name. Used to add an employee
function employeeName() {
    return ([
      {
          name:'first',
          type:'input',
          message:'What is the First Name'
      },
      {
          name:'last',
          type:'input',
          message:'What is the Last Name'
      },
    ]);
}

// Prompt to ask for ID, used for update employee
function askId() {
  return ([
    {
      name: "name",
      type: "input",
      message: "What is the employe ID?:  "
    }
  ]);
}


// function to add employee
async function addEmployee() {
  const addName = await prompt(employeeName());
  db.query('SELECT role.id, role.title FROM role ORDER BY role.id;', async (err, res) => {
    if (err) console.log(err);
    const { role } = await prompt([
      {
        name: 'role',
        type: 'list',
        message: 'What is the employee role?:',
        choices: () => res.map(res => res.title)
      }
    ]);
    let roleId;
    for (const row of res) {
      if (row.title === role) {
        roleId = row.id;
        continue;
      }
    }
    db.query('SELECT * FROM employee', async (err, res) => {
      if (err) console.log(err);
      let choices = res.map(res => `${res.first_name} ${res.last_name}`);
      choices.push('none');
      let { manager } = await prompt([
        {
          name: 'manager',
          type: 'list',
          choices: choices,
          message: 'Choose the employees Manager: '
        }
      ]);
      let managerId;
      let managerName;
      if (manager === 'none') {
        managerId = null;
      } else {
        for (const data of res) {
          data.fullName = `${data.first_name} ${data.last_name}`;
          if (data.fullName === manager) {
            managerId = data.id;
            managerName = data.fullName;
            console.log(managerId);
            console.log(managerName);
            continue;
          }
        }
      }
      console.log('Employee has been added. Please view all employee to confirm...');
      db.query(
        'INSERT INTO employee SET ?',
        {
          first_name: addName.first,
          last_name: addName.last,
          role_id: roleId,
          manager_id: parseInt(managerId)
        },
        (err, res) => {
          if (err) console.log(err);
          loadPrompt();

        }
      );
    });
  });

}

// function to rmove employee
async function removeEmployee () {

    const answer = await prompt([
      {
        name: 'ID',
        type: 'input',
        message: 'What is the ID of the employee you want to remove '
      },
    
    ]);
  db.query(`DELETE FROM employee WHERE ?`,
    {
      id: answer.ID,
    },
    function (err) {
      if (err) console.log(err);
    }
  )
  
  console.log('Employee has been removed on the system!');
  
  loadPrompt();

}

// function to update employee using ID function above
async function updateEmployeeRole() {
  const employeeId = await prompt(askId());

  db.query('SELECT role.id, role.title FROM role ORDER BY role.id;', async (err, res) => {
    if (err) console.log(err);
    const { role } = await prompt([
      {
        name: 'role',
        type: 'list',
        message: 'What is the new employee role?: ',
        choices: () => res.map(res => res.title)
      }
    ]);
    let roleId;
    for (const row of res) {
      if (row.title === role) {
        roleId = row.id;
        continue;
      }
    }
    db.query(`UPDATE employee 
        SET role_id = ${roleId}
        WHERE employee.id = ${employeeId.name}`, async (err, res) => {
      if (err) throw err;
      console.log('Employee Role has been updated!')
      loadPrompt();
    });
  });
}

// function to quit out of node/inquirer
async function quit() {
  const logoText = logo({ name: 'Thank You for Using Employee Tracker' }).render();
  console.log(logoText);
  process.exit(1)
  
}