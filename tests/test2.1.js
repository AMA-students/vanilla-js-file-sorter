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
	4: "500.csv",
	5: "99K.csv",
};

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

	dataRecorder.initializeDatapointIndex(1);

	let result = mergeSort(dataRecorder.fileContentRecords, 1, dataRecorder);
	// let result = selectionSort(dataRecorder.fileContentRecords, 1, dataRecorder)
	// let result = mergeSort(dataRecorder.fileContentRecords, 1, dataRecorder)
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

				canvasRects.push({
					x,
					y,
					w,
					h,
					draw: () => drawRect(x, y, w, h),
					animate: function () {
						this.x += 2;
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

	function rendererTest(segmentedArr) {
		let count = 0;
		let index = 0;

		(async function segmentedRender(segmentedArr) {
			await new Promise(resolve => setTimeout(resolve, delay));

			for (let i = 0; i < segmentedArr[count].length; i++) {
				const currentRecord = dataRecorder.fileContentRecords.find(
					record => record.moveHistory[0] === index
				);

				const h = currentRecord.height;

				const x = index * w * 2 + padding;

				const y = height - h - padding;

				drawRect(x, y, w, h);

				index++;
			}

			if (count < segmentedArr.length - 1) {
				segmentedRender(segmentedArr);
			}

			count++;
		})(segmentedArr);
	}

	const segmentedArr = divider(array, 2500);

	(async () => {
		console.log("test");
	})();

	const rects = rectsRecorder(segmentedArr);
	const comparisons = [...dataRecorder.comparisonHistory];

	// animate(comparisons[])

	console.log("test");

	// update();
	async function update() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// for (let i = 0; i < comparisons.length; i++) {
		// 	// rects[left].draw();
		// 	// rects[right].draw();
		// }
		animate(comparisons[i]);

		requestAnimationFrame(update);
	}

	// for (let i = 0; i < rects.length; i++) {
	// 	rects[i].draw();
	// }
	let index = 0;
	drawCurrentRects();
	async function drawCurrentRects() {
		// console.log(rects[0]);
		ctx.clearRect(
			padding,
			padding,
			paddedWidth - padding,
			paddedHeight - padding
		);

		const { left, right, comparison } = comparisons[index];
		// draw rects
		for (let i = 0; i < rects.length; i++) {
			rects[i].animate();
			// rects[i].draw();
		}
		console.log(rects[0].x);
		// rects[0].w += index;
		// rects[0].draw();
		// console.log(rects[0].h);
		index++;
		if (comparisons.length > index) {
			// if (false) {
			requestAnimationFrame(drawCurrentRects);
		}
	}

	function animate({ left, right, comparison }) {
		let leftRect = rects[left];
		let rightRect = rects[right];
		console.log(left);
		rects[0].x = rects[left].x;
		// [rects[left].h, rects[right]].h = [rects[right].h, rects[left].h];
		// [rects[left], rects[right]] = [rects[right], rects[left]];
		// console.clear();
		// console.log(rects[index]);

		if (comparison) {
			// [rects[left].h, rects[right]].h = [rects[right].h, rects[left].h];
			// leftRect.x = rightRect.x;
			// ctx.fillStyle = "red";
			// console.log(rects[index]);

			rects[left].h = rects[right].h;
			// rects[left].draw();
			// rects[right].draw();
			// leftRect.draw();
			// rightRect.draw();
		}
	}

	// function animate({ left, right, comparison }) {
	// 	let leftRect = rects[left];
	// 	let rightRect = rects[right];

	// 	if (comparison) {
	// 		// Swap the positions of the rectangles using a timer loop
	// 		const duration = 200; // Duration of the animation in milliseconds
	// 		const fps = 60; // Number of frames per second
	// 		const frames = (duration / 1000) * fps; // Total number of frames
	// 		let count = 0; // Counter for the number of frames

	// 		const dx = rightRect.x - leftRect.x; // Difference in x position between the rectangles
	// 		const dy = rightRect.y - leftRect.y; // Difference in y position between the rectangles

	// 		const xStep = dx / frames; // Amount to increment the x position each frame
	// 		const yStep = dy / frames; // Amount to increment the y position each frame

	// 		const timer = setInterval(() => {
	// 			// Increment the positions of the rectangles
	// 			leftRect.x += xStep;
	// 			leftRect.y += yStep;
	// 			rightRect.x -= xStep;
	// 			rightRect.y -= yStep;

	// 			// Draw the rectangles at their new positions
	// 			ctx.clearRect(0, 0, canvas.width, canvas.height);
	// 			for (let i = 0; i < rects.length; i++) {
	// 				rects[i].draw();
	// 			}

	// 			// Increment the frame counter
	// 			count++;

	// 			// Stop the timer if the animation is complete
	// 			if (count >= frames) {
	// 				clearInterval(timer);
	// 				// Swap the x and y positions of the rectangles in the rects array
	// 				[rects[left], rects[right]] = [rects[right], rects[left]];
	// 			}
	// 		}, 1000 / fps);
	// 	}
	// }
});
