class Student {
    // firstName: string;
    // lastName: string;
    // age: number;
    // private courses: string[]

    constructor(public firstName: string,public lastName: string,public age: number,private courses: string[]) {
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
    enroll(courseName: string) {
        this.courses.push(courseName)
    }

    listCourses() {
        return this.courses.slice()
    }
}

const student = new Student("mahir", "ratanpara", 20, ['LOL', 'LOL1', 'LOL2'])
student.enroll("Typescript")