import { CSVParser, fileParse } from "../classes/CSVParser.js";

import { removeUndefined, segmentedLooper } from "../classes/utility.js";

import { dataRecordersMap } from "../maps/dataRecorderMaps.js";

import { mergeSort } from "../functions/data-based-sorters/mergeSort-visualizer.js";

import divider from "../functions/elementLimiter.js";

// export default class {
// 	// const visualizer = new Visualizer(this.root)
// 	constructor(root) {
// 		this.root = root;

// 		this.root.width = window.innerWidth * 0.9;
// 		this.root.height = window.innerHeight * 0.9;

// 		this.ctx = this.root.getContext("2d");
// 	}
// }

function drawRect() {
	return {
		drawRect(x, y, w, h, c) {
			this.ctx.beginPath();
			this.ctx.fillStyle = c;
			this.ctx.fillRect(x, y, w, h);
		},
	};
}

function init() {
	return {
		init(contentLength) {
			this.canvas.width = window.innerWidth * 0.9;
			this.canvas.height = window.innerHeight * 0.9;

			this.ctx = this.canvas.getContext("2d");

			this.padding = 20;

			this.contentLength = contentLength;

			this.width = this.canvas.width;

			this.height = this.canvas.height;

			this.paddedWidth = this.canvas.width - this.padding;
			this.paddedHeight = this.canvas.height - this.padding;
			this.doublePadding = this.padding * 2;

			this.w = (this.width - this.doublePadding) / (this.contentLength * 2);

			this.aveHeightIncr =
				(this.paddedHeight - this.doublePadding) / this.contentLength;

			this.measurements = {
				padding: this.padding,
				contentLength: this.contentLength,
				width: this.width,
				height: this.height,
				paddedWidth: this.paddedWidth,
				paddedHeight: this.paddedHeight,
				doublePadding: this.doublePadding,
				w: this.w,
				aveHeightIncr: this.aveHeightIncr,
			};
		},
	};
}

function defineMeasurements() {
	return {
		defineMeasurements(dataRecorder) {
			// border padding
			this.padding = 20;
			// number of elements that will be displayed
			this.contentLength = dataRecorder.fileContentRecords.length;
			this.width = this.canvas.width;
			this.height = this.canvas.height;

			this.paddedWidth = this.width - this.padding;
			this.paddedHeight = this.height - this.padding;
			this.doublePadding = this.padding * 2;

			this.w = (this.width - this.doublePadding) / (this.contentLength * 2);
			this.aveHeightIncr =
				(this.paddedHeight - this.doublePadding) / this.contentLength;
		},
	};
}

function drawPaddedBorder() {
	return {
		drawPaddedBorder() {
			// draw padded border
			this.ctx.beginPath();
			this.ctx.moveTo(this.padding, this.padding);
			this.ctx.lineTo(this.padding, this.paddedHeight);
			this.ctx.lineTo(this.paddedWidth, this.paddedHeight);
			this.ctx.moveTo(this.padding, this.padding); // startingPoint
			this.ctx.lineTo(this.paddedWidth, this.padding); // x:paddedWidth y: padding
			this.ctx.lineTo(this.paddedWidth, this.paddedHeight); // from paddedWidth paddedHeight
			this.ctx.strokeStyle = "red";
			this.ctx.stroke();
		},
	};
}

