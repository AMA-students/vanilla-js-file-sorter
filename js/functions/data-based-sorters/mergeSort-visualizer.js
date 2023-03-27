import { alphanumericComparator, sortingMode } from "../../classes/utility.js";
let idx = 0;

const option = { numeric: true, sensitivity: "base" };
const collator = new Intl.Collator(undefined, option);

function merge(left, right, dataPointIndex, dataRecorder, startIndex) {
	let arr = [];

	// console.table({ arr, left, right, startIndex, idx });

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

			const leftStartIndex = startIndex + arr.length - left.length;
			const rightStartIndex = leftStartIndex + left.length;

			if (result) {
				right[0].recordMove(startIndex + arr.length);
				comparison.left = [arr[0].value, arr[0].moveHistory?.slice(-1)[0]];
				comparison.right = [
					right[0].value,
					startIndex + right[0].moveHistory?.slice(-1)[0],
				];
				comparison.arr = arr;
				comparison.leftArr = left;
				comparison.rightArr = right;
				comparison.startIdx = startIndex;

				comparison.currArrMoveHistory = [...arr[0].moveHistory];
				comparison.currRightMoveHistory = [...right[0].moveHistory];

				comparison.complete = [...arr, ...left, ...right];
			} else {
				left[0].recordMove(arr.length);
				comparison.startIdx;
				comparison.left = left[0].moveHistory?.slice(-1)[0];
				comparison.right = arr[0].moveHistory?.slice(-1)[0];

				comparison.value = left[0].value;
				comparison.comparedTo = arr[0].value;
			}

			comparison.comparison = result;

			// dataRecorder?.recordComparison(comparison);
			dataRecorder.recordComparison({
				currSubArr: [...arr, ...left, ...right],
				result: result,
			});

			continue;
		}

		result = leftValue < rightValue;

		result ? arr.push(left.shift()) : arr.push(right.shift());

		idx++;

		dataRecorder.recordComparison({
			currSubArr: [...arr, ...left, ...right],
			result: result,
		});

		if (result) {
			right[0].recordMove(startIndex + arr.length);
			comparison.left = [arr[0].value, arr[0].moveHistory?.slice(-1)[0]];
			comparison.right = [
				right[0].value,
				startIndex + right[0].moveHistory?.slice(-1)[0],
			];
			comparison.arr = arr;
			comparison.leftArr = left;
			comparison.rightArr = right;
			comparison.startIdx = startIndex;

			comparison.currArrMoveHistory = [...arr[0].moveHistory];
			comparison.currRightMoveHistory = [...right[0].moveHistory];

			comparison.complete = [...arr, ...left, ...right];
		} else {
			left[0].recordMove(arr.length);
			comparison.startIdx;
			comparison.left = left[0].moveHistory?.slice(-1)[0];
			comparison.right = arr[0].moveHistory?.slice(-1)[0];

			comparison.value = left[0].value;
			comparison.comparedTo = arr[0].value;
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

function sortRecorder(dataRecorder) {
	dataRecorder.fileContentRecords;
}

export { mergeSort };
