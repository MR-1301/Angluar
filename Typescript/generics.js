var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function insertAtBeginning(array, value) {
    var newArray = __spreadArray([value], array, true);
    return newArray;
}
var myArray = [1, 2, 3, 4];
var updatedArray = insertAtBeginning(myArray, -1);
function insertAtBeginning1(array, value) {
    var newArray = __spreadArray([value], array, true);
    return newArray;
}
var upArray = insertAtBeginning1(myArray, -1);
