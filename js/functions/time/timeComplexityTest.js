import { insertionSort } from "./sortingFunctions.js"; 

// Function array of the time complexity of each sorting algorithm
const sortingFunctions = [
    selectionF,
    bubbleF,
    insertionF,
    mergeF,
    quickF]; 


const sorts = ['Selection', 'Bubble', 'Insertion', 'Merge', 'Quick'];

class sortingList{
    constructor(sortMethod, modifier, values){
        this.sortMethod = sortMethod;
        this.modifier = [modifier];
        this.values = [values];
    };


}


// console.log(trySort);
// console.log("Test above");


function checkTime(arr){ // To compare all sorting functions
    // console.log(arr);
    let n = arr.length;
    const time = allSortingFunctions(n);
    const x = insertionSort(time);


    // f(n) = O(g(n))
    // f(n) > c.g(n)
    // c and n0 are constant
    
    //Big O: Worst Case   : Upperbound Function
    //Omega: Best case    : Lowerbound Function
    //Theta: Average Case : Average

    

    return x; // [0] = fastest, [n] = slowest
}

function checkAllSorting(arr){
    console.log("Array below");
    console.log(arr);
    let temp_arr = {};
    const trySort = new sortingList();

    let n = arr.length; //Modifier
    console.log(n);

    let resultOf = allSortingFunctions(n); // Returns the math equivalent result of the sorting algorithm

    for(let index in sorts){
        console.log(sorts[index]);
        trySort.sortMethod = sorts[index];
        temp_arr[index] = trySort
        console.log(temp_arr);
    }

    console.log('temp arr below');
    // console.log(temp_arr);
    
    // return temp_arr;
};

function oneEquation(n){
    let x_arr = [];
    // sortingFunctions[i]

    for(let i = 0; i < 5; i++){
        x_arr[i] = oneFunction(sortingFunctions[i], n);
    }

    return [x_arr];
}

// This calculates the time complexity of all sorting functions based on the array size
// Uncomment elevenFunction() if you want to calculate the time complexity with 11 modifiers
// Only choose one between elevenFunction() and oneFunction()
function allSortingFunctions(n){ // n = array length
    let x_arr = [];

    for(let i = 0; i < 5; i++){
        // x_arr[i] = elevenFunction(sortingFunctions[i], n);
        x_arr[i] = oneFunction(sortingFunctions[i], n);
    }
    
    // console.log(elevenFunction(selectionF, n));
    // console.log(elevenFunction(bubbleF, n));
    // console.log(elevenFunction(insertionF, n));
    // console.log(elevenFunction(mergeF, n));
    // console.log(elevenFunction(quickF, n));

    return x_arr;
}



// Sorting algorithm as mathematical / representations below

const c = 1; // constant time

function elevenFunction(func, n) // n = array length
{
    // let counter = 0;
    let arr = [];
    console.log();
    for(let i = 0; i<=10; i++) // n - 5 , n - 4, n -3 ... n + 5
    {       
        // console.log(n-(i-5));    
        if(n-(i-5) < 0){ // If value becomes less than 0
            continue
        }else
        
        // arr.push(i-5);
        arr.push([(i-5), func(n+(i-5))])
        // counter++;
    }

    return [arr];
    // console.log(counter);
}
function oneFunction(func, n){
    let result;
    console.log();
    
    result = func(n);

    return result;
    // console.log(counter);
}

// Mathematical Expressions of Sorting Algorithms
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

function mergeF(n){
    let result = n*Math.log2(n);;
    return result;
}

function quickF(n){
    let result = n*Math.log2(n);
    return result;
}


export {
    selectionF,
    bubbleF,
    insertionF,
    mergeF,
    quickF,
    allSortingFunctions,
    checkAllSorting,
    oneEquation,
    checkTime
}