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

function quicksort(array= [8,5,12,4,32,65,32], isAscending = true) {
    if (array.length <= 1) {
      return array;
    }
  
    var pivot = array[0];
    
    var left = []; 
    var right = [];
  
    for (var i = 1; i < array.length; i++) {
      array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
    }
    console.log(`left: [${left}], right: [${right}], pivot: [${pivot}], result: [${quicksort(left).concat(pivot, quicksort(right))}]`)
    return quicksort(left).concat(pivot, quicksort(right));
};
  
  var unsorted = [23, 45, 16, 37, 3, 99, 22];
  var sorted = quicksort(unsorted);
  
  console.log('Sorted array', sorted);