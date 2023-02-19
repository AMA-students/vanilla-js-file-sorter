import { CSVParser, JSONParser, getObjKeys, getObjValues } from './classes/CSVParser.js';
import { removeUndefined } from './classes/utility.js';

const CSVParsing = (dataRecorder) => {
  console.time('CSVParse')
  
  // console.log(dataRecorder.splitFileContent);
  // const CSV = CSVParser(dataRecorder.splitFileContent);
  const CSV = CSVParser(dataRecorder.splitFile);
  const headerColumn = CSV[0];
  const csvBody = CSV.slice(1)
  const dataBody = removeUndefined(csvBody)

  console.timeEnd('CSVParse')

  return [headerColumn, dataBody]
}

const JSONParsing = (dataRecorder) => {

  console.time('JSON parsing');
  let arrofObj = JSONParser(dataRecorder.fileContent);

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