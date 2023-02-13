import DataRecorder from "./DataRecorder.js";

class CSVRecorder extends DataRecorder {

    DataRecorder() {
        this.initializeFileContent(fileContent)
        console.log();
    }

    constructor(fileContent, datapointIndex) {
        super();

        this.type = "CSV";

        this.initializeFileContent(fileContent)
        
        this.initializeDatapointIndex(datapointIndex)
    }

    initializeFileContent(fileContent) {
        this.setFileContent(fileContent)

        if(!this.fileContent) return null;

        this.fileContentSplitter('\n')

        if(!this.splitFileContent) return null;
        this.setFileContentHeader(this.splitFileContent[0])
        this.setFileContentBody(this.splitFileContent.slice(1))

        this.initializeFileContentRecords()
    }

    initializeParsedFileContent(parsedFileContent) {
        this.setParsedFileContent(parsedFileContent)
        this.setParsedFileContentHeader(this.parsedFileContent[0])
        this.setParsedFileContentBody(this.parsedFileContent.slice(1))

        this.setComparisonHistory([])

        this.initializeFileContentRecords()
    }

    initializeFileContentRecords() {
        if(!this.parsedFileContentBody) return null;
        this.setFileContentRecords()

        if(!this.fileContentRecords) return null;
        this.setFileContentLines()
        
        if(!this.datapointIndex) return null;
        this.setFileContentValues()
    }

    initializeDatapointIndex(datapointIndex) {
        this.datapointIndex = datapointIndex

        if(!this.fileContentRecords) return null;
        this.setFileContentValues()
    }

    initializeSortedFileContent() {

        this.sortedFileContent = [
            this.fileContentHeader,
            ...this.fileContentRecords.map(record => record.fileContentLine)
        ]

    }

    initializeSortedParsedFileContent() {

        this.sortedParsedFileContent = [
            this.parsedFileContentHeader,
            ...this.fileContentRecords.map(record => record.parsedFileContentLine)
        ]

    }
    
}

class JSONRecorder extends DataRecorder {

    constructor(fileContent, datapointIndex) {
        
        // super(fileContent, datapointIndex);
        super();

        this.type = "JSON";

        if(!(fileContent && datapointIndex)) return;

        this.initializeFileContent(fileContent)
        
        this.initializeDatapointIndex(datapointIndex)
    }

    initializeFileContent(fileContent) {
        this.setFileContent(fileContent)

    }

    initializeParsedFileContent(headerColumn, dataBody, errorHandler) {
        if(!this.fileContent) return;

        this.setParsedFileContentHeader(headerColumn)
        
        this.setParsedFileContentBody(dataBody)

        try {
            this.parsedFileContent = JSON.parse(this.fileContent);

        } catch (error) {
            errorHandler(error)
        }

        this.setComparisonHistory([])

    }

    initializeFileContentRecords() {
        if(!this.parsedFileContentBody) return null;
        this.setFileContentRecords()
    }

    initializeDatapointIndex(datapointIndex) {
        this.datapointIndex = datapointIndex

        if(!this.fileContentRecords) return null;
        this.setFileContentValues()
    }
    
}

function traverser(obj, propertyPath, level = 0) {

    const pathLenth = propertyPath.length - 1;

    const newObj = obj[propertyPath[level]];

    if(level === pathLenth) return newObj;

    level++;

    return traverser(newObj, propertyPath, level)
}

const dataRecorderSetter = (fileName) => {

    const fileExtension = fileName.match(/[^.]*(?=$)/)

    const fileRecorders = {
        csv: () => new CSVRecorder(),
        json: () => new JSONRecorder()
    }

    return fileRecorders[fileExtension]();
}



export {
    traverser,
    CSVRecorder,
    JSONRecorder,
    dataRecorderSetter
}