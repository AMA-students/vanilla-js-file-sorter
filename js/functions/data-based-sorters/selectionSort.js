import { alphanumericComparator, sortingMode } from "../../classes/utility.js"

function selectionSort(arr, dataPointIndex, dataRecorder) {

	for (let i = 0; i < arr.length; i++) {

		// base lowest
		let lowest = i

		const option = { numeric: true, sensitivity: 'base' };
		const collator = new Intl.Collator(undefined, option);

		// for loop for determining the actual lowest
		for (let j = i + 1; j < arr.length; j++) {
		
			let currentValue, currentLowest;

			[currentValue, currentLowest] = sortingMode(
				arr[j],
				arr[lowest],
				dataPointIndex,
				dataRecorder
			);

			// alpanumeric comparison
			if(typeof(currentValue) === 'string' || typeof(currentLowest) === 'string') {
				if(alphanumericComparator(currentLowest, currentValue, collator)) {
					lowest = j
				}
				continue;
			}

			// number to number comparison
			if ( currentValue < currentLowest ) {
				lowest = j
			}
		}

		// Swap
		if (lowest !== i) {
			[arr[i], arr[lowest]] = [arr[lowest], arr[i]]
		}
	}

	dataRecorder?.initializeSortedParsedFileContent()
	return arr
}

export {
 	 selectionSort,
}