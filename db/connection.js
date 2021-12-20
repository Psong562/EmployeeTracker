const mysql = require('mysql2')
const util = require('util')

const db = mysql.createConnection('mysql://root:rootroot@localhost:3306/employee_db')


db.connect();
db.query = util.promisify(db.query);

module.exports = db