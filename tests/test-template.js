import { CSVParser, fileParse } from "../js/classes/CSVParser.js";

import { removeUndefined } from "../js/classes/utility.js";

import { dataRecordersMap } from "../js/maps/dataRecorderMaps.js";

import bubbleSort from "../js/functions/data-based-sorters/bubbleSort.js";

import { mergeSort } from "../js/functions/data-based-sorters/mergeSort.js";

import divider from "../js/functions/elementLimiter.js";

import { selectionSort } from "../js/functions/data-based-sorters/selectionSort.js";

import quickSort from "../js/functions/data-based-sorters/quickSort.js";

const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.9;

const ctx = canvas.getContext("2d");

function drawRect(x, y, w, h, c) {
	ctx.beginPath();
	ctx.fillStyle = c;
	ctx.fillRect(x, y, w, h);
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
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
const fileName = files[3];

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

	dataRecorder.initializeDatapointIndex(2);

	const unsorted = [...dataRecorder.fileContentRecords];

	// i-uncomment nyo yung sorter na gagamitin nyo
	let result = bubbleSort(
		dataRecorder.fileContentRecords,
		dataRecorder.datapointIndex,
		dataRecorder
	);

	// let result = mergeSort(
	// 	dataRecorder.fileContentRecords,
	// 	dataRecorder.datapointIndex,
	// 	dataRecorder
	// );

	// let result = selectionSort(dataRecorder.fileContentRecords, dataRecorder.datapointIndex, dataRecorder)
	// let result = quickSort(dataRecorder.fileContentRecords, dataRecorder.datapointIndex, dataRecorder)

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

	// console.clear();

	let currentArr = [...unsorted];

	// for loop based canvas updater
	if (true) {
		// if (false) {
		forRender();
		async function forRender() {
			for (let i = 0; i < comparisons.length; i++) {
				bubbleSortVisualizer();

				// delay
				// await new Promise(resolve => setTimeout(resolve, 1000));
				await new Promise(resolve => setTimeout(resolve, 0));
			}
		}
		console.log("done");
	}

	async function bubbleSortVisualizer() {
		// erase canvas display
		ctx.clearRect(
			padding,
			padding,
			paddedWidth - padding,
			paddedHeight - padding
		);

		const {
			left, // left value being compared
			right, // right value being compared
			comparison, // result of the comparison

			/*
                ex. 
                4 < 5 = false
                left = 4
                right = 5
                comparison = false
            */
		} = comparisons[index];

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
		}

		if (comparisons.length - 1 !== index) {
			index++;
		}
	}
});
