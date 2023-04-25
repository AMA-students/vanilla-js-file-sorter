import {
    bubbleSort,
    insertionSort,
    selectionSort,
    quickSort,
    mergeSort
} from "./js/functions/time/sortingFunctions.js";

import {printArray, 
    container,
    resultContainer, 
    printTime,
} from "./js/functions/toPage.js";

// checkAllSorting and allSortingFunctions is the same
import {
    allSortingFunctions, // Only this needed
    checkTime,
    getBigO
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


// To run/test all sorting functions
// console.log('All sorting functions');
// let y = allSortingFunctions(n)
// console.log(y);

// console.log('Check all sorting');
// let z = checkAllSorting(toSort);
// console.log(z);
// printTime(z); // Prints the result of the checkAllSorting function from timeComplexityTest

let times = checkTime(n)
resultContainer.innerHTML += "The fastest time is: ";
resultContainer.innerHTML += `${times}` + '<br>';
// console.log(times);
// printArray(times)


// Parsing CSV files
const fileUpload = document.querySelector('#fileUpload')
const fileInput = document.querySelector('#file');
const fileSubmit = document.querySelector('#fileSubmit');
const preview = document.querySelector('#preview');

fileUpload.addEventListener("change", () => {
    const fr = new FileReader();
    fr.readAsText(fileInput.files[0]);
    
    fr.addEventListener('load', () => {
        const csv = fr.result;

        const array = csv.split('\r\n').map((line) => {
            return line.split(',');
        })
        console.log(array);


        // Create the table to display data
        // const table = document.createElement('table');

        // array.forEach((line, index) => {
        //     const tr = document.createElement('tr');

        //     line.forEach(cell => {
        //         let td;
        //         if(index === 0){
        //             td = document.createElement('th');
        //             console.log(cell);
        //         }else{
        //             td = document.createElement('td');
        //         }
        //         td.textContent = cell;
        //         tr.appendChild(td);
        //     })
        //     table.appendChild(tr);
        // });

        // preview.appendChild(table);

        // const html = preview.innerHTML;

        // const pre = document.createElement('pre');
        // const code = document.createElement('code');

        // code.innerText = html;

        // pre.appendChild(code);
        // document.body.appendChild(pre);
    })
})

// fileSubmit.addEventListener("click", () => {
    
//     console.log(fileInput.files[0]);
// })

const sizeForm = document.querySelector('#askSize');
const sizeInput = document.querySelector('#sizeInput');
const sizeSubmit = document.querySelector('#sizeSubmit');
let sizeGet;
function fun1(){
    preview.innerHTML = sizeInput.value;
}
sizeSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    sizeGet = sizeInput.value
    console.log(sizeGet);
})

// console.log(sizeGet);
// console.log(allSortingFunctions(sizeGet));
let notation = ["Value", "Quadratic", "Log-Linear"]
const bigOArray = getBigO();
bigOArray.forEach((element, index) => {
    // console.log(element);
resultContainer.innerHTML += `<br>` + notation[index];
    element.forEach(element => {
        console.log(element);
        resultContainer.innerHTML += `<br>` + element;
    });
    resultContainer.innerHTML += `<br>`;
});

console.log(bigOArray);
console.log(allSortingFunctions(n));