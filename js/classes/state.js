import quickSort from "../functions/algo/quickSort.test.js";
export default class {

    onDisplay(results, dataPointIndex) {
        const { realValParser, removeUndefined } = this;

        const csvBody = results.data.slice(1)
    
        const bodyData = removeUndefined(csvBody)
        
        return quickSort(bodyData, dataPointIndex)
    }

    realValParser(value) {
        return {
            original: value, 
            realVal: !isNaN(value) ? parseFloat(value): value
        }
    }

    removeUndefined = data => data.filter(element => element !== undefined && element != '');

}

export const  realValParser = (value) => {
    return {
        original: value, 
        realVal: !isNaN(value) ? parseFloat(value): value
    }
}