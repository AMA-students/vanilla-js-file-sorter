import { alphanumericComparator, isValidNumberButWithCommaValidator, sortingMode } from "../../classes/utility.js"

function merge(left, right, dataPointIndex, dataRecorder) {
    let arr = []

    const option = { numeric: true, sensitivity: 'base' };
    const collator = new Intl.Collator(undefined, option);

    // Break out of loop if any one of the array gets empty
    while (left.length && right.length) {
        // Pick the smaller among the smallest element of left and right sub arrays 

		const [leftValue, rightValue] = sortingMode(
			left[0], 
			right[0], 
			dataPointIndex,
			dataRecorder
		);

		const comparison = {
			left: leftValue, 
			right: rightValue, 
		}

		dataRecorder?.comparisonHistoryRecorder(comparison)

		let result;

		if( typeof(leftValue) === 'string' || typeof(rightValue) === 'string' ) {

			result = alphanumericComparator(rightValue, leftValue, collator);

			// each array removes the pushed elements until one or both of them is empty
			result ?  arr.push(left.shift()) : arr.push(right.shift());

			comparison.comparison = result

			continue;
		}

		result = leftValue < rightValue;

		result ?  arr.push(left.shift()) : arr.push(right.shift());

		comparison.comparison = result
    }
    
    // Concatenating the leftover elements
    // (in case we didn't go through the entire left or right array)
	dataRecorder?.fileContentRecords = [ ...arr, ...left, ...right ]
    return [ ...arr, ...left, ...right ]
}

function mergeSort(array, dataPointIndex, dataRecorder) {

	// Base case or terminating case
	if(array.length < 2) return array;

	const half = array.length / 2

	const left = array.splice(0, half)
	

    return merge(
		mergeSort(left, dataPointIndex, dataRecorder), 
		mergeSort(array, dataPointIndex, dataRecorder), 
		dataPointIndex, dataRecorder
	)
}

export {
    mergeSort
}
