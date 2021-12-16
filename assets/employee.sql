CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	name VARCHAR(30) NOT NULL
    );
    
CREATE TABLE role (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	title VARCHAR(50) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id));
    
    
CREATE TABLE employee (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id),
    manager_id INT ,
    FOREIGN KEY (manager_id) REFERENCEs employee(id)
    );
    
INSERT INTO department (name)
VALUES 
('Marketing'),
('Finance'),
('Operations Management'),
('Human Resources'),
('IT');

INSERT INTO role (title, salary, department_id)
VALUES 
('CMO', 89000, 1), 
('CFO', 250000, 2), 
('COO', 64000, 3), 
('CHRO', 180000, 4), (
'CTO', 110000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('John', 'Doe', 1, 1),
('Jone', 'Boe', 2, 2), 
('Jack', 'Hoe', 3, 3),
('Jonathan', 'Shoe', 4, 4), 
('Jasmine', 'Zoe', 5, 5);

