import { alphanumericComparator, sortingMode } from "../../classes/utility.js"

function selectionSort(arr, dataPointIndex) {
  for (let i = 0; i < arr.length; i++) {

    // base lowest
    let lowest = i

    const option = { numeric: true, sensitivity: 'base' };
    const collator = new Intl.Collator(undefined, option);

    // for loop for determining the actual lowest
    for (let j = i + 1; j < arr.length; j++) {

      const [currentValue, currentLowest] = sortingMode(arr[j], arr[lowest], dataPointIndex);

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
      [arr[i], arr[lowest]] = [arr[lowest], arr[i]]
    }
  }
  return arr
}

// console.log(selectionSort([3, 5, 1, 2])) // [1, 2, 3, 5]
const unsorted2 = [[45, 16],[23,42], [37, 3], [22,43]];

const unsorted3 = unsorted2.map(elem => elem[1]);

console.log(selectionSort(unsorted3));

export {
  selectionSort,
}