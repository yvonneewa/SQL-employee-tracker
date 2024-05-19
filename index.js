/**
 * create database/schema and seeds
 * 
 * set up inquirer questions
 * 
 * 
 * save to database in node
 * 
 * GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
 */
const inquirer = require("inquirer");
const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'employeeTracker_db',
  password: 'Bumblebee113',
  port: 5432,
});

// Function to connect to the database
async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

// Function to display main menu options
async function mainMenu() {
  const mainMenuQuestions = [
    {
      type: 'list',
      name: 'menuOption',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'View Employees by department',
        'View department budget',
        'Delete department',
        'delete role',
        'delete employee',
        'Exit'
      ]
    }
  ];

  try {
    const answers = await inquirer.prompt(mainMenuQuestions);
    switch (answers.menuOption) {
      case 'View all departments':
        viewAllDepartments();
        break;
      case 'View all roles':
        viewAllRoles();
        break;
      case 'View all employees':
        viewAllEmployees();
        break;
      case 'Add a department':
        addADepartment();
        break;
      case 'Add a role':
        addARole();
        break;
      case 'Add an employee':
        addAnEmployee();
        break;
        case 'Update an employee role':
          updateAnEmployee();
        break;
      case 'View employee by department':
        viewEmployeesByDepartment();
        break;
        case 'View department budget':
          viewDepartmentBudget();
        break;
        case 'Delete department':
          deleteDepartment();
        break;
        case 'Delete role':
          deleteRole();
        break;
        case 'Delete employee':
          deleteEmployee();
        break;
      case 'Exit':
        console.log('Exiting application...');
        client.end(); // Close the database connection
        break;
      default:
        console.log('Invalid option, please try again.');
        mainMenu(); // Show the main menu again
    }
  } catch (error) {
    console.error('Error occurred during prompt:', error);
  }
}

// Function to view all departments
function viewAllDepartments() {
  client.query('SELECT * FROM department', (error, results) => {
    if (error) {
      console.error('Error retrieving departments:', error);
      return;
    }
    console.table(results.rows);
    mainMenu(); // Call main menu again to display options
  });
}

// Function to view all roles
function viewAllRoles() {
  client.query('SELECT * FROM role', (error, results) => {
    if (error) {
      console.error('Error retrieving roles:', error);
      return;
    }
    console.table(results.rows);
    mainMenu(); // Call main menu again to display options
  });
}

//function to view all employees
function viewAllEmployees() {
  client.query('SELECT * FROM employees', (error, results) => {
    if (error) {
      console.error('Error retrieving employees :', error);
      return;
    }
    console.table(results.rows);
    mainMenu(); // Call main menu again to display options
  });
}

//function to add departmets
async function addADepartment() {
  const departmentName = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'Enter the name of the department:',
  });

  const query = {
    text: 'INSERT INTO department (name) VALUES ($1)',
    values: [departmentName.name],
  };

  try {
    await client.query(query);
    console.log('Department added successfully!');
  } catch (error) {
    console.error('Error adding department:', error);
  }

  mainMenu(); // Call main menu again to display options
}

//funtion to add a role
async function addARole() {
  try {
    const roleInfo = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the role:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the role:',
      },
      {
        type: 'input',
        name: 'departmentId',
        message: 'Enter the department ID for the role:',
      },
    ]);

    const query = {
      text: 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
      values: [roleInfo.title, roleInfo.salary, roleInfo.departmentId],
    };

    await client.query(query);
    console.log('Role added successfully!');
  } catch (error) {
    console.error('Error adding role:', error.message);
  }

  mainMenu(); // Call main menu again to display options
}


// funtion to add an employee
async function addAnEmployee() {
  try {
    const employeeInfo = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter the first name of the employee:',
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter the last name of the employee:',
      },
      {
        type: 'input',
        name: 'roleId',
        message: 'Enter the role ID for the employee:',
      },
      {
        type: 'input',
        name: 'managerId',
        message: 'Enter the manager ID for the employee (if any):',
      },
    ]);

    const query = {
      text: 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
      values: [employeeInfo.firstName, employeeInfo.lastName, employeeInfo.roleId, employeeInfo.managerId || null],
    };

    await client.query(query);
    console.log('Employee added successfully!');
  } catch (error) {
    console.error('Error adding employee:', error.message);
  }

  mainMenu(); // Call main menu again to display options
}


