function swap(items, leftIndex, rightIndex){
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}
 
export function selectionSort(arr)
{
    let n = arr.length;
    var i, j, min_idx;
 
    // One by one move boundary of unsorted subarray
    for (i = 0; i < n-1; i++)
    {
        // Find the minimum element in unsorted array
        min_idx = i;
        for (j = i + 1; j < n; j++)
        if (arr[j] < arr[min_idx])
            min_idx = j;
 
        // Swap the found minimum element with the first element
        swap(arr,min_idx, i);
    }
}

// Bubble sort
export function bubbleSort(arr)
{
    let n = arr.length;
    let i, j;
    for (i = 0; i < n-1; i++)
    {
        for (j = 0; j < n-i-1; j++)
        {
            if (arr[j] > arr[j+1])
            {
                // console.log(arr);
            swap(arr,j,j+1);
                // console.log(arr);
            }
        }
    }
}

// Insertion Sort
export function insertionSort(arr) 
{ 
    let n = arr.length;
    let i, key, j; 
    for (i = 1; i < n; i++)
    { 
        key = arr[i]; // Right position
        j = i - 1; //Left position
   
        /* Move elements of arr[0..i-1], that are 
        greater than key, to one position ahead 
        of their current position */
        while (j >= 0 && arr[j] > key) // While left position is greater than right position
        { 
            arr[j + 1] = arr[j]; 
            j = j - 1; 
        } 
        arr[j + 1] = key; 
        // console.log("Test");
        // console.log(arr);
    }
    return arr
}

// Quick Sort
export function quickSort(array) {
    if (array.length <= 1) {
        return array;
    } else {
        var pivot = array[0]; // Set first element as pivot
        var left = [];
        var right = [];
        for (var i = 1; i < array.length; i++) {
            if (array[i] < pivot) {
                left.push(array[i]);
            } else {
                right.push(array[i]);
            }
        }
        return quickSort(left).concat(pivot, quickSort(right));
    }
}

// Merge Sort
 
function merge(left, right) {
    let arr = [];
    // Break out of loop if any one of the array gets empty
    while (left.length && right.length) {
        // Pick the smaller among the smallest element of left and right sub arrays 
        if (left[0] < right[0]) {
            arr.push(left.shift());
        } else {
            arr.push(right.shift());
        }
    }
    
    // Concatenating the leftover elements
    // (in case we didn't go through the entire left or right array)
    // console.log([...arr, ...left, ...right ]);
    return [ ...arr, ...left, ...right ]
}
 
var count = 0;
// For counting iterations of merge sort

// l is for left index and r is
// right index of the sub-array
// of arr to be sorted */
export function mergeSort(arr) {
    // const arr = JSON.parse(JSON.stringify(array));
    const half = arr.length / 2

    // Base case or terminating case
    if(arr.length <= 1){
        // console.log(array);
      return arr 
    }
    
    const left = arr.splice(0, half);

    // console.log({Array: [...left], Side:"Left half", Count: count});
    // console.log({Array: [...array], Side:"Right half", Count: count});
    // count++; // To count iterations of merge sort
    return merge(mergeSort(left),mergeSort(arr));
}