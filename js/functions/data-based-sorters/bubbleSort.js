import {alphanumericComparator, isValidNumberButWithCommaValidator, arrayOrderMapper } from "../../classes/utility.js";

const bubbleSort = (array, dataPointIndex) => {

    if (array.length <= 1) return array;

    let isAscending = true;

    let aux; 

    const option = { numeric: true, sensitivity: 'base' };
    const collator = new Intl.Collator(undefined, option);

    for(let x = 0; x < array.length; x++) {
        
        for(let y = 0; y < array.length; y++) {
            
            const [currentX, currentY] = mode(array[x], array[y], dataPointIndex);

            const someString = typeof(currentY) === 'string' || typeof(currentX) === 'string';

            if(someString) {

                if(alphanumericComparator(currentY, currentX, collator)) {
                    aux = array[y]
                    array[y] = array[x]
                    array[x] = aux
                }
                continue;

            }

            // isAscending
            if(isAscending) {

                if( currentX < currentY ) {
                    aux = array[y]
                    array[y] = array[x]
                    array[x] = aux
                }
                continue;

            }

            // !isAscending
            if(isAscending) return;
            if( currentX < currentY ) {
                aux = array[y]
                array[y] = array[x]
                array[x] = aux
            }


        }
    }
    return array

}

const mode = (currentX, currentY, dataPointIndex) => {

    if(dataPointIndex == null) {

        return [
            currentX,
            currentY
        ] = isValidNumberButWithCommaValidator(currentX, currentY);
    }


    return [
        currentX,
        currentY
    ] = isValidNumberButWithCommaValidator(currentX[dataPointIndex], currentY[dataPointIndex]);
}

export default bubbleSort;