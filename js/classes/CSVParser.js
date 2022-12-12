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

fileParse('./37K.csv','\n').then(data => {
    let arr = []
    data.forEach( row => arr.push(row) )
    arr = removeUndefined(arr);

    let test = arr.map( rowChar => {

        // console.log(rowChar.match(/(?<=")([^\n]+)(?=[^"]\\|")/gi))
        return rowChar.replaceAll(/[\r]/ig,"").match(/(?<=^|,)(("[^"]*")|([^,]*))(?=$|,)/g)
        // return rowChar.replaceAll(`\"`,"").match(/(?<=^|,)(("[^"]*")|([^,]*))(?=$|,)/g)
    })

    let test2 = test.map(elem => {
        return elem.map(el => {
            if(el.match(/(?<=")([^\n]+)(?=[^"]\\|")/gi)) {
                // console.log(el.match(/(?<=")([^\n]+)(?=[^"]\\|")/gi)[0])
                el = el.match(/(?<=")([^\n]+)(?=[^"]\\|")/gi)[0];
            }
            return el;
        })
        // if(elem[8].match(/(?<=")([^\n]+)(?=[^"]\\|")/gi)){
        //     elem[8] = elem[8].match(/(?<=")([^\n]+)(?=[^"]\\|")/gi)[0]
        // }

        // return elem
    })

    // console.log(test[1])
    // console.log(test2[1])
    // console.log(test[1][8])
    // csv.onSummarize(test[0], test2.slice(1))
    csv.onSummarize(test[0], mergeSort(test2.slice(1), 7))
    // csv.onUpdate(test[0], bubbleSort(test.slice(1), 3))
    return test2
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