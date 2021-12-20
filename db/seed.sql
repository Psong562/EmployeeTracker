use employee_db;

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
('CHRO', 180000, 4),
('CTO', 110000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Peter', 'Song', 1, 1),
('Will', 'Lee', 2, 2), 
('Paul', 'Cam', 3, 3),
('Cherry', 'Martinez', 4, null), 
('Vee', 'Song', 4, 4), 
('Andy', 'Carlos', 5, null), 
('Jasmine', 'Zoe', 5, 5);

