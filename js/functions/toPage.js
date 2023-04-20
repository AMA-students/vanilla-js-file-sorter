export const container = document.querySelector("#output");
export const resultContainer = document.querySelector("#result");

export function printArray(arr)
{
    let i;
    let size = arr.length;
    for (i = 0; i < size; i++)
    {
        let test1 = arr[i];

        container.innerHTML += test1 + " ";
        // container.innerHTML += " <br>";
        // console.log("Test Count");
    }
}

export function copyUnsorted(arr){
    let testArr = [];
    for(let i = 0 ; i > 5 ; i++)
    {
        testArr[i].push(JSON.parse(JSON.stringify(arr)));
        console.log("test");
    }
    return [...testArr];
}
export function printTime(arr){
    console.log("test");
    console.log(arr);
    for(let i = 0; i<arr.length; i++)
    {
        for(let j=1; j<arr[i].length+1; j++)
        {
            if(j%2 == 0){
                resultContainer.innerHTML += arr[i][j-1] + "<br>";
            }else       
                resultContainer.innerHTML += arr[i][j-1];
        }
    }
    // arr.forEach(printResult);
}


// export function printTime(arr)
// {
//     let i;
//     let size = arr.length;
//     for (i = 0; i < size; i++)
//     {
//         resultContainer.innerHTML += arr[i] + "<br>";
//     }
// }

export function printResult(e, i)
{
    if(i%2 == 0){
        resultContainer.innerHTML += e + "<br>";
    }else       
    resultContainer.innerHTML += e;
    
}