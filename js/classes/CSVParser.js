import CSV from '../classes/Csv.js';
import { removeUndefined } from "../classes/utility.js";
import { mergeSort } from '../functions/algo/mergeSort.js';
import quickSort from '../functions/algo/quickSort.test.js';
import bubbleSort from '../functions/algo/bubbleSort.js';
import htmlToCSV, {arrayToCsv, downloadCSVFile } from '../functions/sideEffectes/htmlToCSV.js';

const table = document.querySelector('table');
const csv = new CSV(table)

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
    console.log(file)

    if(splitter !== undefined) {
        return file.split(splitter);
    }

    return file;
}

const JSONParser = data => {
    console.log(data)

    let arr = data.match(/(?!^)({[^}]+})/gi);

    arr = arr.map(elem => {
        return elem.match(/(?<=)("[^,[}]+)(?=,|\n)/gi)
    })

    // let arr = JSON.parse(data).people;

    // console.log(arr, 'yeet');

    arr = arr.map(elem => {
        elem = elem.map(el => el.replaceAll(`\"`, ""))
        // console.log(elem)
        return elem.map(el => el.split(':'))
    })

    console.log(arr)
    let arrofObj = arr.map(elem => {
        console.log(elem);
        return Object.fromEntries(new Map(elem));
    })

    console.log(arrofObj);
    // console.log(arrofObj);
    // csv.onUpdate([], arr)
    // csv.onUpdate([], [...arr].sort((a,b)=> Number(a[3][1]) - Number(b[3][1])))
    const keys = getObjKeys(arrofObj[0])
    const values = arrofObj.map(obj => {
        return getObjValues(obj);
    })
    // console.log(keys, values);
    // csv.onUpdate(keys, values.sort((a,b) => a[4] - b[4]))
    return arrofObj
}

const CSVParser = data => {
    let arr = []
    data.forEach( row => arr.push(row) )
    arr = removeUndefined(arr);

    // csv grouper
    let unpolishedCSV = arr.map( rowChar => {
        // const CSVColumnValues = /(?<=^|,)(("[^"]*")|([^,]*))(?=$|,)/g
        const CSVColumnValues = /(?<=^|,)(("[^"]*(?:""[^"]*)*")|([^,]*))(?=$|,)/g
        const excessSpaces = /(?<=^|,) [^\w\d"]| +(?=$|,)/g

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

        /* 
            modified version:

            (?<=^|,)  === positive lookbehind for the start of each line or (,)
            ("[^"]*(?:""[^"]*)*") === group1 === get any one or more char that doesn't have (") but is in the middle of ("") 
            and if there is a char inside ("") but doesn't have a ("), match everything
            ([^,]*) === group2 === get any one or more char that doesn't have (,)
            (("[^"]*(?:""[^"]*)*")|([^,]*)) === (group1 | group2) === get group1 or group2
            (?=$|,) === positive lookahead for the end of the string or a (,)
        */

        return rowChar.replaceAll(/[\r]/ig,"").replaceAll(excessSpaces,"").match(CSVColumnValues)
    })
    // console.log(unpolishedCSV);

    // doubleqoute remover
    let polishedCSV = unpolishedCSV.map(elem => {
        
        const qouted = /(?<=")([^\n]+)(?=[^"]\\|")/gi
        
        return elem.map(el => {
            if(el.match(qouted)) {
                // remove (\") that surounds the string
                // console.log(el)
                el = el.match(qouted)[0];
            }
            return el;
        })
        
    })
    // console.log(polishedCSV);

    // console.log(unpolishedCSV[1])
    // console.log(polishedCSV[1])

    // test for download
    // const sorted = mergeSort(polishedCSV.slice(1), 7);
    // arrayToCsv(polishedCSV[0], sorted, `test.csv`, downloadCSVFile);

    // csv.onSummarize(polishedCSV[0], sorted)
    // csv.onSummarize(polishedCSV[0], mergeSort(polishedCSV.slice(1), 1))
    return polishedCSV
}

// fileParse('./test2.csv','\n').then(data => {
//     let CSV = CSVParser(data)
//     const sorted = mergeSort(CSV.slice(1), 7);

//     csv.onSummarize(CSV[0], sorted)
// });

// fileParse('./sample4.json').then(data => {
//     let arrofObj = JSONParser(data);

//     const keys = getObjKeys(arrofObj[0])
//     const values = arrofObj.map(obj => {
//         return getObjValues(obj);
//     })

//     csv.onUpdate(keys,values)
// });

// obj getters
const getObjKeys = (obj) => {
    return Object.entries(obj).map(entry => entry[0])
}

const getObjValues = (obj) => {
    return Object.entries(obj).map(entry => entry[1])
}

// data getters
const getGroup = (data, regex) => {
    return data.match(regex)
}

const getGroupValues = (data, regex) => {
    return data.match(regex)
}

// clone mutators
const keyValueobjectifier = (data, seperator) => {
    data = data.map(elem => {
        return elem.replaceAll(`\"`, "").split(seperator)
    })

    return Object.fromEntries(new Map(data));
}

export {
    fileParse,
    CSVParser,

    JSONParser,
    getGroupValues,
    getObjValues,
    getObjKeys,

}