function assignElHeightAndOrder2() {
	return {
		assignElHeightAndOrder2(arr, dataRecorder) {
			const SEGMENT_MAX_LENGTH = 100;
			const segmentedArr = divider(arr, SEGMENT_MAX_LENGTH);

			this.arrOfElemPos = [];

			// arrOfElemPos value setter
			segmentedLooper(segmentedArr, (counter, x, y) => {
				const currentRecord = dataRecorder.fileContentRecords[counter];

				currentRecord.height = (counter + 1) * this.aveHeightIncr;

				const lastElemIndex = currentRecord.moveHistory.length - 1;

				this.arrOfElemPos.push([
					currentRecord.moveHistory[0], // initial index of element before sort
					currentRecord.moveHistory[lastElemIndex], // index of element  after sort
				]);
			});

			// this.rectsRecorder(segmentedArr, dataRecorder);
		},
		rectsRecorder(segmentedArr, dataRecorder) {
			const canvasRects = [];

			let count = 0;
			let index = 0;

			const {
				padding,
				contentLength,
				width,
				height,
				paddedWidth,
				paddedHeight,
				doublePadding,
				w,
				aveHeightIncr,
			} = this;

			(async function segmentedRender() {
				for (let i = 0; i < segmentedArr[count].length; i++) {
					const currentRecord = dataRecorder.fileContentRecords.find(
						record => record.moveHistory[0] === index
					);

					console.log(index, count);
					if (currentRecord == undefined) {
						console.log(index, count);
						console.log(
							dataRecorder.fileContentRecords.find(
								record => record.moveHistory[0] === index
							),
							dataRecorder.fileContentRecords.find(
								record => record.moveHistory[0] === index - 1
							),
							dataRecorder.fileContentRecords
						);
					}
					const h = currentRecord.height;

					const x = index * w * 2 + padding;

					const y = height - h - padding;

					currentRecord.rect = {
						x,
						y,
						h,
						w,
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
		},
	};
}

function assignElHeightAndOrder() {
	return {
		assignElHeightAndOrder(segmentedArr, dataRecorder) {
			// const SEGMENT_MAX_LENGTH = 100;
			// const segmentedArr = divider(result, SEGMENT_MAX_LENGTH);
			// this.assignRects(segmentedArr, dataRecorder);
			this.arrOfElemPos = [];
			console.log(segmentedArr);
			// ignore nyo muna to
			// arrOfElemPos value setter
			segmentedLooper(segmentedArr, (counter, x, y) => {
				const currentRecord = dataRecorder.fileContentRecords[counter];

				currentRecord.height = (counter + 1) * this.aveHeightIncr;

				const lastElemIndex = currentRecord.moveHistory.length - 1;

				this.arrOfElemPos.push([
					currentRecord.moveHistory[0], // initial index of element before sort
					currentRecord.moveHistory[lastElemIndex], // index of element  after sort
				]);
			});
		},
	};
}

function visualizeSorting() {
	return {
		visualizeSorting(unsorted, comparisons, rects) {
			this.index = 0;
			let currentArr = [...unsorted];
			console.log({ rects, comparisons, unsorted });
			this.forLoopFrameRenderer(
				comparisons,
				// () => this.mergeSortVisualizer(comparisons, currentArr)
				() => this.bubbleSortVisualizer(comparisons, rects)
			);
		},
	};
}

function forLoopFrameRenderer() {
	return {
		async forLoopFrameRenderer(comparisons, cb) {
			// each iteration of for loop is a frame update
			const frameCount = comparisons.length + 5;
			for (let i = 0; i < frameCount; i++) {
				cb();
				await new Promise(resolve => setTimeout(resolve, 500));
			}
		},
	};
}

function mergeSortVisualizer() {
	return {
		async mergeSortVisualizer(comparisons, currentArr) {
			// clear the canvas
			this.ctx.clearRect(
				this.padding,
				this.padding,
				this.paddedWidth - this.padding,
				this.paddedHeight - this.padding
			);

			const { currSubArr, result } = comparisons[this.index];
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
				outerIdx++;
			}

			if (comparisons.length - 1 !== this.index) {
				this.index++;
			}
		},
	};
}

function bubbleSortVisualizer() {
	return {
		bubbleSortVisualizer(comparisons, rects) {
			const { ctx, padding, paddedWidth, paddedHeight } = this;
			ctx.clearRect(
				padding,
				padding,
				paddedWidth - padding,
				paddedHeight - padding
			);
			console.log("test");

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
			} = comparisons[this.index];

			for (let i = 0; i < rects.length; i++) {
				rects[i].draw();
				console.log(rects[i]);
			}

			if (comparison) {
				const aux = rects[left].h;
				const aux2 = rects[left].y;

				rects[left].h = rects[right].h;
				rects[left].y = rects[right].y;

				rects[right].h = aux;
				rects[right].y = aux2;
			}

			if (comparisons.length - 1 !== this.index) {
				this.index++;
			}
		},
	};
}

function assignRects() {
	return {
		assignRects(segmentedArr, dataRecorder) {
			const canvasRects = [];
			const { w, padding, height } = this;
			let count = 0;
			let index = 0;

			(async function segmentedRender() {
				for (let i = 0; i < segmentedArr[count].length; i++) {
					const currentRecord = dataRecorder.fileContentRecords.find(
						record => record.moveHistory[0] === index
					);
					console.log(this);
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
		},
	};
}

const Visualizer = canvas => {
	const state = {
		canvas,
	};

	return Object.assign(
		state,
		init(),
		drawRect(),
		assignRects(),
		drawPaddedBorder(),
		visualizeSorting(),
		defineMeasurements(),
		mergeSortVisualizer(),
		bubbleSortVisualizer(),
		forLoopFrameRenderer(),
		assignElHeightAndOrder(),
		assignElHeightAndOrder2()
	);
};

export { Visualizer };
