const divide = (arr = arr, limiter) => {

    //expected
    /*  
        array = [0 - 99]
        array length = 100
        limiter = 50

        divide(array, limiter) = [[0 - 49],[50 - 99]];
    */

    /*

        divisor - the number of times the array will be divided
        limiter - the limit for how many elements each subarray/divided array can have
        len - length of array
    */

    const len = arr.length;

    let divisor;

    if(len < limiter) return [arr];

    divisor = Math.floor(len / limiter);

    let divided = [];

    let i = 0;
    let currentIndex = 0;
    while(i < divisor) {
        divided.push(arr.slice(currentIndex, currentIndex += limiter))
        
        if(arr.length - currentIndex < limiter && arr.length - currentIndex !== 0) {
            // console.log(currentIndex - arr.length, limiter)
            // console.log(arr.slice(currentIndex, arr.length))
            divided.push(arr.slice(currentIndex, arr.length))
        }
        i++;
    }
    // console.log(divided)
    return divided
}
export default divide;