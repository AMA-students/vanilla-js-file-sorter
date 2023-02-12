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

        this.initializeFileContent(fileContent)
        
        this.initializeDatapointIndex(datapointIndex)
    }

    initializeFileContent(fileContent) {
        this.setFileContent(fileContent)

        // if(!this.fileContent) return null;

        // this.parsedFileContent = JSON.parse(this.fileContent)

        // if(!this.splitFileContent) return null;
        // this.setFileContentHeader(this.splitFileContent[0])
        // this.setFileContentBody(this.splitFileContent.slice(1))

        // this.initializeFileContentRecords()
    }

    initializeDatapointIndex() {

    }

    initializeParsedFileContent() {
        if(!this.fileContent) return;

        this.parsedFileContent = JSON.parse(this.fileContent);

        // if(!Array.isArray(this.parsedFileContent)) return;
        // console.log(this.parsedFileContent, Array.isArray(this.parsedFileContent.people));

    }

    initializeFileContentRecords() {
        // if(!this.parsedFileContentBody) return null;
        // this.setFileContentRecords()

        // if(!this.fileContentRecords) return null;
        // this.setFileContentLines()
        
        // if(!this.datapointIndex) return null;
        // this.setFileContentValues()
    }

    getKeys(obj) {
        let keys = [];
      
        for (let key in obj) {
          keys.push(key);
      
          if (typeof obj[key] === "object") {
            keys = keys.concat([this.getKeys(obj[key])]);
          }
        }
        console.log(keys);
        return keys;
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