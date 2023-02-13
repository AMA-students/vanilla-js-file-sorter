import { alphanumericComparator, stringToNumber, isValidNumberButWithCommaValidator } from "../../classes/utility.js"

function merge(left, right, dataPointIndex) {
    let arr = []

    const option = { numeric: true, sensitivity: 'base' };
    const collator = new Intl.Collator(undefined, option);

    // Break out of loop if any one of the array gets empty
    while (left.length && right.length) {
        // Pick the smaller among the smallest element of left and right sub arrays 
		// const leftValue = stringToNumber(left[0][dataPointIndex]).realVal
		// const rightValue = stringToNumber(right[0][dataPointIndex]).realVal

		const [leftValue, rightValue] = mode(left[0], right[0], dataPointIndex)
		
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

function mergeSort(array, dataPointIndex) {

	// Base case or terminating case
	if(array.length < 2) return array;

	const half = array.length / 2
	
	const left = array.splice(0, half)
	return merge(mergeSort(left, dataPointIndex),mergeSort(array, dataPointIndex), dataPointIndex)
}

const mode = (currentX, currentY, dataPointIndex) => {

    if(dataPointIndex == null) {

        return [
            currentX,
            currentY
        ] = isValidNumberButWithCommaValidator(currentX, currentY);
    }


    return [
        currentX,
        currentY
    ] = isValidNumberButWithCommaValidator(currentX[dataPointIndex], currentY[dataPointIndex]);
}

export {
    mergeSort
}
