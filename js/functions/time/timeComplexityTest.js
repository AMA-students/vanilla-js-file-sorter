

function checkTime(arr){ // To compare everything
    let time;
    let n = arr.length;

    // f(n) = O(g(n))
    // f(n) > c.g(n)
    // c and n0 are constant
    

    //Big O: Worst Case   : Upperbound Function
    //Omega: Best case    : Lowerbound Function
    //Theta: Average Case : Average
 
}

function checkAllSorting(arr){
    const sorts = [
        ['Selection: ', 0],
        ['Bubble: ', 0],
        ['Insertion: ', 0],
        ['Merge: ', 0],
        ['Quick: ', 0]
    ];

    // console.log("Array");
    // console.log(arr);
    
    let n = arr.length;
    console.log(n);

    let x = allSortingFunctions(n);
    // console.log(x);
    // console.log(sorts[0][1]);    
    for(let i = 0; i<sorts.length; i++){
        // sorts.splice(1, 1, x[i]);
        // console.log(sorts[i]);
        // console.log(x[i]);
        sorts[i][1] = x[i];
    }

    // console.log(sorts);

    // for(i = 0; i<=4; i++){
    //     sorts.set(sorts[i].)
    // }
    return sorts;
}

function allSortingFunctions(n){ // n = array length
    let x_arr = [];
    let sortingFunctions = [
        selectionF,
        bubbleF,
        insertionF,
        mergeF,
        quickF ];
    
    for(let i = 0; i < 5; i++){
        x_arr[i] = elevenFunction(sortingFunctions[i], n)
    }
    
    // console.log(elevenFunction(selectionF, n));
    // console.log(elevenFunction(bubbleF, n));
    // console.log(elevenFunction(insertionF, n));
    // console.log(elevenFunction(mergeF, n));
    // console.log(elevenFunction(quickF, n));

    return x_arr;
}


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
    checkAllSorting
}