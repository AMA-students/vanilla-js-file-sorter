import quickSort from "../functions/algo/quickSort.test.js";
import { removeUndefined } from "./utility.js";

export default class {

    onDisplay(results, dataPointIndex) {


        const csvBody = results.data.slice(1)
    
        const dataBody = removeUndefined(csvBody)
        
        return quickSort(dataBody, dataPointIndex)
    }

}
