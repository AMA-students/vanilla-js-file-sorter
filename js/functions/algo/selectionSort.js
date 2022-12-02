import { alphanumericComparator, stringToNumber } from "../../classes/utility.js"

function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
      let lowest = i
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[lowest]) {
          lowest = j
        }
      }
      if (lowest !== i) {
        // Swap
        ;[arr[i], arr[lowest]] = [arr[lowest], arr[i]]
      }
    }
    return arr
}

function selectionSortCSV(arr, dataPointIndex) {
  for (let i = 0; i < arr.length; i++) {

    // base lowest
    let lowest = i

    const option = { numeric: true, sensitivity: 'base' };
    const collator = new Intl.Collator(undefined, option);

    // for loop for determining the actual lowest
    for (let j = i + 1; j < arr.length; j++) {
      const currentValue = stringToNumber(arr[j][dataPointIndex]).realVal;
      const currentLowest = stringToNumber(arr[lowest][dataPointIndex]).realVal;

      if(typeof(currentValue) === 'string' || typeof(currentLowest) === 'string') {

        if(alphanumericComparator(currentLowest, currentValue, collator)) {
          lowest = j
        }

        continue;
      }

      if ( currentValue < currentLowest ) {
        lowest = j
      }
    }

    if (lowest !== i) {
      // Swap
      ;[arr[i], arr[lowest]] = [arr[lowest], arr[i]]
    }
  }
  return arr
}


// console.log(selectionSort([3, 5, 1, 2])) // [1, 2, 3, 5]
const unsorted2 = [[45, 16],[23,42], [37, 3], [22,43]];
// console.log(selectionSortCSV(unsorted2,0));
export {
  selectionSortCSV,
}