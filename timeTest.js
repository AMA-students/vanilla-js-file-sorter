import {
    bubbleSort,
    insertionSort,
    selectionSort,
    quickSort,
    mergeSort
} from "./js/functions/time/sortingFunctions.js";

import {printArray, 
    container, 
    printTime,
} from "./js/functions/toPage.js";

import {
    selectionF,
    bubbleF,
    insertionF,
    mergeF,
    quickF,
    allSortingFunctions, // Only this needed
    checkAllSorting,
    oneEquation
} from "./js/functions/time/timeComplexityTest.js";



const arr1 = [5, 1, 4, 2, 8];
// var n1 = arr1.length;
const arr2 = [12, 11, 13, 5, 6 ]; 
// let n2 = arr2.length;
const arr3 = [64, 25, 12, 22, 11];
// var n3 = arr3.length;
const arr4 = [10, 5, 2, 3, 7, 6, 8, 9, 1, 4, 6, 11, 24, 64, 18, 19, 20, 31, 32, 69, 95, 35];
// var n4 = arr4.length;
const arr5 = [12, 11, 13, 5, 6, 7];
// var n5 = arr5.length;

const toSort = arr4 // Array to sort
const arr = JSON.parse(JSON.stringify(toSort)); 
const n = arr.length;
// console.log("Array before anything");
// console.log(arr);
container.innerHTML += ("<br>Unsorted array: \n");
printArray(arr);
container.innerHTML += ("<br>");

// Bubble sort
const bArr = JSON.parse(JSON.stringify(toSort));
console.time('Bubble sort')
bubbleSort(bArr);
console.timeEnd('Bubble sort')
container.innerHTML += ("<br>Sorted bubble sort array: \n");
printArray(bArr);

// Insertion sort
const iArr = JSON.parse(JSON.stringify(toSort));
console.time('Insertion sort')
insertionSort(iArr);
console.timeEnd('Insertion sort')
container.innerHTML += ("<br>Sorted insertion sort array: \n");
printArray(iArr);

// Selection sort
const sArr = JSON.parse(JSON.stringify(toSort));
console.time('Selection sort')
selectionSort(sArr);
console.timeEnd('Selection sort')

container.innerHTML += ("<br>Sorted selection sort array: \n");
printArray(sArr);

// Quick sort
let qArr = JSON.parse(JSON.stringify(toSort));
console.time('quickSort')
const qResult = quickSort(qArr);
console.timeEnd('quickSort')

container.innerHTML += ("<br>Sorted quick sort array: \n");
printArray(qResult);

// console.log("Array before merge sort");
// console.log(arr);

// Merge sort

const mArr = JSON.parse(JSON.stringify(toSort)); // To not remove original array

// console.log(`To sort = ${mArr}`);

console.time('mergeSort')
const mergeResult = mergeSort(mArr);
console.timeEnd('mergeSort')
// console.log(mergeResult);
// console.log(n5);
container.innerHTML += ("<br>Sorted merge sort array: \n");
printArray(mergeResult);

// console.log(`To sort = ${mArr}`);

// console.log("Array after merge sort");
// console.log(arr);

// console.log('Selection Sort: ' + selectionF(n));
// console.log('Bubble Sort: ' + bubbleF(n));
// console.log('Insertion Sort: ' + insertionF(n));
// console.log('Merge Sort: ' + mergeF(n));    
// console.log('Quick Sort: ' + quickF(n));



// const algorithmTimeComplexity = {
//     selectionSort: "O(n^2)",
//     bubbleSort: "O(n^2)",
//     insertionSort: "O(n^2)",
//     mergeSort: "O(n log n)",
//     quickSort: "O(n log n)"
// };

// let x = algorithmTimeComplexity;
// console.log(x); 

console.log('All sorting functions');
let y = allSortingFunctions(n)
console.log(y);

// console.log(toSort);

let z = checkAllSorting(toSort);
// console.log(toSort);
// console.log(toSort.length);
// console.log("Checked");
// console.log(z);

console.log('Check all sorting');
console.log(z);
printTime(z); // Prints the result of the allSortingFunction from timeComplexityTest

// let equation = oneEquation(arr);

// console.log(oneEquation(n));