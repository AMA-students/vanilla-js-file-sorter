import { CSVParser, JSONParser, fileParse } from "../js/classes/CSVParser.js"

import { removeUndefined } from "../js/classes/utility.js";

import { CSVRecorder, dataRecorderSetter, traverser } from "../js/classes/FileRecorders.js"

import { dataRecordersMap } from "../js/maps/dataRecorderMaps.js";

import bubbleSort from "../js/functions/data-based-sorters/bubbleSort.js";

import { mergeSort } from "../js/functions/data-based-sorters/mergeSort.js";

import divider from "../js/functions/elementLimiter.js"
// import { clearBtn } from "../js/buttons.js";
import { selectionSort } from "../js/functions/data-based-sorters/selectionSort.js";
import quickSort from "../js/functions/data-based-sorters/quickSort.js";

console.log('test')

const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth * .90;
canvas.height = window.innerHeight * .90;

const ctx = canvas.getContext('2d');

const x = 0;

const w = 50

const h = 500

const y = (canvas.height - h)

// ctx.fillRect(x, y, w, h)

function drawRect(x, y, w, h) {
    ctx.fillRect(x, y, w, h);
}

function colorRect(index) {

    if(index % 2 == 0) {
        ctx.fillStyle = "lightblue";
    } else {
        ctx.fillStyle = "lightgreen";
    }

}

let zoom = 1.0; // initial zoom value

function zoomOut() {
  zoom *= 0.9; // decrease the zoom level
  ctx.setTransform(zoom, 0, 0, zoom, 0, 0);
  draw(); // redraw the canvas
}

function draw() {
  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // draw something on the canvas
//   ctx.fillRect(50, 50, 100, 100);
}

const padding = 20;

// const files = ['./sample4.json', './example_2.json','./testjson2.json', '8.csv']
const files = {
    0:'sample4.json', 
    1:'example_2.json',
    2:'testjson2.json', 
    3:'8.csv',
    4: '500.csv',
    5: '99K.csv',
}

const fileName = files[4]

const fileParseParam = [fileName];

// (fileExtension === "CSV" && fileParseParam.push('\n'))
// if(fileExtension === "csv") fileParseParam.push('\n')

