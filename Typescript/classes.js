var Student = /** @class */ (function () {
    // firstName: string;
    // lastName: string;
    // age: number;
    // private courses: string[]
    function Student(firstName, lastName, age, courses) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.courses = courses;
        // this.firstName = first;
        // this.lastName = last;
        // this.age = age;
        // this.courses = courses;
    }
    // constructor(first: string,last: string,age: number,courses: string[]) {
    //     // this.firstName = first;
    //     // this.lastName = last;
    //     // this.age = age;
    //     // this.courses = courses;
    // }
    Student.prototype.enroll = function (courseName) {
        this.courses.push(courseName);
    };
    Student.prototype.listCourses = function () {
        return this.courses.slice();
    };
    return Student;
}());
var student = new Student("mahir", "ratanpara", 20, ['LOL', 'LOL1', 'LOL2']);
student.enroll("Typescript");
