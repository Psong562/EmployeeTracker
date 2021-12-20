const db = require('./connection')

class dataBase {
  constructor(db) {
    this.db = db;
  }
  
  findAllEmployees() {
    return this.db.query (
      "Select employee.id, employee.first_name, employee.last_name, role.title, department.name AS Department, role.salary, CONCAT(manager.first_name, '', manager.last_name) AS manager FROM employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = emplyee.manager_id"
      );
    }
  
  // findAllManagers(employeeId) {
  //   return this.db.query (
  //     "SELECT id, first_name, last_name from employee WHERE id != ?",
  //     employeeId
  //   )

  // }
    


}

module.exports = new dataBase(db)