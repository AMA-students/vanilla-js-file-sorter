import { CSVRecorder, JSONRecorder } from "../classes/FileRecorders.js"
import { CSVDataRecorder } from "../factory-functions/dataRecorder.js"

const dataRecordersV1 = {
    csv: () => new CSVRecorder(),
    json: () => new JSONRecorder(),
}

const dataRecordersV2 = {
    csv: () => CSVDataRecorder()
}

const dataRecorders = {
    v1: dataRecordersV1,
    v2: dataRecordersV2,
}

const dataRecordersMap = (fileName, version = "v1") => {

    const fileExtension = fileName.match(/[^.]*(?=$)/)

    const fileRecorders = dataRecorders[version];

    if(!fileRecorders.hasOwnProperty(fileExtension)) {
        console.error(`The fileRecorder.${version} does not provide a fileRecorder for ${fileExtension}`);
        return null;
    }

    return fileRecorders[fileExtension]();
}

export {
    dataRecordersMap
}