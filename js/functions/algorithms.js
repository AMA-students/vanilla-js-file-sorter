export const bubbleSort = (arr = [8,5,12,4,32,65,32], isAscending = true, controlVar) => {

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


const insertionSort = (arr) => {

}

const mergeSort = (arr) => {

}
