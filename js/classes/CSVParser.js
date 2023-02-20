import { removeUndefined } from "../classes/utility.js";

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

const JSONParser = data => {
    console.log(data)

    let arr = data.match(/(?!^)({[^}]+})/gi);
    console.log(arr);
    arr = arr.map(elem => {
        return elem.match(/(?<=)("[^,[}]+)(?=,|\n)/gi)
    })

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
// 25K upperhalf
// './test2.csv'

// fileParse('./8.csv','\n').then(data => {
    // let CSV = CSVParser(data)
    // console.log(data[0])
    // const aux = data[0]
    // data[0] = data[2]
    // data[2] = aux;
    // downloadCSVFile(data.join("\n"), 'test.csv')

    // data = removeUndefined(data)
    // const dataRecorder = new DataRecorder(data.join('\n'),'\n', 0);

    // let CSV = removeUndefined(CSVParser(data))
    // console.log(CSV);

    // dataRecorder.setParsedData(CSV);

    // console.log(
    //     dataRecorder
    // );

    // console.log(CSV, data);
    // const sorted = mergeSort(CSV.slice(1), 7);

    // csv.onSummarize(CSV[0], sorted)
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