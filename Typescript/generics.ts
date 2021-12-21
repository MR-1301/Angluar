function insertAtBeginning(array: any[], value: any) {
    const newArray = [value, ...array]
    return newArray;
}

const myArray=[1,2,3,4]
let updatedArray=insertAtBeginning(myArray,-1)

function insertAtBeginning1<T>(array: T[], value: T) {
    const newArray = [value, ...array]
    return newArray;
}
let upArray=insertAtBeginning1(myArray,-1)