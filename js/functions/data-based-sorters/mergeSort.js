import { alphanumericComparator, isValidNumberButWithCommaValidator } from "../../classes/utility.js"

function merge(left, right, dataPointIndex, dataRecorder) {
    let arr = []

    const option = { numeric: true, sensitivity: 'base' };
    const collator = new Intl.Collator(undefined, option);

    // Break out of loop if any one of the array gets empty
    while (left.length && right.length) {
        // Pick the smaller among the smallest element of left and right sub arrays 

		const [leftValue, rightValue] = mode(
			left[0].parsedFileContentLine, 
			right[0].parsedFileContentLine, 
			dataPointIndex
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