//function to update an employee
async function updateAnEmployee() {
  try {
    const employeeToUpdate = await inquirer.prompt([
      {
        type: 'input',
        name: 'employeeId',
        message: 'Enter the ID of the employee to update:',
      },
      {
        type: 'input',
        name: 'newRoleId',
        message: 'Enter the new role ID for the employee:',
      },
    ]);

    const query = {
      text: 'UPDATE employee SET role_id = $1 WHERE id = $2',
      values: [employeeToUpdate.newRoleId, employeeToUpdate.employeeId],
    };

    await client.query(query);
    console.log('Employee role updated successfully!');
  } catch (error) {
    console.error('Error updating employee role:', error.message);
  }

  mainMenu(); // Call main menu again to display options
}


//funtion to update an employee manager
async function updateEmployeeManager() {
  try {
    const userInput = await inquirer.prompt([
      {
        type: 'input',
        name: 'employeeId',
        message: 'Enter the ID of the employee to update:',
      },
      {
        type: 'input',
        name: 'newManagerId',
        message: 'Enter the ID of the new manager for the employee:',
      },
    ]);

    const query = {
      text: 'UPDATE employee SET manager_id = $1 WHERE id = $2',
      values: [userInput.newManagerId, userInput.employeeId],
    };

    await client.query(query);
    console.log('Employee manager updated successfully!');
  } catch (error) {
    console.error('Error updating employee manager:', error.message);
  }

  mainMenu(); // Call main menu again to display options
}

  // funtion to view employee by department
  async function viewEmployeesByDepartment() {
    try {
      const userInput = await inquirer.prompt({
        type: 'input',
        name: 'departmentId',
        message: 'Enter the department ID to view employees:',
      });
  
      const query = {
        text: `SELECT * FROM employee WHERE department_id = $1`,
        values: [userInput.departmentId],
      };
  
      const result = await client.query(query);
  
      if (result.rows.length === 0) {
        console.log('No employees found in the specified department.');
      } else {
        console.table(result.rows);
      }
    } catch (error) {
      console.error('Error viewing employees by department:', error.message);
    }
  
    mainMenu(); // Call main menu again to display options
  }
  

  //funtion to view departments to budget
  async function viewDepartmentBudget() {
    try {
      const userInput = await inquirer.prompt({
        type: 'input',
        name: 'departmentId',
        message: 'Enter the department ID to view budget:',
      });
  
      const query = {
        text: `SELECT SUM(salary) AS total_budget FROM employee WHERE department_id = $1`,
        values: [userInput.departmentId],
      };
  
      const result = await client.query(query);
      const totalBudget = result.rows[0].total_budget;
  
      console.log(`Total budget for the department: $${totalBudget}`);
    } catch (error) {
      console.error('Error viewing department budget:', error.message);
    }
  
    mainMenu(); // Call main menu again to display options
  }
  

  //funtion to delete department 
  async function deleteDepartment() {
    try {
      const userInput = await inquirer.prompt({
        type: 'input',
        name: 'departmentId',
        message: 'Enter the department ID to delete:',
      });
  
      const query = {
        text: `DELETE FROM department WHERE id = $1`,
        values: [userInput.departmentId],
      };
  
      await client.query(query);
      console.log('Department deleted successfully!');
    } catch (error) {
      console.error('Error deleting department:', error.message);
    }
  
    mainMenu(); // Call main menu again to display options
  }
  

  //function to delete role
  async function deleteRole() {
    try {
      const userInput = await inquirer.prompt({
        type: 'input',
        name: 'roleId',
        message: 'Enter the role ID to delete:',
      });
  
      const query = {
        text: `DELETE FROM role WHERE id = $1`,
        values: [userInput.roleId],
      };
  
      await client.query(query);
      console.log('Role deleted successfully!');
    } catch (error) {
      console.error('Error deleting role:', error.message);
    }
  
    mainMenu(); // Call main menu again to display options
  }
  

  //function to delete employees
  async function deleteEmployee() {
    try {
      const userInput = await inquirer.prompt({
        type: 'input',
        name: 'employeeId',
        message: 'Enter the employee ID to delete:',
      });
  
      const query = {
        text: `DELETE FROM employee WHERE id = $1`,
        values: [userInput.employeeId],
      };
  
      await client.query(query);
      console.log('Employee deleted successfully!');
    } catch (error) {
      console.error('Error deleting employee:', error.message);
    }
  
    mainMenu(); // Call main menu again to display options
  }
  

// Main function to start the application
async function startApp() {
  await connectDB();
  await mainMenu();
}

startApp();
