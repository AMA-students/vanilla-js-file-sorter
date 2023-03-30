import { alphanumericComparator, sortingMode } from "../../classes/utility.js";

const option = { numeric: true, sensitivity: "base" };
const collator = new Intl.Collator(undefined, option);

function merge(left, right, dataPointIndex, dataRecorder, startIndex) {
	let arr = [];

	let result;

	// Break out of loop if any one of the array gets empty
	while (left.length && right.length) {
		// Pick the smaller among the smallest element of left and right sub arrays

		const [leftValue, rightValue] = sortingMode(
			left[0],
			right[0],
			dataPointIndex,
			dataRecorder
		);

		const comparison = { left: null, right: null, comparison: null };

		if (typeof leftValue === "string" || typeof rightValue === "string") {
			result = alphanumericComparator(rightValue, leftValue, collator);

			// each array removes the pushed elements until one or both of them is empty
			result ? arr.push(left.shift()) : arr.push(right.shift());

			// test for recordDataForVisualizer
			if (dataRecorder) {
				recordDataForVisualizer(result, comparison, arr, left, right);
			}

			comparison.comparison = result;

			dataRecorder?.recordComparison({
				currSubArr: [...arr, ...left, ...right],
				result: result,
			});

			continue;
		}

		result = leftValue < rightValue;

		result ? arr.push(left.shift()) : arr.push(right.shift());

		dataRecorder?.recordComparison({
			currSubArr: [...arr, ...left, ...right],
			result: result,
		});

		// test for recordDataForVisualizer
		if (dataRecorder) {
			recordDataForVisualizer(result, comparison, arr, left, right);
		}

		comparison.comparison = result;
	}

	if (dataRecorder) {
		dataRecorder.fileContentRecords = [...arr, ...left, ...right];
	}

	return [...arr, ...left, ...right];
}

function mergeSort(array, dataPointIndex, dataRecorder, startIndex = 0) {
	// Base case or terminating case
	if (array.length < 2) return array;

	const half = Math.floor(array.length / 2);

	const left = array.splice(0, half);

	return merge(
		mergeSort(left, dataPointIndex, dataRecorder),
		mergeSort(array, dataPointIndex, dataRecorder, half),
		dataPointIndex,
		dataRecorder,
		startIndex
	);
}

function recordDataForVisualizer(result, comparison, arr, left, right) {
	if (result) {
		right[0].recordMove(arr.length);
		comparison.left = [arr[0].value, arr[0].moveHistory?.slice(-1)[0]];
		comparison.right = [right[0].value, right[0].moveHistory?.slice(-1)[0]];
	} else {
		left[0].recordMove(arr.length);
		comparison.left = left[0].moveHistory?.slice(-1)[0];
		comparison.right = arr[0].moveHistory?.slice(-1)[0];
		comparison.value = left[0].value;
		comparison.comparedTo = arr[0].value;
	}
}
export { mergeSort };
