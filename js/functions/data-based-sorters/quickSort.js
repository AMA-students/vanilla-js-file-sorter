import { alphanumericComparator, stringToNumber, sortingMode } from "../../classes/utility.js";

const quickSort = (array, dataPointIndex, dataRecorder) => {
    
  let isAscending = true;

  if (array.length <= 1) return array;
  
  // let pivot = first element of the array
  let pivot = array[0]

  // contains the elements that are < pivot
  const less = []; 

  // contains the elements that are > pivot
  const greater = [];

  const option = { numeric: true, sensitivity: 'base' };
  const collator = new Intl.Collator(undefined, option);

  // only run when !isAscending
  if(!isAscending) {
    for (let i = 1; i < array.length; i++) {
    //   const leftValue = stringToNumber(array[i][dataPointIndex]).realVal;
    //   const rightValue = stringToNumber(pivot[dataPointIndex]).realVal;

        const [leftValue, rightValue] = sortingMode(array[i], pivot, dataPointIndex, dataRecorder)

        if(typeof(leftValue) === 'string' || typeof(rightValue) === 'string') {

            alphanumericComparator(leftValue, rightValue, collator)  ? less.push(array[i]) : greater.push(array[i]);

            continue;
        }

      leftValue > rightValue ? less.push(array[i]) : greater.push(array[i]);
    }

    return quickSort(less, dataPointIndex).concat([pivot], quickSort(greater, dataPointIndex));
  }

  // default
  for (let i = 1; i < array.length; i++) {

    // let leftValue = stringToNumber(array[i][dataPointIndex]).realVal;
    // let rightValue = stringToNumber(pivot[dataPointIndex]).realVal;

    const [leftValue, rightValue] = sortingMode(array[i], pivot, dataPointIndex, dataRecorder)

    if(typeof(leftValue) === 'string' || typeof(rightValue) === 'string') {

      alphanumericComparator(rightValue, leftValue, collator)  ? less.push(array[i]) : greater.push(array[i]);

      continue;
    }
    
    // console.log(`${leftValue} > ${rightValue} ? : ${leftValue > rightValue}`)
    leftValue < rightValue ? less.push(array[i]) : greater.push(array[i]);
    
  }

    const result = quickSort(less, dataPointIndex, dataRecorder).concat([pivot], quickSort(greater, dataPointIndex, dataRecorder));
    
    if(dataRecorder) {
        dataRecorder.fileContentRecords = result;
    }

  return result;
}

export default quickSort;