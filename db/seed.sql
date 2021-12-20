use employee_db

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

