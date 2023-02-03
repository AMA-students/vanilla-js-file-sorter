import { alphanumericComparator, sortingMode } from "../../classes/utility.js"

const bubbleSort = (array, dataPointIndex, dataRecorder) => {
    
    if (array.length <= 1) return array;

    let isAscending = true;

    let aux; 

    const option = { numeric: true, sensitivity: 'base' };
    const collator = new Intl.Collator(undefined, option);

    for(let x = 0; x < array.length; x++) {
        
        for(let y = 0; y < array.length; y++) {

            const [currentX, currentY] = sortingMode(array[x], array[y], dataPointIndex, dataRecorder);

            const someString = typeof(currentY) === 'string' || typeof(currentX) === 'string';
             
            const comparison = {
                left: currentX, 
                right: currentY,
                comparison: false 
            }

            if(someString) {


                dataRecorder?.comparisonHistoryRecorder(comparison)

                if(alphanumericComparator(currentY, currentX, collator)) {

                    comparison.comparison = true

                    aux = array[y]

                    if(dataRecorder) { 
                        array[y]?.moveHistoryRecorder(x), 
                        array[x]?.moveHistoryRecorder(y) 
                    }
                    
                    array[y] = array[x]
                    array[x] = aux

                }
                continue;

            }

            // isAscending
            if(isAscending) {

                dataRecorder?.comparisonHistoryRecorder(comparison)

                if( currentX < currentY ) {

                    comparison.comparison = true

                    aux = array[y]

                    if(dataRecorder) { 
                        array[y]?.moveHistoryRecorder(x), 
                        array[x]?.moveHistoryRecorder(y) 
                    }
                    
                    array[y] = array[x]
                    array[x] = aux

                }
                continue;

            }

            // !isAscending
            if(isAscending) return;

            dataRecorder?.comparisonHistoryRecorder(comparison)

            if( currentX < currentY ) {

                comparison.comparison = true

                aux = array[y]

                if(dataRecorder) { 
                    array[y]?.moveHistoryRecorder(x), 
                    array[x]?.moveHistoryRecorder(y) 
                }
                
                array[y] = array[x]
                array[x] = aux
              
            }


        }
    }

    dataRecorder?.initializeSortedParsedFileContent();
    console.log(dataRecorder);
    return array

}

export default bubbleSort;