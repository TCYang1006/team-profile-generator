const Employee = require('./Employee');

class Intern extends Employee{
    constructor (name, id, email, schooledu){
        super (name, id, email);
        this.schoolEdu = schooledu;
    }
    getRole(){
        return "Intern";
    }
}

module.exports = Intern;