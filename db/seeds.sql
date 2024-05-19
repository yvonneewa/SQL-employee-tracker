INSERT INTO department (name) VALUES
('Sales')
-- Insert departments
INSERT INTO department (name) VALUES ('Marketing');
INSERT INTO department (name) VALUES ('Lawyer');
INSERT INTO department (name) VALUES ('Accountant');
INSERT INTO department (name) VALUES ('QA Engineer');
INSERT INTO department (name) VALUES ('Finance');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES
('Sales Manager', 600000, 1),
('Sales Representative', 400000, 1),
('Marketing Manager', 55000, 2),
('QA engineer', 800000, 1),
('UI engineer', 4500000, 1),
('Finance', 66000, 2);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Johnny', 'Tsunami', 1, NULL),
('Harry', 'Potter', 2, 1),
('Zenon', 'Kar', 3, NULL),
('Kim', 'Possible', 4, NULL),
('Even', 'Stevens', 5, 1);
