const bubbleSort = ({ array = [0], controlVar = 0, isAscending = true }) => {

    if (array.length <= 1) return array;

    let aux;

    if(controlVar) {

        for(let x = 0; x < array.length; x++) {
        
            for(let y = 0; y < array.length; y++) {
                if(!isAscending) {
                    if(array[x][controlVar] > array[y][controlVar]) {
                        aux = array[y]
                        array[y] = array[x]
                        array[x] = aux
                    }

                } else {
                    if(array[x][controlVar] < array[y][controlVar]) {
                        aux = array[y]
                        array[y] = array[x]
                        array[x] = aux
                    }

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