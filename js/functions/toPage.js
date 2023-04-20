export const container = document.querySelector("#output");
export const resultContainer = document.querySelector("#result");
const timeTable = document.querySelector(".timeTable");

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

export function copyUnsorted(arr){ // Unnecessary left over code (to be deleted)
    let testArr = [];
    for(let i = 0 ; i > 5 ; i++)
    {
        testArr[i].push(JSON.parse(JSON.stringify(arr)));
        console.log("test");
    }
    return [...testArr];
} // Idk sa tingin ko naging shallow copy yung array tapos gusto ko deep copy?

// export function printTime(arr){
//     for(let i = 0; i<arr.length; i++) // Select the sorting algorithm
//     {
//         timeTable.innerHTML += "<tr>" + `<td>${arr[i][0]}</td>`;
//         for(let j=1; j<arr[i][1][0].length + 1; j++) // Select the data result from the sorting algorithm
//         {
//             // console.log("Array 3 length");
//             // console.log(arr[i][1][0][j-1].length);
//             for(let r = 0; r<2; r++){
//                 // console.log(r);
//                 if(!r){
//                     resultContainer.innerHTML += arr[i][1][0][j-1][r]; // 5th [] = [modifer, result]
//                 }else
//                     resultContainer.innerHTML += ", " + arr[i][1][0][j-1][r] + "<br>"; // 5th [] = [modifer, result]
//             }            
//         }
//     }
//     // arr.forEach(printResult);
// }

// export function printTime(arr){ 
//     // console.log("test");
//     // console.log(arr);
//     for(let i = 0; i<arr.length; i++) // Select the sorting algorithm
//     {
//         timeTable.innerHTML += `<tr id="table ${i}">` + `<td>${arr[i][0]}</td>`;
//         for(let j=1; j<arr[i].length; j++) // Select the data result from the sorting algorithm
//         {   
//             if(j%2 == 0){
//                 timeTable.innerHTML += `<td>${arr[i][j]}</td>`;
//             }else       
//                 timeTable.innerHTML += `<td>${arr[i][j]}</td>`;
//         }
//     }
//     // arr.forEach(printResult);
// }


export function printTime(arr)
{
    let i;
    let size = arr.length;
    for (i = 0; i < size; i++)
    {
        resultContainer.innerHTML += arr[i] + "<br>";
    }
}

export function printResult(e, i)
{
    if(i%2 == 0){
        resultContainer.innerHTML += e + "<br>";
    }else       
    resultContainer.innerHTML += e;
    
}