fileParse(...fileParseParam).then(data => {
// fileParse('./500.csv','\n').then(data => {

    const dataRecorder = dataRecordersMap(fileName, 'v2');
    // const dataRecorder = dataRecordersMap(fileName);
    console.log(dataRecorder);
    if(dataRecorder.type === "CSV") {
        
        dataRecorder.initializeFileContent(data)
        
        console.log(dataRecorder);

        let CSV = removeUndefined(CSVParser(dataRecorder.splitFile))

        dataRecorder.initializeParsedFileContent(CSV)
        console.log(dataRecorder);
    }

    if(dataRecorder.type === "JSON") {
        // const propertyPath = fileName;

        // dataRecorder.getKeys(dataRecorder.parsedFileContent);

        if(false) {
            const propertyPath = ['quiz', 'sport', 'q1', 'options' ]

            console.log(
                traverser(json, propertyPath)
            );
        }
        
        const getObjKeys = (obj) => {
            return Object.entries(obj).map(entry => entry[0])
        }
        
        const getObjValues = (obj) => {
            return Object.entries(obj).map(entry => entry[1])
        }

        // const json = JSON.parse(data)
        
        dataRecorder.initializeFileContent(data)

        dataRecorder.initializeParsedFileContent()

        // let test = {};
        // if(Array.isArray(json)) {
        //     console.log(json);
        //     test = json.map(obj => {
        //         return {
        //             values: getObjValues(obj),
        //             keys: getObjKeys(obj)
        //         }
        //     });

        // } 
        // else {
        //     const key = getObjKeys(json)
        //     console.log(json);
        //     console.log(key, json[key]);
        // }
        // console.log(test, dataRecorder);
    }
    console.log(dataRecorder);
    dataRecorder.initializeFileContentRecords()

    dataRecorder.initializeDatapointIndex(1)

    let result = bubbleSort(dataRecorder.fileContentRecords, 1, dataRecorder)
    // let result = selectionSort(dataRecorder.fileContentRecords, 1, dataRecorder)
    // let result = mergeSort(dataRecorder.fileContentRecords, 1, dataRecorder)
    // let result = quickSort(dataRecorder.fileContentRecords, 1, dataRecorder)

    const worker = new Worker('./tests/test2-worker.js', {type: "module"});

    worker.postMessage([1, JSON.stringify(dataRecorder)])

    worker.onmessage = (message) => {
        console.log(message);
    }


    const contentLength = dataRecorder.fileContentRecords.length;

    const width = canvas.width;
    const height = canvas.height;

    const paddedWidth = canvas.width - padding;
    const paddedHeight = canvas.height - padding;
    const doublePadding = padding * 2;

    ctx.beginPath()
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, paddedHeight);
    ctx.lineTo(paddedWidth, paddedHeight);
    ctx.moveTo(padding, padding); // startingPoint
    ctx.lineTo(paddedWidth, padding); // x:paddedWidth y: padding
    ctx.lineTo(paddedWidth, paddedHeight); // from paddedWidth paddedHeight
    ctx.strokeStyle = "red";
    ctx.stroke();

    console.log(height);
    const values = dataRecorder.fileContentRecords.map(record => record.value);
    const maxValue = values.reduce((a,b) => Math.max(a,b))

    const divisor = maxValue / height + 1;

    const scale_factor = height / maxValue;

    const w = ((width - doublePadding) / (contentLength * 2))
        
    const heightOverLength = (height * .95)/ contentLength;
    const baseHeight = (heightOverLength / 10)

    /*
        if (maxValue + baseHeight) < height, 

        bar_height = (value + baseHeight);

        else if (maxValue + baseHeight) < height

        bar_height = value/ divisor

    */


    const aveHeightIncr = (paddedHeight - doublePadding) / (contentLength);

    console.log(scale_factor, maxValue, aveHeightIncr);


    async function test(record, index) {
        record.height = (index + 1) * aveHeightIncr;

        const currentRecord = dataRecorder.fileContentRecords.find(record => record.moveHistory[0] === index)

        let h;
        
        h = currentRecord.height

        const x = (index * w) * 2 + padding;

        const y = (height - h) - padding
        
        // colorRect(index)
        drawRect(x, y, w, h)
        // await new Promise(resolve => setTimeout(resolve, 1000));
    }
    const segmented = divider(result, 100);
    let array = []

    console.log(segmented);
    const length = segmented.length -1;

    segmentedLooper(segmented, (counter, x, y) => {
        const currentRecord = dataRecorder.fileContentRecords[counter]

        currentRecord.height = (counter + 1) * aveHeightIncr;
        
        const lastElemIndex = currentRecord.moveHistory.length - 1

        array.push([
            currentRecord.moveHistory[0],
            currentRecord.moveHistory[lastElemIndex]
        ])
    }) 

    function segmentedLooper(segmented, cb) {
        let counter = 0;

        for(let x = 0; x < segmented.length; x++) {
            const segments = segmented[x];
            
            // console.log(records);
            
            for(let y = 0; y < segments.length; y++) {

                cb(counter, x, y)

                counter++;
            }
        }
    }

    //sorted 
    if(false) {
        array.forEach((record, index) => {

            // test(record, index)
            // record.height = (index + 1) * aveHeightIncr;
    
            const currentRecord = dataRecorder.fileContentRecords.find(record => record.moveHistory[0] === index)
            
            // const h = currentRecord.height
            const h = (index + 1) * aveHeightIncr
    
            const x = (index * w) * 2 + padding;
    
            const y = (height - h) - padding
            // console.log(h, index);
            // colorRect(index)
            drawRect(x, y, w, h)
            // await new Promise(resolve => setTimeout(resolve, 1000));
        })
        
        return
    }

    let count = 0;
    let index = 0;
    
    const delay = array.length/2500 * 100

    async function rendererTest(segmentedArr) {
        
        await new Promise(resolve => setTimeout(resolve, delay));
        
        for(let i = 0; i < (segmentedArr[count].length); i++) {
            const currentRecord = dataRecorder.fileContentRecords.find(record => record.moveHistory[0] === index)
            
            const h = currentRecord.height
    
            const x = (index * w) * 2 + padding;
            
            const y = (height - h) - padding
            
            drawRect(x, y, w, h)

            index++;
        }

        if(count < segmentedArr.length - 1) {
            rendererTest(segmentedArr)
        }
        console.log(count);
        
        count++;
    }

    
    const segmentedArr = divider(array, 2500);
    

    // const worker = new Worker('./tests/test2-worker.js')

    // worker.postMessage({num: 5})

    // worker.onmessage = (message) => {
    //     console.log(message);
    // }

    (async () => {
        console.log(segmentedArr);
        // rendererTest(segmentedArr)
        rendererTest2(segmentedArr)
        // await new Promise(resolve => setTimeout(resolve, 2000));
        // animateComparison(dataRecorder.comparisonHistory)        
    })()

    // console.log(segmentedArr);
    // rendererTest(segmentedArr)
    // animateComparison(dataRecorder.comparisonHistory)

    async function rendererTest2(segmentedArr) {
        // Render the canvas initially, without any sorting animation effects
        for (let i = 0; i < segmentedArr[count].length; i++) {
            const currentRecord = dataRecorder.fileContentRecords.find(record => record.moveHistory[0] === index);
            const h = currentRecord.height;
            const x = (index * w) * 2 + padding;
            const y = (height - h) - padding;
            drawRect(x, y, w, h, false);
            index++;
        }
        
        // Introduce a delay after the canvas has been rendered
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Sort the displayed data based on the comparisonHistory
        for (let i = 0; i < comparisonHistory.length; i++) {
            const leftIndex = comparisonHistory[i].left;
            const rightIndex = comparisonHistory[i].right;
            const leftRecord = dataRecorder.fileContentRecords.find(record => record.moveHistory[0] === leftIndex);
            const rightRecord = dataRecorder.fileContentRecords.find(record => record.moveHistory[0] === rightIndex);
            
            // Swap the heights of the left and right rectangles
            const tempHeight = leftRecord.height;
            leftRecord.height = rightRecord.height;
            rightRecord.height = tempHeight;
            
            // Animate the rectangles being compared
            const leftX = (leftIndex * w) * 2 + padding;
            const leftY = (height - leftRecord.height) - padding;
            const rightX = (rightIndex * w) * 2 + padding;
            const rightY = (height - rightRecord.height) - padding;
            drawRect(leftX, leftY, w, leftRecord.height, true);
            drawRect(rightX, rightY, w, rightRecord.height, true);
            
            // Delay the animation to allow the user to see the changes
            await new Promise(resolve => setTimeout(resolve, delay));
            
            // Redraw the rectangles with the updated heights
            drawRect(leftX, leftY, w, leftRecord.height, false);
            drawRect(rightX, rightY, w, rightRecord.height, false);
        }
        
        if (count < segmentedArr.length - 1) {
            rendererTest(segmentedArr); // Call the function recursively
        }
        
        console.log(count);
        count++;
    }
    

    async function animateComparison(comparisonHistory) {
        comparisonHistory.map(({comparison, left, right}) => {
            
        })

        await new Promise(resolve => setTimeout(resolve, delay));
    }

    if(false) {
        for(let i = 0; i < (array.length/2) - 1; i++) {
            const currentRecord = dataRecorder.fileContentRecords.find(record => record.moveHistory[0] === i)

            const h = currentRecord.height
    
            const x = (i * w) * 2 + padding;
    
            const y = (height - h) - padding

            drawRect(x, y, w, h)
        }

        for(let i = (array.length/2) - 1; i < array.length - 1; i++) {
            const currentRecord = dataRecorder.fileContentRecords.find(record => record.moveHistory[0] === i)

            const h = currentRecord.height
    
            const x = (i * w) * 2 + padding;
    
            const y = (height - h) - padding

            drawRect(x, y, w, h)
        }

        return
    }
    
    async function proceduralRender() {
        console.log('test');
        for(let i = 0; i < array.length - 1; i++) {
            const currentRecord = dataRecorder.fileContentRecords.find(record => record.moveHistory[0] === i)

            const h = currentRecord.height
    
            const x = (i * w) * 2 + padding;
    
            const y = (height - h) - padding

            drawRect(x, y, w, h)
            await new Promise(resolve => setTimeout(resolve, 0));
        }
        console.log('test2');
    }

    let i = 0;
    async function proceduralRender2() {
        console.log('test');

        const currentRecord = dataRecorder.fileContentRecords.find(record => record.moveHistory[0] === i)

        const h = currentRecord.height

        const x = (i * w) * 2 + padding;

        const y = (height - h) - padding

        drawRect(x, y, w, h)

        i++;

        if(i < array.length - 1) {
            requestAnimationFrame(proceduralRender2)
        }

        console.log('test2');
    }

    

    const zoomBtn = document.getElementById('zoom')

    zoomBtn.onclick = () => {
        zoomOut()
    }
    

});