import { alphanumericComparator, stringToNumber } from "../../classes/utility.js"

function merge(left, right) {
    let arr = []
    // Break out of loop if any one of the array gets empty
    while (left.length && right.length) {
        // Pick the smaller among the smallest element of left and right sub arrays 
        if (left[0] < right[0]) {
            arr.push(left.shift())  
        } else {
            arr.push(right.shift()) 
        }
    }
    
    // Concatenating the leftover elements
    // (in case we didn't go through the entire left or right array)
    return [ ...arr, ...left, ...right ]
}

function mergeSort(array) {
	const half = array.length / 2
	
	// Base case or terminating case
	if(array.length < 2){
	  return array 
	}
	
	const left = array.splice(0, half)
	return merge(mergeSort(left),mergeSort(array))
}


function mergeTest(left, right, dataPointIndex) {
    let arr = []

    const option = { numeric: true, sensitivity: 'base' };
    const collator = new Intl.Collator(undefined, option);

    // Break out of loop if any one of the array gets empty
    while (left.length && right.length) {
        // Pick the smaller among the smallest element of left and right sub arrays 
		const leftValue = stringToNumber(left[0][dataPointIndex]).realVal
		const rightValue = stringToNumber(right[0][dataPointIndex]).realVal
        // if ( alphanumericComparator(rightValue, leftValue) ) {
        //     arr.push(left.shift())  
        // } else {
        //     arr.push(right.shift()) 
        // }
		
		if( typeof(leftValue) === 'string' || typeof(rightValue) === 'string' ) {
			alphanumericComparator(rightValue, leftValue, collator) ?  arr.push(left.shift()) : arr.push(right.shift());
			continue;
		}

		leftValue < rightValue ?  arr.push(left.shift()) : arr.push(right.shift());
    }
    
    // Concatenating the leftover elements
    // (in case we didn't go through the entire left or right array)
    return [ ...arr, ...left, ...right ]
}

function mergeSortTest(array, dataPointIndex) {

	// Base case or terminating case
	if(array.length < 2) return array;

	const half = array.length / 2
	
	const left = array.splice(0, half)
	return mergeTest(mergeSortTest(left, dataPointIndex),mergeSortTest(array, dataPointIndex), dataPointIndex)
}


function merge2(left, right, dataPointIndex) {
    let arr = []
    // Break out of loop if any one of the array gets empty
    while (left.length && right.length) {
        // Pick the smaller among the smallest element of left and right sub arrays 
        if (stringToNumber(left[0][dataPointIndex]).realVal < stringToNumber(right[0][dataPointIndex]).realVal) {
            arr.push(left.shift())  
        } else {
            arr.push(right.shift()) 
        }
    }
    
    // Concatenating the leftover elements
    // (in case we didn't go through the entire left or right array)
    return [ ...arr, ...left, ...right ]
}

function mergeSort2(array, dataPointIndex) {
	const half = array.length / 2
	
	// Base case or terminating case
	if(array.length < 2){
	  return array 
	}
	
	const left = array.splice(0, half)
	return merge2(mergeSort2(left, dataPointIndex),mergeSort2(array, dataPointIndex), dataPointIndex)
}

export {
    mergeSort,
    mergeSortTest
}
