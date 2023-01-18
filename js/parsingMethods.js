import { CSVParser, JSONParser, getObjKeys, getObjValues } from './classes/CSVParser.js';
import { removeUndefined } from './classes/utility.js';

const CSVParsing = (data) => {
  console.time('CSVParse')

  const CSV = CSVParser(data.split('\n'));

  const headerColumn = CSV[0];
  const csvBody = CSV.slice(1)
  const dataBody = removeUndefined(csvBody)

  console.timeEnd('CSVParse')

  return [headerColumn, dataBody]
}

const JSONParsing = (data) => {
  console.time('JSON parsing');
  let arrofObj = JSONParser(data);

  const keys = getObjKeys(arrofObj[0])
  const values = arrofObj.map(obj => {
    return getObjValues(obj);
  })

  console.timeEnd('JSON parsing')
  return [keys, values];
}

export {
  CSVParsing,
  JSONParsing
}