const bubbleSort = (arr = [8,5,12,4,32,65,32], isAscending = true) => {
    let aux;

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

const quickSort = (arr) => {

}

const insertionSort = (arr) => {

}

const mergeSort = (arr) => {

}