//Function type and parameters

//Primitive: Numbers, Strings, Boolean
let age: number = 20;
age = 21.2;
age = 40 / 2;
// age='18' will throw an error

let userName: string;
userName = 'Mahir'

let isAdmin: boolean = true;

// more complex types: Arrays, Objects

//array
let hobbies: string[];
hobbies = ['Sports', 'Gym', 'Reading', 'Gaming'];
// hobbies=['Sports','Gym',true,12]; will throw an error

//any type which is by default
let lol: any = 'funny'
lol = 999
lol = true
lol = [11, 343, 'mahir', true]

//object
let person: { name: string, age: number };
person = {
    name: "Mahir",
    age: 18,
}

// person={
//     isEmployee:true
// } will give error.

let peopleRecords: { name: string, age: number }[];