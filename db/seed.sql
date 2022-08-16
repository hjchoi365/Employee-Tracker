INSERT INTO department (name) VALUES('Sales');
INSERT INTO department (name) VALUES('Engineering');
INSERT INTO department (name) VALUES('Finance');
INSERT INTO department (name) VALUES('Legal');

INSERT INTO role (title,salary,department_id) VALUES('Sales lead',100000,1);
INSERT INTO role (title,salary,department_id) VALUES('Salesperson',80000,1);
INSERT INTO role (title,salary,department_id) VALUES('Lead Engineer',150000,2);
INSERT INTO role (title,salary,department_id) VALUES('Software Engineer',120000,2);
INSERT INTO role (title,salary,department_id) VALUES('Accountant',125000,3);
INSERT INTO role (title,salary,department_id) VALUES('Legal Team Lead',250000,4);
INSERT INTO role (title,salary,department_id) VALUES('Lawyer',190000,4);


INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES('Hail','Choi',1,null);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES('Vincent','Won',2,null);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES('Caleb','Ro',3,null);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES('Daniel','Park',4,null);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES('Kenley','Hendrawan',5,null);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES('Steven','Dang',5,null);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES('John','Han',6,null);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES('Matthew','Paik',7,null);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES('Justin','Yi',4,null);

UPDATE employee set manager_id = 3 where id = 1;
UPDATE employee set manager_id = 1 where id = 2;
UPDATE employee set manager_id = 3 where id = 4;
UPDATE employee set manager_id = 7 where id = 5;
UPDATE employee set manager_id = 7 where id = 8;
UPDATE employee set manager_id = 6 where id = 9;
