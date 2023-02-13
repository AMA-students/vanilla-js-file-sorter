import { removeUndefined } from "./utility.js";
export default class {
    constructor(fileContent, datapointIndex) {
        this.setFileContent(fileContent) // fileContent data

        this.setDataPointIndex(datapointIndex) // index of the column to be sorted
    }

    setFileContent(fileContent) {
        this.fileContent = fileContent // fileContent data
    }

    setDataPointIndex(datapointIndex) {
        this.datapointIndex = datapointIndex // index of the column to be sorted
    }

    setComparisonHistory(history) {
        this.comparisonHistory = history;
    }

    fileContentSplitter(delimiter) {
        this.delimiter = delimiter // fileContent splitter
        this.splitFileContent = this.fileContent.split(this.delimiter) // split fileContent by the delimiter
        this.splitFileContent = removeUndefined(this.splitFileContent)
    }

    setFileContentLines() {
        this.fileContentRecords.forEach((record, index) => {

            record.setFileContentLine(
                this.fileContentBody[index]
            )

        });
    }

    setFileContentValues() {
        this.fileContentRecords.forEach((record, index) => {

            record.setValue(
                this.parsedFileContentBody[index][this.datapointIndex]
            )

        });
    }

    setFileContentRecords = () => {
        this.fileContentRecords = this.parsedFileContentBody.map((parsedFileContentLine, index) => {
            return new FileContentRecord(parsedFileContentLine, index) // create data record for each line of the data body
        })
    }

    setFileContentHeader = (fileContentHeader) => {
        this.fileContentHeader = fileContentHeader
    }

    setFileContentBody = (fileContentBody) => {

        this.fileContentBody = fileContentBody

    }

    setParsedFileContent = (parsedFileContent) => {
        this.parsedFileContent = removeUndefined(parsedFileContent);
    } 

    setParsedFileContentHeader = (setParsedFileContentHeader) => {
        this.parsedFileContentHeader = setParsedFileContentHeader
    }

    setParsedFileContentBody = (parsedFileContentBody) => {
        this.parsedFileContentBody = parsedFileContentBody
    }

    comparisonHistoryRecorder(comparison) {
        this.comparisonHistory.push(comparison)
    }
}

class FileContentRecord {

    constructor(parsedFileContentLine, index) {

        this.fileContentLine = null; // the line of data before it was seperated by the delimiter

        this.parsedFileContentLine = parsedFileContentLine;  // can be taken from the array

        this.value = null; // the value of the column to be sorted for that particular row

        this.moveHistory = [index] // history of where the element was moved starting from its initial position

    }

    moveHistoryRecorder(indexMoved) {
        this.moveHistory.push(indexMoved)
    }

    setParsedFileContentLine = (parsedFileContentLine) => {
        this.parsedFileContentLine = parsedFileContentLine
    }

    setFileContentLine = (fileContentLine) => {
        this.fileContentLine = fileContentLine
    }

    setValue = (value) => {
        this.value = value
    }
    
}

/*
    DataRecorder will handle the overAll data.
    This will include saving the: 
    header, 
    dataBody, 
    dataPointIndex
    fileContent data, 
    parsed data, 
    and the collection of the data records


    DataRecoreds will handle the line of the data. 
    This will include the:
    fileContent line of the data,
    the parsed line of the data, 
    the moveHistory of that data, 
    the value to be sorted on the data,
*/

export {
    FileContentRecord
}