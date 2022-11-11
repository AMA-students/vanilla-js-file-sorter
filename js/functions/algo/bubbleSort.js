import { stringToNumber, alphanumericComparator } from "../../classes/utility.js";

const bubbleSort = (array, dataPointIndex) => {

    if (array.length <= 1) return array;

    let isAscending = true;

    let aux;

    const option = { numeric: true, sensitivity: 'base' };
    const collator = new Intl.Collator(undefined, option);

    if(dataPointIndex) {

        for(let x = 0; x < array.length; x++) {

            
            for(let y = 0; y < array.length; y++) {

                const currentX = stringToNumber(array[x][dataPointIndex]).realVal;
                const currentY = stringToNumber(array[y][dataPointIndex]).realVal;

                if(typeof(currentY) === 'string' || typeof(currentX) === 'string') {
                    // console.log(`${currentY} > ${currentX} : ${currentY > currentX} ?`)
                    if(alphanumericComparator(currentY, currentX, collator)) {
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

// tests

// var unsorted = [23, 45, 16, 37, 3, 99, 22];
// var unsortedd = [[23,42], [45, 16], [37, 3], [22,43]];
// const unsorted2 = [[45, 16],[23,42], [37, 3], [22,43]];

// const config = {
//   array: unsortedd,
//   isAscending: true,
//   dataPointIndex: 0
// }

// const yeet = bubbleSort(config)

// console.log('Sorted by bubbleSort', yeet);