const quickSort = ({ array = [0], dataPointIndex = 0, isAscending = true }) => {

  if (array.length <= 1) return array;
  
  // let pivot = first element of the array
  let pivot = array[0]

  // contains the elements that are < pivot
  const less = []; 

  // contains the elements that are > pivot
  const greater = [];

  if(isAscending) {
    if(dataPointIndex) {
      for (let i = 1; i < array.length; i++) {
        array[i][dataPointIndex] < pivot[dataPointIndex] ? less.push(array[i]) : greater.push(array[i]);
      }
    } else {
      for (let i = 1; i < array.length; i++) {
        array[i] < pivot ? less.push(array[i]) : greater.push(array[i]);
      }
    }
  }

  if(!isAscending) {
    if(dataPointIndex) {
      for (let i = 1; i < array.length; i++) {
        array[i][dataPointIndex] > pivot[dataPointIndex] ? less.push(array[i]) : greater.push(array[i]);
      }
    } else {
      for (let i = 1; i < array.length; i++) {
        array[i] > pivot ? less.push(array[i]) : greater.push(array[i]);
      }
    }
  }

  const lessConfig = { array: less, dataPointIndex: dataPointIndex, isAscending: isAscending }
  const greaterConfig = { array: greater, dataPointIndex: dataPointIndex, isAscending: isAscending }
  return quickSort(lessConfig).concat([pivot], quickSort(greaterConfig));
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

const yeet = quickSort(config)

console.log('Sorted by quickSort', yeet);

export default quickSort;