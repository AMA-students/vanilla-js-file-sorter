import { realValParser } from "../../classes/state.js"

let index = 0;

const quickSort = (array, dataPointIndex) => {

    index++

    console.log(index, array)

    let isAscending = true;

    let realValues = array.map(rowOfData => {
        return rowOfData[dataPointIndex]
    })

    if (array.length <= 1) return array;
    
    // let pivot = first element of the array
    let pivot = array[0]
  
    // contains the elements that are < pivot
    const less = []; 
  
    // contains the elements that are > pivot
    const greater = [];
  
    if(isAscending) {
        for (let i = 1; i < array.length; i++) {
            realValues[i] < pivot[dataPointIndex] ? less.push(array[i]) : greater.push(array[i]);
        }
    }

    if(!isAscending) {
        for (let i = 1; i < array.length; i++) {
            realValues[i] > pivot[dataPointIndex] ? less.push(array[i]) : greater.push(array[i]);
        }
    }

    return quickSort(less, dataPointIndex).concat([pivot], quickSort(greater, dataPointIndex));
  }
  
  
  // tests
  
  var unsorted = [23, 45, 16, 37, 3, 99, 22];
  var unsortedd = [[23,42], [45, 16], [37, 3], [22,43]];
  const unsorted2 = [[45, 16],[23,42], [37, 3], [22,43]];
  
  const config = {
    array: unsorted,
    isAscending: true,
    dataPointIndex: null
  }
  
  const yeet = quickSort(unsorted2, 1)
  
  console.log('Sorted by quickSortTest', yeet);
  
  export default quickSort;