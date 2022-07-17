export const bubbleSort = ({ array = [0], controlVar = 0, isAscending = true }) => {

    if (arr.length <= 1) return arr;

    let aux;

    if(controlVar) {

        for(let x = 0; x < arr.length; x++) {
        
            for(let y = 0; y < arr.length; y++) {
                if(!isAscending) {
                    if(arr[x][controlVar] > arr[y][controlVar]) {
                        aux = arr[y]
                        arr[y] = arr[x]
                        arr[x] = aux
                    }

                } else {
                    if(arr[x][controlVar] < arr[y][controlVar]) {
                        aux = arr[y]
                        arr[y] = arr[x]
                        arr[x] = aux
                    }

                }
            }
        }
        return arr
    }

    for(let x = 0; x < arr.length; x++) {
        
        for(let y = 0; y < arr.length; y++) {
            if(!isAscending) {
                if(arr[x] > arr[y]) {
                    aux = arr[y]
                    arr[y] = arr[x]
                    arr[x] = aux
                }
            } else {
                if(arr[x] < arr[y]) {
                    aux = arr[y]
                    arr[y] = arr[x]
                    arr[x] = aux
                }
            }
        }
    }

    
    return arr
}



// tests

var unsorted = [23, 45, 16, 37, 3, 99, 22];
var unsortedd = [[23,42], [45, 16], [37, 3], [22,43]];
const unsorted2 = [[45, 16],[23,42], [37, 3], [22,43]];

const config = {
  array: unsortedd,
  isAscending: true,
  controlVar: 1
}

const yeet = bubbleSort(config)

console.log('Sorted by bubbleSort', yeet);