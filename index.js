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
  user: 'your_username',
  host: 'localhost',
  database: 'your_database_name',
  password: 'your_password',
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
function addADepartment() {
  client.query('SELECT * FROM Adding department', (error, results) => {
    if (error) {
      console.error('Error adding Department:', error);
      return;
    }
    console.table(results.rows);
    mainMenu(); // Call main menu again to display options
  });
}
function addARole() {
  client.query('SELECT * FROM addimg a role', (error, results) => {
    if (error) {
      console.error('Error adding role:', error);
      return;
    }
    console.table(results.rows);
    mainMenu(); // Call main menu again to display options
  });
}
function addAnEmployee() {
  client.query('SELECT * FROM Adding employee', (error, results) => {
    if (error) {
      console.error('Error adding employee:', error);
      return;
    }
    console.table(results.rows);
    mainMenu(); // Call main menu again to display options
  });
}
function updateAnEmployee() {
  client.query('SELECT * FROM updating employee', (error, results) => {
    if (error) {
      console.error('Error updating employee:', error);
      return;
    }
    console.table(results.rows);
    mainMenu(); // Call main menu again to display options
    
  });
}

  function updateEmployeeManager() {
    client.query('SELECT * FROM updating employee manager', (error, results) => {
      if (error) {
        console.error('Error updating employee manager:', error);
        return;
      }
      console.table(results.rows);
      mainMenu(); // Call main menu again to display options
    });
  }
  function viewEmployeesByDepartment() {
    client.query('SELECT * FROM view employees by department', (error, results) => {
      if (error) {
        console.error('Error viewing employees by department:', error);
        return;
      }
      console.table(results.rows);
      mainMenu(); // Call main menu again to display options
    });
  }

  function viewDepartmentBudget() {
    client.query('SELECT * FROM view department budgets', (error, results) => {
      if (error) {
        console.error('Error viewing department budgets:', error);
        return;
      }
      console.table(results.rows);
      mainMenu(); // Call main menu again to display options
    });
  }
  function deleteDepartment(){
    client.query('SELECT * FROM delete a departments', (error, results) => {
      if (error) {
        console.error('Error deleting a department:', error);
        return;
      }
      console.table(results.rows);
      mainMenu(); // Call main menu again to display options
    });
  }
  function deleteRole() {
    client.query('SELECT * FROM deleteing a role', (error, results) => {
      if (error) {
        console.error('Error deleting a row:', error);
        return;
      }
      console.table(results.rows);
      mainMenu(); // Call main menu again to display options
    });
  }
  function deleteEmployee() {
    client.query('SELECT * FROM deleting an employee', (error, results) => {
      if (error) {
        console.error('Error deleting an employee:', error);
        return;
      }
      console.table(results.rows);
      mainMenu(); 
    });
  }


// Main function to start the application
async function startApp() {
  await connectDB();
  await mainMenu();
}

startApp();
