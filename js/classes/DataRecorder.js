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

        if(!this.parsedFileContentBody) return;

        this.setParsedFileContentRecords();
    }

    setComparisonHistory(history) {
        this.comparisonHistory = history;
    }

    fileContentSplitter(delimiter) {

        this.delimiter = delimiter // fileContent splitter
        this.splitFileContent = this.fileContent.split(this.delimiter) // split fileContent by the delimiter
        this.splitFileContent = removeUndefined(this.splitFileContent)
        this.setFileContentHeader(this.splitFileContent[0])        // csv header
        this.setFileContentBody(this.splitFileContent.slice(1))   // csv data

    }

    setParsedFileContentRecords() {
        this.fileContentRecords.forEach((record, index) => {

            record.setParsedFileContentLine(
                this.parsedFileContentBody[index]
            )

            record.setValue(
                this.parsedFileContentBody[index][this.datapointIndex]
            )

        });
    }

    setFileContentRecords = () => {

        this.setComparisonHistory([]);

        this.fileContentRecords = this.parsedFileContentBody.map((fileContentLine, index) => {
            if(fileContentLine != '') {
                return new FileContentRecord(fileContentLine, index) // create data record for each line of the data body
            }
        })

        if(!this.parsedFileContentBody) return;

        this.setParsedFileContentRecords()
    }

    setFileContentHeader = (fileContentHeader) => {
        this.fileContentHeader = fileContentHeader
    }

    setFileContentBody = (fileContentBody) => {

        this.fileContentBody = fileContentBody

        this.setFileContentRecords()

    }

    setParsedFileContent = (parsedFileContent) => {

        this.parsedFileContent = parsedFileContent;

        this.setParsedFileContentHeader(this.parsedFileContent[0]);
        this.setParsedFileContentBody(this.parsedFileContent.slice(1));

    } 

    setParsedFileContentHeader = (setParsedFileContentHeader) => {
        this.parsedFileContentHeader = setParsedFileContentHeader
    }

    setParsedFileContentBody = (parsedFileContentBody) => {
        this.parsedFileContentBody = parsedFileContentBody
    }

    comparisonHistoryRecorder = (comparison) => {
        this.comparisonHistory.push(comparison)
    }
}

class FileContentRecord {

    constructor(fileContentLine, index) {

        this.fileContentLine = fileContentLine; // the line of data before it was seperated by the delimiter

        this.parsedFileContentLine = null;  // can be taken from the array

        this.value = null; // the value of the column to be sorted for that particular row

        this.moveHistory = [index] // history of where the element was moved starting from its initial position

    }

    moveHistoryRecorder(indexMoved) {
        this.moveHistory.push(indexMoved)
    }

    setParsedFileContentLine = (parsedFileContentLine) => {
        this.parsedFileContentLine = parsedFileContentLine
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