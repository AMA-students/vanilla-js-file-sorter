import quickSort from "../functions/algo/quickSort.test.js";
import { removeUndefined } from "./utility.js";

export default class {

    onDisplay(results, dataPointIndex) {


        const csvBody = results.data.slice(1)
    
        const bodyData = removeUndefined(csvBody)
        
        return quickSort(bodyData, dataPointIndex)
    }

}
