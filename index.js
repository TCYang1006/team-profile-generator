const fs = require('fs');
const inquirer = require('inquirer');
//const { left } = require('inquirer/lib/untils/readline');

const generateHTML = require('./src/generateHTML');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Employee = require('./lib/Employee');

const teamData = [];



const managerQuestions = () => {
    return inquirer.prompt([
        {
            type: "input",
            message: "Please enter the team Manager's name (Required)",
            name: "name",
            validate: nameInput => {
                if (nameInput) {
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
            name: "id",
            validate: idInput => {
                if (isNaN(idInput)) {
                    console.log("Please enter the Manager's ID");
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            message: "Please enter the manager's email address (Required)",
            name: "email",
            validate: emmailInput => {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emmailInput)) {
                    return true;
                } else {
                    console.log("Please enter the Manager's email");
                    return false;
                }
            }
        },
        {
            type: "input",
            message: "Please enter the Manager's office number",
            name: "officenumber",
            validate: officenumberInput => {
                if (isNaN(officenumberInput)) {
                    console.log("Please enter the Manager's office number");
                    return false;
                } else {
                    return true;
                }
            }
        }
    ])
        //if managerData array does not exist, create managerData array
        .then(managerAnswers => {
            const { name, id, email, officenumber } = managerAnswers;
            const manager = new Manager(name, id, email, officenumber);

            console.log(manager);
            teamData.push(manager);
            console.log(teamData);
        })

};

const buildTeam = () => {
    console.log("starting a new team");

    return inquirer.prompt([
        {
            type: "list",
            message: "Please choose an option",
            name: "team",
            choices: ["Add an Engineer", "Add an Intern", "No more addition to the team"]
        }
    ])
        .then(teamAnswer => {
            console.log(teamAnswer);
            if (teamAnswer.team === "Add an Engineer") {
                return inquirer.prompt([
                    {
                        type: "input",
                        message: "Please enter the Engineer's name (Required)",
                        name: "name",
                        validate: nameInput => {
                            if (nameInput) {
                                return true;
                            } else {
                                console.log("Please enter the Engineer's Name");
                                return false;
                            }
                        }
                    },
                    {
                        type: "input",
                        message: "Please enter the Engineer's employee ID (Required)",
                        name: "id",
                        validate: idInput => {
                            if (isNaN(idInput)) {
                                console.log("Please enter the Engineer's ID");
                                return false;
                            } else {
                                return true;
                            }
                        }
                    },
                    {
                        type: "input",
                        message: "Please enter the Engineer's email address (Required)",
                        name: "email",
                        validate: emailInput => {
                            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput)) {
                                return true;
                            } else {
                                console.log("Please enter the Manager's email");
                                return false;
                            }
                        }
                    },
                    {
                        type: "input",
                        name: "github",
                        message: "Please enter the Engineer's github username",
                        validate: githubInput => {
                            if (githubInput) {
                                return true;
                            } else {
                                console.log("Please enter the Engineer's github username");
                                return false;
                            }
                        }
                    }

                ])
                    //then
                    .then(engineerAnswers => {
                        let { name, id, email, github } = engineerAnswers;
                        let employee = new Engineer(name, id, email, github);

                        console.log(employee);
                        teamData.push(employee);
                        console.log(teamData);
                        buildTeam();
                    })


            } else if (teamAnswer.team === "Add an Intern") {
                return inquirer.prompt([
                    {
                        type: "input",
                        message: "Please enter the Intern's name (Required)",
                        name: "name",
                        validate: nameInput => {
                            if (nameInput) {
                                return true;
                            } else {
                                console.log("Please enter the Intern's Name");
                                return false;
                            }
                        }
                    },
                    {
                        type: "input",
                        message: "Please enter the Intern's employee ID (Required)",
                        name: "id",
                        validate: idInput => {
                            if (isNaN(idInput)) {
                                console.log("Please enter the Intern's ID");
                                return false;
                            } else {
                                return true;
                            }
                        }
                    },
                    {
                        type: "input",
                        message: "Please enter the Intern's email address (Required)",
                        name: "email",
                        validate: emailInput => {
                            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput)) {
                                return true;
                            } else {
                                console.log("Please enter the Intern's email");
                                return false;
                            }
                        }
                    },
                    {
                        type: "input",
                        name: "schooledu",
                        message: "Please enter the Intern's school",
                        validate: schooleduInput => {
                            if (schooleduInput) {
                                return true;
                            } else {
                                console.log("Please enter the Intern's school");
                                return false;
                            }
                        }
                    }

                ])
                    //then
                    .then(internAnswers => {
                        let { name, id, email, schooledu } = internAnswers;
                        let employee = new Intern(name, id, email, schooledu);

                        console.log(employee);
                        teamData.push(employee);
                        console.log(teamData);
                        buildTeam();
                    })

            } else {
            return writeHTML(teamData);
            }
        });

};

const writeHTML = (teamData) => (
    fs.writeFile('index.html', generateHTML.getHTML(teamData), err => {
        if (err) throw err;
        else
            console.log('Index.html is comple');
    })
);

managerQuestions()
    .then(buildTeam)
  

//TODO: create a fuction to write HTML file
// const writeHTML = (res) => (
//     fs.writeFile()
// )