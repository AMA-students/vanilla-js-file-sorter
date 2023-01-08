import {alphanumericComparator, isValidNumberButWithCommaValidator } from "../../classes/utility.js";

const bubbleSort = (array, dataPointIndex) => {

    if (array.length <= 1) return array;

    let isAscending = true;

    let aux;

    const option = { numeric: true, sensitivity: 'base' };
    const collator = new Intl.Collator(undefined, option);

    if(dataPointIndex !== null) {

        for(let x = 0; x < array.length; x++) {

            
            for(let y = 0; y < array.length; y++) {

                const [
                    currentY,
                    currentX
                ] = isValidNumberButWithCommaValidator(array[x][dataPointIndex], array[y][dataPointIndex]);

                if(typeof(currentY) === 'string' || typeof(currentX) === 'string') {
                    if(alphanumericComparator(currentX, currentY, collator)) {
                        aux = array[y]
                        array[y] = array[x]
                        array[x] = aux
                    }
                    continue;
                }

                if( currentX < currentY ) {
                    aux = array[y]
                    array[y] = array[x]
                    array[x] = aux
                }
            }
        }
        return array
    }

    for(let x = 0; x < array.length; x++) {
        
        for(let y = 0; y < array.length; y++) {
            if(!isAscending) {
                if(array[x] > array[y]) {
                    aux = array[y]
                    array[y] = array[x]
                    array[x] = aux
                }
            } else {
                if(array[x] < array[y]) {
                    aux = array[y]
                    array[y] = array[x]
                    array[x] = aux
                }
            }
        }
    }

    
    return array
}

export default bubbleSort;