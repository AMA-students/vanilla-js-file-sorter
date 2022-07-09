// import './style.css'
import { parse } from 'papaparse'

const table = document.querySelector('table');
const tableHeaders = document.querySelector('#headers');
const tableDatas = document.querySelector('#datas');

const getCSVData = async (file) => {
  const csv = await fetch(file)
  const text = await csv.text();
  console.log('parse:', parse(text.trimEnd()));
  return parse(text);
}

const displayCSV = async (file) => {
  const result = await getCSVData(file);
  const data = result.data

  const headers = data[0];
  // console.log(headers);
  headers.forEach(header => {
    const td = document.createElement('td');
    td.innerText = header;
    tableHeaders.appendChild(td);
  })

  // remove all undefineds
  const datas = removeUndefined(data.slice(35000));
  console.log(datas)

  //remove all comma and parse to float
  console.log(parseFloat("733,258".replace(/,/g, '')))

  // datas.sort((a,b) => parseInt(a[8]) - parseInt(b[8]));

  const parsedDatas = datas.map( data => {
    // if(data[8] == "C") {
    //   console.log(datas.indexOf(data));
    //   console.log(data)
    // }
    data[8] = {
      original: data[8],
      parsed: parseFloat(data[8].replace(/,/g, ''))
    }
    return data;
  })


  // console.log(parsedDatas.map(data => [data[8], data[9]]))
  console.log(parsedDatas.map(data => data[8]).indexOf("C") )
  // console.log(parsedDatas.map(data => data[8]).filter(value => value.original == "C"))
  console.log('datas',datas.map(data => data[8]).filter(value => value.original == "C"))
  // console.log(parsedDatas.map(data => [data[8], data[9]]).find(value => value[0].original == "C"))
  // console.log(datas.map(data => [data[8], data[9]]))
  
  parsedDatas.forEach(row => {

    const tr = document.createElement('tr');
    row.forEach( data => {
      const td = document.createElement('td');
      if(data.original) {
        td.innerText = data.original;
      }else {
        td.innerText = data;
      }
      // tableDatas.appendChild(td);
      tr.appendChild(td)
      // console.log(data)
    })
    table.appendChild(tr)
  });
  console.log(data)
}
displayCSV('annual-enterprise-survey-2020-financial-year-provisional-csv.csv')
// displayCSV('test.csv')
// getCSV('annual-enterprise-survey-2020-financial-year-provisional-csv.csv')



const loop  = async () => {
  let x = 0
  while(x > 50000) {
    console.log(x);
    x++;
  }
}

const stop = (task) => {
  setTimeout(task);
}

document.querySelector('button').onclick = stop(loop);

const removeUndefined = data => data.filter(element => element !== undefined && element != '');