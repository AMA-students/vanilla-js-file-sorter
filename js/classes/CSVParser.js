import CSV from '../classes/Csv.js';
import { removeUndefined } from "../classes/utility.js";
import { mergeSortTest as mergeSort } from '../functions/algo/mergeSort.js';
import quickSort from '../functions/algo/quickSort.test.js';
import bubbleSort from '../functions/algo/bubbleSort.js';

const csv = new CSV(document.querySelector('table'))

export default class {
    constructor(array) {
        this.array = array;
    }

    array = [1,2,3,4,5,6,7];

    parse(array = this.array) {
        array
    }


}


/"+[\s\S][^"]+"/
const fileParse = async (text, splitter) => {
    const result = await fetch(text)
    const file = await result.text()
    // console.log(file)

    if(splitter !== undefined) {
        return file.split(splitter);
    }

    return file;
}

// fileParse('./sample4.json').then(data => {
//     console.log(data)

//     // let arr = data.match(/(?!^)({[^}]+})/gi);

//     // arr = arr.map(elem => {
//     //     return elem.match(/(?<=)("[^,[}]+)(?=,|\n)/gi)
//     // })

//     let arr = JSON.parse(data).people;

//     console.log(arr, 'yeet');

//     // arr = arr.map(elem => {
//     //     elem = elem.map(el => el.replaceAll(`\"`, ""))
//     //     console.log(elem)
//     //     return elem.map(el => el.split(':'))
//     // })

//     // console.log(arr);
//     csv.onUpdate([], arr)
//     // csv.onUpdate([], [...arr].sort((a,b)=> Number(a[3][1]) - Number(b[3][1])))
// })

fileParse('./test2.csv','\n').then(data => {
    let arr = []
    data.forEach( row => arr.push(row) )
    arr = removeUndefined(arr);

    // csv grouper
    let unpolishedCSV = arr.map( rowChar => {
        const CSVColumnValues = /(?<=^|,)(("[^"]*")|([^,]*))(?=$|,)/g
        /*
            rowChar === each line of the csv file
            rowChar.replaceAll(/[\r]/ig,"") === rowChar without \r

            /(?<=^|,)(("[^"]*")|([^,]*))(?=$|,)/ => 
            (?<=^|,)  === positive lookbehind for the start of each line or (,)
            ("[^"]*") === group1 === get any one or more char that doesn't have (") but is in the middle of ("")
            ([^,]*) === group2 === get any one or more char that doesn't have (,)
            (("[^"]*")|([^,]*)) === (group1 | group2) === get group1 or group2
            (?=$|,) === positive lookahead for the end of the string or a (,)

        */
        return rowChar.replaceAll(/[\r]/ig,"").match(CSVColumnValues)
    })

    // doubleqoute remover
    let polishedCSV = unpolishedCSV.map(elem => {
        
        const qouted = /(?<=")([^\n]+)(?=[^"]\\|")/gi
        
        return elem.map(el => {
            if(el.match(qouted)) {
                // remove (\") that surounds the string
                el = el.match(qouted)[0];
            }
            return el;
        })
        
    })

    // console.log(unpolishedCSV[1])
    // console.log(polishedCSV[1])

    csv.onSummarize(polishedCSV[0], polishedCSV.slice(1))
    // csv.onSummarize(polishedCSV[0], mergeSort(polishedCSV.slice(1), 1))
    return polishedCSV
})


// fileParse('./31.csv').then(data => {
//     let arr = []
//     data.forEach( row => arr.push(row) )
//     // console.log(arr);
//     // console.log( arr.map( row => row.split(',') ) );

//     let test = arr.map( row => {
//     // get qouted columns
//     // if qouted columns, split all qouted columns as a group

//     // in row, check if there is a qoute {0}. If there is, traverse the string and locate the qoute {1}. If char is a qoute, traverse the string until another qoute is found {2}

//     // {0}
//     // if(!row.includes(`"`)) return row.split(",")
//     console.log('row: ' +row)
//     // (',"', '",', "")
//     let strArray = Array.from(row)

//         // 2020,Level 1,99999,Dollars (millions),H01,Total income,Financial performance,"733,258","ANZSIC06 divisions A-S (excluding classes K6330, L6711, O7552, O760, O771, O772, S9540, S9601, S9602, and S9603)"

//         /*
//             check each char,
//             if char is not comma, add it to the collection.

//             if char is qoute, traverse the string until another qoute is found.

//             if char is comma, return the collection

//         */

//         let collection = '';
//         let newArr = []
//         let qoutePairIndex = undefined;
//         let lookingForQoute = false;

//         strArray.map((char, index, arr) => {

//             if(char === "," && !lookingForQoute) {
//                 newArr.push(collection);
//                 collection = '';
//             }

//             if(char === '"' ) {
//                 lookingForQoute = true;
//                 let qouteFound = false;
//                 let i = 0;

//                 // while(!qouteFound || i < arr.length) {

//                 //     if(arr[(index + 1) + i] === '"') {
//                 //         qouteFound = true;
//                 //         qoutePairIndex = index + i;
//                 //         // collection += arr[index + i]
//                 //         console.log(collection);
//                 //         newArr.push(collection);
//                 //         collection = '';
//                 //     }
//                 //     collection += arr[index + i]

//                 //     i++
//                 // }

//             }

//             if(char !== "," && !lookingForQoute) {
//                 collection += char;
//             }
            
//             if(index === arr.length -1) {
//                 newArr.push(collection);
//                 collection = '';
//             }
            
            
//         })

//         console.log(newArr)
//         return newArr
//     } )

//     test = removeUndefined(test)
//     console.log(test)
//     csv.onUpdate(test[0], test.slice(1))
//     // csv.onSummarize(test[0], test.slice(1))

// })