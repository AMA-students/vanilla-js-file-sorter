import { CSVParser, fileParse } from "../js/classes/CSVParser.js";

import { removeUndefined } from "../js/classes/utility.js";

import { dataRecordersMap } from "../js/maps/dataRecorderMaps.js";

import bubbleSort from "../js/functions/data-based-sorters/bubbleSort.js";

import { mergeSort } from "../js/functions/data-based-sorters/mergeSort.js";

import divider from "../js/functions/elementLimiter.js";
// import { clearBtn } from "../js/buttons.js";
import { selectionSort } from "../js/functions/data-based-sorters/selectionSort.js";
import quickSort from "../js/functions/data-based-sorters/quickSort.js";

console.log("test");

const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.9;

const ctx = canvas.getContext("2d");

function drawRect(x, y, w, h, c) {
	ctx.beginPath();
	ctx.fillStyle = c;
	ctx.fillRect(x, y, w, h);
}

let zoom = 1.0; // initial zoom value

function zoomOut() {
	zoom *= 0.9; // decrease the zoom level
	ctx.setTransform(zoom, 0, 0, zoom, 0, 0);
	draw(); // redraw the canvas
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const padding = 20;

const files = {
	0: "sample4.json",
	1: "example_2.json",
	2: "testjson2.json",
	3: "8.csv",
	4: "31.csv",
	5: "500.csv",
	6: "99K.csv",
	7: "100.csv",
};

// const fileName = files[3];
const fileName = files[3];

const fileParseParam = [fileName];

fileParse(...fileParseParam).then(data => {
	const dataRecorder = dataRecordersMap(fileName, "v2");

	if (dataRecorder.type === "CSV") {
		dataRecorder.initializeFileContent(data);

		console.log(dataRecorder);

		let CSV = removeUndefined(CSVParser(dataRecorder.splitFile));

		dataRecorder.initializeParsedFileContent(CSV);
		console.log(dataRecorder);
	}

	if (dataRecorder.type === "JSON") {
		if (false) {
			const propertyPath = ["quiz", "sport", "q1", "options"];

			console.log(traverser(json, propertyPath));
		}

		const getObjKeys = obj => {
			return Object.entries(obj).map(entry => entry[0]);
		};

		const getObjValues = obj => {
			return Object.entries(obj).map(entry => entry[1]);
		};

		dataRecorder.initializeFileContent(data);

		dataRecorder.initializeParsedFileContent();
	}
	console.log(dataRecorder);
	dataRecorder.initializeFileContentRecords();

	dataRecorder.initializeDatapointIndex(2);

	const unsorted = [...dataRecorder.fileContentRecords];
	// let result = bubbleSort(dataRecorder.fileContentRecords, 1, dataRecorder);
	let result = mergeSort(
		dataRecorder.fileContentRecords,
		dataRecorder.datapointIndex,
		dataRecorder
	);
	// let result = selectionSort(dataRecorder.fileContentRecords, 1, dataRecorder)
	// let result = quickSort(dataRecorder.fileContentRecords, 1, dataRecorder)

	const worker = new Worker("./tests/test2-worker.js", { type: "module" });

	worker.postMessage([1, JSON.stringify(dataRecorder)]);

	worker.onmessage = message => {
		console.log(message);
	};

	const contentLength = dataRecorder.fileContentRecords.length;

	const width = canvas.width;
	const height = canvas.height;

	const paddedWidth = canvas.width - padding;
	const paddedHeight = canvas.height - padding;
	const doublePadding = padding * 2;

	ctx.beginPath();
	ctx.moveTo(padding, padding);
	ctx.lineTo(padding, paddedHeight);
	ctx.lineTo(paddedWidth, paddedHeight);
	ctx.moveTo(padding, padding); // startingPoint
	ctx.lineTo(paddedWidth, padding); // x:paddedWidth y: padding
	ctx.lineTo(paddedWidth, paddedHeight); // from paddedWidth paddedHeight
	ctx.strokeStyle = "red";
	ctx.stroke();

	const w = (width - doublePadding) / (contentLength * 2);

	const aveHeightIncr = (paddedHeight - doublePadding) / contentLength;

	const segmented = divider(result, 100);
	let array = [];

	//
	segmentedLooper(segmented, (counter, x, y) => {
		const currentRecord = dataRecorder.fileContentRecords[counter];

		currentRecord.height = (counter + 1) * aveHeightIncr;

		const lastElemIndex = currentRecord.moveHistory.length - 1;

		array.push([
			currentRecord.moveHistory[0],
			currentRecord.moveHistory[lastElemIndex],
		]);
	});

	function segmentedLooper(segmented, cb) {
		let counter = 0;

		for (let x = 0; x < segmented.length; x++) {
			const segments = segmented[x];
			for (let y = 0; y < segments.length; y++) {
				cb(counter, x, y);
				counter++;
			}
		}
	}

	//sorted
	if (false) {
		array.forEach((record, index) => {
			const h = (index + 1) * aveHeightIncr;
			const x = index * w * 2 + padding;
			const y = height - h - padding;
			drawRect(x, y, w, h);
		});
		return;
	}

	const delay = (array.length / 2500) * 100;

	function rectsRecorder(segmentedArr) {
		const canvasRects = [];

		let count = 0;
		let index = 0;

		(async function segmentedRender(segmentedArr) {
			console.log(segmentedArr);

			for (let i = 0; i < segmentedArr[count].length; i++) {
				const currentRecord = dataRecorder.fileContentRecords.find(
					record => record.moveHistory[0] === index
				);

				const h = currentRecord.height;

				const x = index * w * 2 + padding;

				const y = height - h - padding;

				currentRecord.rect = {
					x,
					y,
					w,
					h,
					draw: function (c = this.c) {
						this.c = c;
						drawRect(this.x, this.y, this.w, this.h, this.c);
					},
					animate: function ({ x, y, w, h, c }) {
						this.x = x;
						this.y = y;
						this.w = w;
						this.h = h;
						this.c = c;
						// console.log(this.x, this.w, this.h);
						// this.x += 2;
						this.draw();
					},
				};

				canvasRects.push({
					x,
					y,
					w,
					h,
					draw: function (c = this.c) {
						this.c = c;
						drawRect(this.x, this.y, this.w, this.h, this.c);
					},
					animate: function ({ x, y, w, h, c }) {
						this.x = x;
						this.y = y;
						this.w = w;
						this.h = h;
						this.c = c;
						// console.log(this.x, this.w, this.h);
						// this.x += 2;
						this.draw();
					},
				});
				index++;
			}

			if (count < segmentedArr.length - 1) {
				segmentedRender(segmentedArr);
			}

			count++;
		})(segmentedArr);

		return canvasRects;
	}

	const segmentedArr = divider(array, 2500);

	const rects = rectsRecorder(segmentedArr);
	const comparisons = [...dataRecorder.comparisonHistory];

	let index = 0;

	// console.clear();
	console.log(rects, "rects");
	console.log(
		rects.map(elem => elem.h),
		"rects h"
	);

	console.log(comparisons);

	let currentArr = [...unsorted];
	console.log({ currentArr, unsorted });

	// interval based
	if (true) {
		// if (false) {
		forRender();
		async function forRender() {
			for (let i = 0; i < comparisons.length; i++) {
				// update();
				// console.log([...currentArr]);
				mergeSortUpdater();
				await new Promise(resolve => setTimeout(resolve, 1000));
				// await new Promise(resolve => setTimeout(resolve, 0));
			}
		}
		console.log("done");
	}
	// for (let i = 0; i < currentArr.length; i++) {
	// 	rects[i].draw();
	// }

	// mergeSortUpdater();
	// function that will take the curr comparison and update
	async function mergeSortUpdater() {
		// clear the canvas
		ctx.clearRect(
			padding,
			padding,
			paddedWidth - padding,
			paddedHeight - padding
		);

		const { currentSubstring, result } = comparisons[index];

		console.log(comparisons[index]);
		// draw each rects
		for (let i = 0; i < currentArr.length; i++) {
			currentArr[i].rect.draw();
			// console.log(currentArr[i].rect.h);
		}

		update(comparisons[index], currentSubstring);

		// perform changes
		if (comparisons.length - 1 !== index) {
			index++;
		}

		async function update(comparison, currentSubstring) {
			console.log(currentSubstring);
			const indexes = currentSubstring.map(elem => {
				return elem.moveHistory[0];
			});

			const startIdx = Math.min(...indexes);
			const lastIdx = Math.max(...indexes);

			const tobeReplaced = [...currentArr].slice(
				startIdx,
				lastIdx + 1,
				...currentSubstring
			);

			let outerIdx = 0;
			for (let i = startIdx; i < lastIdx + 1; i++) {
				const aux = currentArr[i].rect.h;
				const aux2 = currentArr[i].rect.y;

				console.table({
					before: result,
					currValue: currentArr[i].value,
					currH: currentArr[i].rect.h,
					curSubValue: currentSubstring[outerIdx].value,
					currsubH: currentSubstring[outerIdx].rect.h,
				});

				if (result) {
					currentArr[i].rect.h = currentSubstring[outerIdx].rect.h;
					currentArr[i].rect.y = currentSubstring[outerIdx].rect.y;

					currentSubstring[outerIdx].rect.h = aux;
					currentSubstring[outerIdx].rect.y = aux2;
				}

				console.table({
					after: result,
					currValue: currentArr[i].value,
					currH: currentArr[i].rect.h,
					curSubValue: currentSubstring[outerIdx].value,
					currsubH: currentSubstring[outerIdx].rect.h,
				});

				outerIdx++;
			}
			console.log([...currentArr]);
			// currentSubstring.forEach((elem, idx) => {
			// 	const aux = elem.rect.h;
			// 	const aux2 = elem.rect.y;

			// 	elem.rect.h = tobeReplaced[idx].rect.h;
			// 	elem.rect.y = tobeReplaced[idx].rect.y;

			// 	tobeReplaced[idx].rect.h = aux;
			// 	tobeReplaced[idx].rect.y = aux2;
			// });
		}
	}

	// for (let i = 0; i < rects.length; i++) {
	// 	rects[i].draw();
	// }

	// update();
	async function update() {
		ctx.clearRect(
			padding,
			padding,
			paddedWidth - padding,
			paddedHeight - padding
		);

		const { left, right, comparison } = comparisons[index];

		for (let i = 0; i < rects.length; i++) {
			rects[i].draw();
		}

		if (comparison) {
			const aux = rects[left].h;
			const aux2 = rects[left].y;

			rects[left].h = rects[right].h;
			rects[left].y = rects[right].y;

			rects[right].h = aux;
			rects[right].y = aux2;

			// await new Promise(resolve => setTimeout(resolve, 1000));
		}

		if (comparisons.length - 1 !== index) {
			index++;
		}
		// console.log("test");
		// requestAnimationFrame(update);
	}

	function animate({ left, right, comparison }) {
		if (comparison) {
		}
	}
});
