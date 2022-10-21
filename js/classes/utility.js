export default class {

    twoDementionalArrayElemenentComparator(arr) {
        /*
            will return the values of the selected demension in an array
        */
        return 
    }    
}

const removeUndefined = data => data.filter(element => element !== undefined && element != '');

// stringsToNumbers

const  arrayStringToNumber = (array, dataPointIndex) => {

    let parsedArray = array.map( rowOfData => {
        rowOfData[dataPointIndex] = stringToNumber(rowOfData[dataPointIndex])
        return rowOfData;
    })

    return parsedArray;
}

const realValues = (array, dataPointIndex) => {

    if(!array) {
        console.error(`array is not defined`);
        return null
    }

    if(dataPointIndex === undefined) {
        console.warn(`dataPointIndex is undefined`);
    }

    return array.map( rowOfData => rowOfData[dataPointIndex].realVal);
}

const stringToNumber = (value) => {

    return {
        original: value, 
        realVal: !isNaN(value) ? parseFloat(value): value
    }
}

const isStringWithoutNum = (value) => {

    const hasNumber = /\d/.test(value);
    if(hasNumber) return false;
    
    return typeof(value) === "string";
}

const stringStartsWithNumber = value => {

    if(typeof(value) !== 'string') return console.error(`this function expects a string as an argument`);

    // check the first char if it's a number
    const firstChar = value.charAt(0);

    // check if the firstChar is a number
    
    return !isNaN(parseFloat(firstChar))
}

/* 
    let startsWithNumber, containsSymbols

    if isStringWithoutNum === true, 
    => startsWith number = false, containsSymbols ?
*/

const hasComma = value => {

    if(typeof value !== 'string') {
        return console.error(`this function expects a string as an argument`);
    }

    return value.includes(',');
}

const isStringNumWithComma = (value) => {

    /*
        checks the value if it is a number in a form of a string, and if
        the value contains a comma

        examples of numbers in a form of a string and contains a comma:
        => "1,700", "2,000"
    */

    // check if string doesn't have a number
    if(isStringWithoutNum(value)) return false;

    // checks if string doesn't have a comma. If it has, proceed. If it doesn't, return false
    if(!hasComma(value)) {
        console.error(`this string: "${value}" doesn't have a comma`);
        return false;
    }

    const removedComma = value.replace(/,/g, '');

    // checks if the string removed with comma converts to a valid number, proceed if yes, return false if no.
    if(parseFloat(removedComma) === NaN) {
        return false;
    }
    
}

const  parseStringNumWithComma = (value) => {

    if(typeof value !== 'string') {
        console.error(`this function expects a string as an argument. ${value} is a typeOf:${typeof value}`);
        return null;
    }

    /*
        check if string hasComma
        check if string only contains numbers
        check if string is convertable to a valid number
    */

    /*
        parse the numbers that are in string datatypes and has a comma
        ex. "1,700" will be parsed into 1700
    */

    // check if string doesn't have a comma. Return false if true;
    if(!hasComma(value)) {
        console.error(`this string: "${value}" doesn't have a comma`);
        return false;
    }

    const removedComma = value.replace(/,/g, '');
    const onlyNumbers = /^[0-9]+$/.test(removedComma);

    // check if string only contains numbers. If false, return false. If true, proceed.
    if(!onlyNumbers) {
        console.error(`this string: "${removedComma}" should only include numbers`);
        return false;
    }

    return parseFloat(removedComma);
}

const classifier = (data) => {

    const dataClassification = {

        data: data,
        dataType: typeof(data),
        isNan: isNaN(data),
        isNum: !isNaN(data),
        isFinite: isFinite(data)
        
    }

    return dataClassification;
}

const DatasetClassifier = (dataset) => {

    let hasNum, hasString;
    hasNum = dataset.some( data => !isNaN(data));
    hasString = dataset.some( data => typeof(data) === 'string');
    
    const datasetClassification = {

        dataset: dataset,
        hasNum: hasNum,
        hasString: hasString,

        
        // dataType: typeof(dataset),
        // isNan: isNaN(dataset),
        // isNum: !isNaN(dataset),
        // isFinite: isFinite(dataset)
        
    }

    return datasetClassification;
}

// 
let testArray = ['03','3',"1",'2', "09", '10', '11', '20'];

const alphanumericComparator = (a,b) => {

    let collator = new Intl.Collator(undefined, {

        numeric: true,
        sensitivity: 'base'

    });

    let greater = collator.compare(a,b);

    return 
}

let testParser = (array, dataPointIndex = null) => {

    console.log('testparser')
    if(array.length <= 1) return;
    let parsed = array.map( rowOfData => {
        return stringToNumber(rowOfData[dataPointIndex])
    })

    console.log(parsed)

}

// strings

// pure numbers

export {

    testParser,
    realValues,
    stringToNumber,
    removeUndefined,
    arrayStringToNumber,

}