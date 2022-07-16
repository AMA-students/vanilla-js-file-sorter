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

const quickSort = (arr) => {

}

const insertionSort = (arr) => {

}

const mergeSort = (arr) => {

}

export function quicksort(options) {
    const {array, isAscending, controlVar} = options
    if (array.length <= 1) {
      return array;
    }

    let pivot = array[0]
    console.log(controlVar )
    
    const left = []; 
    const right = [];
    
    
    for (let i = 1; i < array.length; i++) {
        // console.log(array[i])
      array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
    }

    const quickSortLeft = {array: left, isAscending: isAscending, controlVar: controlVar}
    const quickSorRight = {array: right, isAscending: isAscending, controlVar: controlVar}

    return quicksort(quickSortLeft).concat(pivot, quicksort(quickSorRight));
};
  
  var unsorted = [23, 45, 16, 37, 3, 99, 22];
  var unsortedd = [[23], [45, 16], [37, 3, 99], [22]];
  var sorted = quicksort({array:unsorted, isAscending:true, controlVar:null});
  
  console.log('Sorted array', sorted);