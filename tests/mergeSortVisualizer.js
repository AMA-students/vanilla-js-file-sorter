import { CSVParser, fileParse } from "../js/classes/CSVParser.js";

import { removeUndefined } from "../js/classes/utility.js";

import { dataRecordersMap } from "../js/maps/dataRecorderMaps.js";

import { mergeSort } from "../js/functions/data-based-sorters/mergeSort-visualizer.js";

import divider from "../js/functions/elementLimiter.js";

const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.9;

const ctx = canvas.getContext("2d");

function drawRect(x, y, w, h, c) {
	ctx.beginPath();
	ctx.fillStyle = c;
	ctx.fillRect(x, y, w, h);
}

const padding = 20;

// list of files
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

// choose file
const fileName = files[5];

const fileParseParam = [fileName];

// file parsing
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

	// dataRecorder current shape
	console.log(dataRecorder);

	dataRecorder.initializeFileContentRecords();

	dataRecorder.initializeDatapointIndex(3);

	const unsorted = [...dataRecorder.fileContentRecords];

	// i-uncomment nyo yung sorter na gagamitin nyo

	let result = mergeSort(
		dataRecorder.fileContentRecords,
		dataRecorder.datapointIndex,
		dataRecorder
	);

	// ignore nyo muna to
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

	// array of initial and final position of each elements
	// index of element before and after being sorted
	let arrOfElemPos = [];

	// ignore nyo muna to
	// arrOfElemPos value setter
	segmentedLooper(segmented, (counter, x, y) => {
		const currentRecord = dataRecorder.fileContentRecords[counter];

		currentRecord.height = (counter + 1) * aveHeightIncr;

		const lastElemIndex = currentRecord.moveHistory.length - 1;

		arrOfElemPos.push([
			currentRecord.moveHistory[0], // initial index of element before sort
			currentRecord.moveHistory[lastElemIndex], // index of element  after sort
		]);
	});

	// test function for looping through as segmented array
	// some array are segmented to optimize the performance
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

	// formula for dynamic delay. Relative to the length of the given array
	const delay = (arrOfElemPos.length / 2500) * 100;

	// function for assigning rects to each element
	function rectsRecorder(segmentedArr) {
		const canvasRects = [];

		let count = 0;
		let index = 0;

		(async function segmentedRender(segmentedArr) {
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

	// divide arrOfElemPos into segments
	const segmentedArr = divider(arrOfElemPos, 2500);

	const rects = rectsRecorder(segmentedArr);

	// comparisons made by the sorter
	const comparisons = [...dataRecorder.comparisonHistory];

	let index = 0;

	console.clear();

	console.log(comparisons);

	let currentArr = [...unsorted];

	// for loop based canvas updater
	if (true) {
		// if (false) {
		forRender();
		async function forRender() {
			// each iteration of for loop is a frame update
			const frameCount = comparisons.length + 5;
			for (let i = 0; i < frameCount; i++) {
				mergeSortVisualizer();

				// delay
				console.log("test2");
				// await new Promise(resolve => setTimeout(resolve, 1000));
				await new Promise(resolve => setTimeout(resolve, 0));
			}
		}
		console.log("done");
	}

	async function mergeSortVisualizer() {
		// clear the canvas
		ctx.clearRect(
			padding,
			padding,
			paddedWidth - padding,
			paddedHeight - padding
		);

		const { currSubArr, result } = comparisons[index];

		// draw current rects
		for (let i = 0; i < currentArr.length; i++) {
			currentArr[i].rect.draw();
		}

		// perform changes
		const indexes = currSubArr.map(elem => {
			return elem.moveHistory[0];
		});

		const startIdx = Math.min(...indexes);
		const lastIdx = Math.max(...indexes);

		const sortedRectX = currSubArr
			.map(elem => elem.rect.x)
			.sort((a, b) => a - b);

		let outerIdx = 0; // indexer for currSubArr
		for (let i = startIdx; i < lastIdx + 1; i++) {
			currentArr[i] = currSubArr[outerIdx];
			currentArr[i].rect.x = sortedRectX[outerIdx];
			// console.log(i, currSubArr[outerIdx], sortedRectX[outerIdx]);
			// console.log(i, currSubArr.slice(-1)[0], sortedRectX.slice(-1)[0]);
			outerIdx++;
		}

		if (comparisons.length - 1 !== index) {
			index++;
		}
	}

	async function mergeSortVisualizer2() {
		// clear the canvas
		ctx.clearRect(
			padding,
			padding,
			paddedWidth - padding,
			paddedHeight - padding
		);

		const { currSubArr, result } = comparisons[index];

		// console.log(comparisons[index]);
		// draw current rects
		for (let i = 0; i < currentArr.length; i++) {
			currentArr[i].rect.draw();
			// console.log(currentArr[i].rect.h);
		}

		// update(comparisons[index], currSubArr);

		// perform changes
		const indexes = currSubArr.map(elem => {
			return elem.moveHistory[0];
		});

		const startIdx = Math.min(...indexes);
		const lastIdx = Math.max(...indexes);

		const sortedRectX = currSubArr
			.map(elem => elem.rect.x)
			.sort((a, b) => a - b);

		// console.log(sortedRectX);

		let outerIdx = 0; // indexer for currSubArr
		for (let i = startIdx; i < lastIdx + 1; i++) {
			// console.log(currentArr[i].value, currentArr[i].rect.x);
			currentArr[i] = currSubArr[outerIdx];
			currentArr[i].rect.x = sortedRectX[outerIdx];
			// console.log(currentArr[i].value, currentArr[i].rect.x);
			// console.log(i, lastIdx);
			// if (i === 1) {
			// 	console.log("test");
			// 	const test = currentArr[i].rect.x;

			// 	currentArr[i].rect.x = currentArr[0].rect.x;
			// 	currentArr[0].rect.x = test;
			// }

			if (false) {
				// console.log(
				// 	i,
				// 	[currentArr[i].value, currentArr[i].rect.x],
				// 	[currSubArr[outerIdx].value, currSubArr[outerIdx].rect.x]
				// );

				const idx = currentArr.findIndex(
					elem => elem.moveHistory[0] === currSubArr[outerIdx].moveHistory[0]
				);

				console.log(
					i,
					[currentArr[i].value, currentArr[i].rect.x],
					[currentArr[idx].value, currentArr[idx].rect.x]
				);
				console.log([...currentArr], currSubArr, currSubArr[outerIdx].rect.x);
				// console.log(currSubArr[outerIdx].value, currSubArr[outerIdx].rect.x);

				/*
                    currArr[i] will be replaced by currSubArr[outerIdx]

                    get the x of currSubArr[outerIdx] and set it to the x of currArr[i] 
                    currSubArr[outerIdx].rect.x = currArr[i].rect.x

                    
					['3', 962] (2) ['1', 1119]
					['3', 1119] (2) ['1', 962] should be

					 ['1', 962] (2) ['3', 1119] should be
					['1', 1119] (2) ['3', 962] 
                */

				const aux = currentArr[i].rect.x;

				// currentArr[i].rect.x = currSubArr[outerIdx].rect.x;
				currentArr[i].rect.x = currentArr[idx].rect.x;
				currentArr[idx].rect.x = aux;

				// console.log(currentArr[idx]);
				// console.log(
				// 	i,
				// 	[currentArr[i].value, currentArr[i].rect.x],
				// 	[currSubArr[outerIdx].value, currSubArr[outerIdx].rect.x],
				// 	"after"
				// );
				console.log(
					i,
					[currentArr[i].value, currentArr[i].rect.x],
					[currentArr[idx].value, currentArr[idx].rect.x],
					"after"
				);
				console.log([...currentArr], currSubArr);
			}

			// if (result) {
			// 	console.log(currentArr[i].value, currSubArr[outerIdx].value);
			// 	// const test = currentArr[i].rect.x;
			// 	const test = currentArr[i];
			// 	currentArr[i] = currSubArr[outerIdx];
			// 	currentArr[i].rect.x = test.rect.x;

			// 	// currSubArr[outerIdx].rect.x = test;
			// }
			outerIdx++;
		}
		// console.log([...currentArr]);

		if (comparisons.length - 1 !== index) {
			index++;
		}

		async function update(comparison, currSubArr) {
			// get indexes of subArray
			const indexes = currSubArr.map(elem => {
				return elem.moveHistory[0];
			});

			const startIdx = Math.min(...indexes);
			const lastIdx = Math.max(...indexes);

			const tobeReplaced = [...currentArr].slice(
				startIdx,
				lastIdx + 1,
				...currSubArr
			);

			let outerIdx = 0;
			for (let i = startIdx; i < lastIdx + 1; i++) {
				// const aux = currentArr[i].rect.h;
				// const aux2 = currentArr[i].rect.y;

				// console.log(i, currentArr[i].value);
				// if (i === 1) {
				// 	const aux = currentArr[i].rect.h;
				// 	const aux2 = currentArr[i].rect.y;

				// 	console.log("0", currentArr[0].rect, currentArr[i].rect);
				// 	// currentArr[i].rect.h = currentArr[0].rect.h;
				// 	// currentArr[i].rect.y = currentArr[0].rect.y;

				// 	const test = currentArr[i].rect.x;
				// 	currentArr[i].rect.x = currentArr[0].rect.x;
				// 	currentArr[0].rect.x = test;
				// 	console.log("1", currentArr[0].rect, currentArr[i].rect);

				// 	// currentArr[0].rect.h = aux;
				// 	// currentArr[0].rect.y = aux;
				// }

				// console.table({
				// 	before: result,
				// 	currValue: currentArr[i].value,
				// 	currH: currentArr[i].rect.h,
				// 	curSubValue: currSubArr[outerIdx].value,
				// 	currsubH: currSubArr[outerIdx].rect.h,
				// });

				// rectsinitial
				console.log(i, currentArr[i].value, currSubArr[outerIdx].value);
				console.log(currentArr);
				// if (result) {
				// 	const aux = currentArr[i].rect.x;
				// 	currentArr[i].rect.x = currSubArr[outerIdx].rect.x;
				// 	currSubArr[outerIdx].rect.x = aux;
				// }
				// await new Promise(resolve => setTimeout(resolve, 1000));
				// if (result) {
				// 	currentArr[i].rect.h = currSubArr[outerIdx].rect.h;
				// 	currentArr[i].rect.y = currSubArr[outerIdx].rect.y;

				// 	currSubArr[outerIdx].rect.h = aux;
				// 	currSubArr[outerIdx].rect.y = aux2;
				// }

				// console.table({
				// 	after: result,
				// 	currValue: currentArr[i].value,
				// 	currH: currentArr[i].rect.h,
				// 	curSubValue: currSubArr[outerIdx].value,
				// 	currsubH: currSubArr[outerIdx].rect.h,
				// });

				outerIdx++;
			}
		}
	}
});
