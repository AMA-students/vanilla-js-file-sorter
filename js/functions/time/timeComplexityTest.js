import { insertionSort } from "./sortingFunctions.js"; 

// Function array of the time complexity of each sorting algorithm
const sortingFunctions = [selectionF, bubbleF, insertionF, mergeF, quickF];  

// console.log(sorts);
// let tryTest =sorts[0].selection

// let x = 'test'; // Key
// sorts[0][x] = 'test'; // Value


// console.log(trySort);
// console.log("Test above");
// console.log(sorts);

function checkTime(n){ // To compare all sorting functions
    // console.log(arr);
    const time = allSortingFunctions(n); // Returns the math equivalent result of the sorting algorithm
    // console.log(time);
    let time2 = [];
    time.forEach((index, i) => {
            time2[i] = Object.entries(index);
    });
        
    let time3 = time2.flat()
    let values = time3.map(index => {
        return index[1];
    })
    // console.log(values);
    // console.log(time3);
    // console.log(time2);
    const x = insertionSort(values);
    // console.log(x);
    // console.log(x);


    // f(n) = O(g(n))
    // f(n) > c.g(n)
    // c and n0 are constant
    
    //Big O: Worst Case   : Upperbound Function
    //Omega: Best case    : Lowerbound Function
    //Theta: Average Case : Average
    // console.log(x);
    return x[0]; // [0] = fastest, [n] = slowest
}

// function checkAllSorting(arr){
//     console.log("Array below");
//     console.log(arr);
//     let temp_arr = {};
//     const trySort = new sortingList();

//     let n = arr.length; //Modifier
//     console.log(n);

//     let resultOf = allSortingFunctions(n); // Returns the math equivalent result of the sorting algorithm

//     // for(let index in sorts){
//     //     console.log(sorts[index]);
//     //     trySort.sortMethod = sorts[index];
//     //     temp_arr[index] = trySort
//     //     console.log(temp_arr);
//     // }

//     console.log('temp arr below');
//     // console.log(temp_arr);
    
//     // return temp_arr;
// };

function getBigO(){
    const sample = [10, 100, 1000, 10000, 100000, 1000000]
    let bigQ = [], bigLL = [];
    sample.forEach(elem => {
        bigQ.push(quadratic(elem));
        bigLL.push(linearLog(elem));
    });
    // console.log(bigQ);
    // console.log(bigLL);
    // console.log([bigQ, bigLL]);
    return [sample, bigQ, bigLL];
}


// This calculates the time complexity of all sorting functions based on the array size
// Uncomment elevenFunction() if you want to calculate the time complexity with 11 modifiers
// Only choose one between elevenFunction() and oneFunction()
// This also assigns to an object the modifier as the key and the result as the value
function allSortingFunctions(n){ // n = array length
    const sorts = [{}, {}, {}, {}, {}];
    // let x = 'test'; // Key
    // sorts[0][x] = 'test'; // Value

    
    let x_arr = [];
    for(let i = 0; i < 5; i++){ // Loops through all sorting algorithm functions that contain the mathematical expression
        // x_arr[i] = elevenFunction(sortingFunctions[i], n);
        x_arr[i] = oneFunction(sortingFunctions[i], n);
    }
    let nArr = x_arr.length;
    let nArr2;
    // console.log(x_arr[0][0].length);
    // console.log(x_arr);
    if(x_arr[0][0].length > 2){
        nArr2 = x_arr[0][0].length; // If using elevenFunction
    }else if(x_arr[0].length <= 2){
        nArr2 = x_arr[0].length; // If using oneFunction
    }
    
    // console.log("nArr");
    // console.log(nArr);
    // console.log("nArr2");
    // console.log(nArr2);

    for(let i = 0; i<nArr; i++){
        for(let j = 0; j<nArr2; j++){
            if(x_arr[0][0].length > 2){
                sorts[i][x_arr[i][0][j]] = x_arr[i][1][j]; // If using elevenFunction
                // console.log(sorts[i][x_arr[i][0][j]] = x_arr[i][1][j]);
            }else if(x_arr[0].length <= 2){
                sorts[i][x_arr[i][j]] = x_arr[i][j+1] // If using oneFunction
                // console.log(sorts[i][x_arr[i][j]]);
                break
            }
            
        }
    }
    // console.log(sorts);
    // console.log(x_arr);

    return sorts; 
    // Returns a 2d array[][] with these values:
    // [0][0] = modfier, [0][1] = result ; Returns the modifier and result values based on the modifier
}

// function returnAllSorting(n){ // Takes in the array size
//     const sorts = {{}, {}, {}, {}, {}};



// =====================================================================================================================================
// Maybe to add to another module
// Sorting algorithm as mathematical / representations below

const c = 1; // constant time

// 
// function oneEquation(n){
//     let x_arr = [];
//     // sortingFunctions[i]

//     for(let i = 0; i < 5; i++){
//         x_arr[i] = oneFunction(sortingFunctions[i], n);
//     }

//     return [x_arr];
// }

function elevenFunction(func, n) // n = array length
{
    // let counter = 0;
    let x_arr = []; // Stores the modifier
    let y_arr = []; // Stores the result value
    console.log();
    for(let i = 0; i<=10; i++) // n - 5 , n - 4, n -3 ... n + 5
    {       
        // console.log(n-(i-5));    
        if(n+(i-5) < 0){ // If modifier value becomes less than 0
            continue
        }else   
        x_arr[i] = (n+(i-5));
        y_arr[i] = func(n+(i-5));
        // console.log(x_arr);
        // console.log(y_arr);
        // arr.push(i-5);
        // counter++;
    }

    // console.log([x_arr, y_arr]);
    return [x_arr, y_arr];
    // console.log(counter);
}
function oneFunction(func, n){
    let result;
    console.log();
    
    result = func(n);
    // console.log(n, result);
    return [n, result];
    // console.log(counter);
}

// Mathematical Expressions of Sorting Algorithms
function quadratic(n){
    let result = Math.pow(n,2);
    return result;
}
function selectionF(n){
    let result = 4 * Math.pow(n,2) + n*c + c; // 4n^2 + n + 1
                                          // Big O(n^2)
    return result;
}
function bubbleF(n){
    let result = Math.pow(n,2) + 4*n + c; // n^2 + 4nc + c
                                        // Big O(n^2)
    return result;
}
function insertionF(n){
    let result = Math.pow(n,2) + 2*n + 2*c; // n^2c + 2nc + 2c
                                         // Big O(n^2)
    return result;
}

// Merge and quick sort is temporarily at n log n
function linearLog(n){
    let result = (n*Math.log2(n));
    return result;
}
function mergeF(n){
    let result = n*Math.log2(n);
    return result;
}
function quickF(n){
    let result = n*Math.log2(n);
    return result;
}


export {
    allSortingFunctions,
    checkTime,
    getBigO
}