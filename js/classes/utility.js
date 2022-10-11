export default class {

    twoDementionalArrayElemenentComparator(arr) {
        /*
            will return the values of the selected demension in an array
        */
        return 
    }    
}

const removeUndefined = data => data.filter(element => element !== undefined && element != '');

const  realValParser = (value) => {
    return {
        original: value, 
        realVal: !isNaN(value) ? parseFloat(value): value
    }
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

console.log( classifier("yeet12354"))

export {
    realValParser,
    removeUndefined
}