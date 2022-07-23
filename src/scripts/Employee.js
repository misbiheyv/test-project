export class Employee {
    fullName = '';
    age = 0;
    position = '';
    expertise = '';

    constructor(fullName, age, position, expertise) {
        this.fullName = fullName
        this.age = age
        this.position = position
        this.expertise = expertise
    }
}