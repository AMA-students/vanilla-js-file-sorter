import DataRecorder from "./DataRecorder.js";

class CSVRecorder extends DataRecorder {

    DataRecorder() {
        this.initializeFileContent(fileContent)
        console.log();
    }

    constructor(fileContent, datapointIndex) {
        super();

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

        this.sortedFileContent = [...this.fileContentBody]

        this.fileContentRecords.forEach(record => {

            const initialPos = record.moveHistory[0]

            const lastPos = record.moveHistory[record.moveHistory.length - 1]

            console.log(record,initialPos, lastPos);

            [this.sortedFileContent[initialPos], this.sortedFileContent[lastPos]] = 
            [this.sortedFileContent[lastPos], this.sortedFileContent[initialPos]]

        })
        this.sortedFileContent = [this.fileContentHeader, ...this.sortedFileContent];
        
        // this.SortedFileContentRecords = SortedFileContentRecords;

        // this.SortedParseFileContent = this.SortedFileContentRecords.parsedFileContent

        // this.SortedParseFileContentHeader = this.SortedFileContentRecords.parsedFileContentHeader
        
        // this.SortedParsedFileBody = this.SortedFileContentRecords.parsedFileBody

    }
    
}

export {
    CSVRecorder
}