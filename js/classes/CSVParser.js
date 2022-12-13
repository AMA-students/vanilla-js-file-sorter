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


const CSVParser = data => {
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
}

fileParse('./test2.csv','\n').then(data => CSVParser(data))