const fs = require('fs');
const inquirer = require('inquirer');
const { left } = require('inquirer/lib/utils/readline');
//const generateMarkdown = require('./ultils/generateMarkdown.js');

//TODO: Create an array of questions to prompt user for manager's info

const managerQuestions = () => {
    return inquirer.prompt([
        {
            type: "input",
            message: "Please enter the team Manager's name (Required)",
            name: "managersname",
            validate: managersnameInput => {
                if (managersnameInput) {
                    return true;
                } else {
                    console.log("Please enter the team Manager's Name");
                    return false;
                }
            }
        },
        {
            type: "input",
            message: "Please enter the manager's employee ID (Required)",
            name: "managersid",
            validate: managersidInput => {
                if (managersidInput) {
                    return true;
                } else {
                    console.log("Please enter the Manager's ID");
                    return false;
                }
            }
        },
        {
            type: "input",
            message: "Please enter the manager's email address (Required)",
            name: "managersemail",
            validate: managersemmailInput => {
                if (managersemmailInput) {
                    return true;
                } else {
                    console.log("Please enter the Manager's email");
                    return false;
                }
            }
        },
        {
            type: "input",
            message: "Please enter the manager's office number",
            name: "managersofficenumber",
            validate: managersofficenumberInput => {
                if (managersofficenumberInput) {
                    return true;
                }else {
                    console.log("Please enter the Manager's office number");
                    return false;
                }
            }
        }
    ]);
};

const buildTeam = teamData =>{
    console.log("starting a new team");

    //if teamData array does not exist, create teamData array
    if(!teamData.projects){
        teamData.projects = [];
    }
    return inquirer.prompt([
    {
        type: "list",
        message: "Please choose an option",
        name: "teamMember",
        choices:["Add an Engineer", "Add an Intern", "No more addition to the team"]
    }
    ])
}


//TODO: WHEN I start the application
//      THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number
//WHEN I enter the team manager’s name, employee ID, email address, and office number
//THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team
//      1.  Create a function to prompt user for Manager's info
//      2.  Then prompt with an option to add an engineer/intern/finish building my team
managerQuestions()
    .then(buildTeam)

//TODO: create a fuction to write HTML file
// const writeHTML = (res) => (
//     fs.writeFile()
// )