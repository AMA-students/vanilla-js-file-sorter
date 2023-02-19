import { CSVParser } from "../classes/CSVParser.js"
import { removeUndefined } from "../classes/utility.js"

import { recordType } from "./fileContentRecord.js"

function setFileContent() {
    return { 
        setFileContent(fileContent) {
            this.fileContent = fileContent 
        }
    }
}

function setDataPointIndex() { 
    return {
        setDataPointIndex(datapointIndex) {
            this.datapointIndex = datapointIndex
        }
    }
}

function setComparisonHistory() {
    return {
        setComparisonHistory(history) {
            this.comparisonHistory = history
        }
    }
}

function splitFileContent(delimiter) {
    return {
        splitFileContent(delimiter) {
            this.delimiter = delimiter
            this.splitFile = this.fileContent.split(this.delimiter)
            this.splitFile = removeUndefined(this.splitFile)
        }
    }
}

function setFileContentValues() {
    return {
        setFileContentValues() {
            this.fileContentRecords.forEach(
                record => {
                    record.setValue(
                        record.parsedFileContentLine[this.datapointIndex]
                    )    
                }
            );
        }    
    }
}

function setFileContentRecords() {
    return {
        setFileContentRecords() {
            this.fileContentRecords = this.parsedFileContentBody.map((parsedFileContentLine, index) => {
                return recordType[this.type](parsedFileContentLine, index);
            })
        }
    }
}

function setFileHeader() {
    return {
        setFileHeader(fileContentHeader) {
            this.fileContentHeader = fileContentHeader
        }
    }
}

function setFileBody() {
    return {
        setFileBody(fileContentBody) {
            this.fileContentBody = fileContentBody
        }
    }  
}

function setParsedFileContent() {
    return {
        setParsedFileContent() {
            // this.parsedFileContent = removeUndefined(parsedFileContent);
            this.parsedFileContent = removeUndefined(
                CSVParser(this.splitFile)
            );
        }
    }
}

function setParsedFileContentHeader() {
    return {
        setParsedFileContentHeader(setParsedFileContentHeader) {
            this.parsedFileContentHeader = setParsedFileContentHeader
        }  
    }
}

function setParsedFileContentBody() {
    return {
        setParsedFileContentBody(parsedFileContentBody) {
            this.parsedFileContentBody = parsedFileContentBody
        }
    }
}

function setFileContentLines() {
    return {
        setFileContentLines() {
            this.fileContentRecords.forEach((record, index) => {
                record.setLine(
                    this.fileContentBody[index]
                )
            });
        }
    }
}

function recordComparison(comparison) {
    return {
        recordComparison(comparison) {
            this.comparisonHistory.push(comparison)
        }
    }
}

function setParsedJSON() {
    return {
        setParsedJSON() {
            this.parsedJSON = JSON.parse(this.fileContent)

            if(Array.isArray(this.parsedJSON)) {
                Object.entries(this.parsedJSON)
            }
            
            else {

                this.JSONKey = Object.keys(this.parsedJSON)

                this.parsedJSON = this.parsedJSON[this.JSONKey]

            }
        }
    }
}

function setParsedJSONHeader() {
    return {
        getJSONHeader() {
            
        }
    }
}


const dataRecorder = (fileContent = null, datapointIndex = null) => {

    const state = {
        fileContent: fileContent,
        datapointIndex: datapointIndex,
        comparisonHistory: []
    };

    return Object.assign(
        state,
        setFileContent(state), 
        setDataPointIndex(state), 
        setComparisonHistory(state), 
        splitFileContent(state), 
        setFileContentValues(state),
        setFileContentRecords(state), 
        setFileHeader(state), 
        setFileBody(state), 
        setParsedFileContent(state), 
        setParsedFileContentHeader(state), 
        setParsedFileContentBody(state), 
        recordComparison(state),
        setFileContentLines(state)
    )
}

const CSVDataRecorder = (fileContent = null, datapointIndex = null) => {

    const state = {
        type: "CSV",
        
        initializeFileContent(fileContent) {
            this.setFileContent(fileContent)
    
            if(!this.fileContent) return null;
    
            this.splitFileContent('\n')
    
            if(!this.splitFileContent) return null;
            this.setFileHeader(this.splitFile[0])
            this.setFileBody(this.splitFile.slice(1))
    
            this.initializeFileContentRecords()
        },
        
        initializeFileContentRecords() {
            if(!this.parsedFileContentBody) return null;
            this.setFileContentRecords()
    
            if(!this.fileContentRecords) return null;
            this.setFileContentLines()
            
            if(!this.datapointIndex) return null;
            this.setFileContentValues()
            console.log(this);
        },

        initializeParsedFileContent(parsedFileContent) {
            this.setParsedFileContent(parsedFileContent)
            this.setParsedFileContentHeader(this.parsedFileContent[0])
            this.setParsedFileContentBody(this.parsedFileContent.slice(1))
    
            this.setComparisonHistory([])
    
            this.initializeFileContentRecords()
        },

        initializeDatapointIndex(datapointIndex) {
            this.datapointIndex = datapointIndex
    
            if(!this.fileContentRecords) return null;
            this.setFileContentValues()
        },

        initializeSortedFileContent() {

            this.sortedFileContent = [
                this.fileContentHeader,
                ...this.fileContentRecords.map(record => record.line)
            ]
            
        },
    
        initializeSortedParsedFileContent() {
            
            this.sortedParsedFileContentBody = this.fileContentRecords.map(record => record.parsedFileContentLine);

            this.sortedParsedFileContent = [
                this.parsedFileContentHeader,
                ...this.sortedParsedFileContentBody
            ]
    
        }
    };

    return Object.assign(
        state,
        dataRecorder(fileContent, datapointIndex)
    )
}

const JSONDataRecorder = (fileContent = null, datapointIndex = null) => {
    console.log('JSON instance')
    const state = {
        type: "JSON",
        
        initializeFileContent(fileContent) {
            this.setFileContent(fileContent)
    
            // if(!this.fileContent) return null;
            // this.setParsedJSON(this.fileContent)

            // this.initializeFileContentRecords()
        },
        
        initializeFileContentRecords() {
            // console.log('test');
            if(!this.parsedFileContentBody) return null;
            this.setFileContentRecords()
    
            if(!this.fileContentRecords) return null;
            // this.setFileContentLines()
            
            if(!this.datapointIndex) return null;
            this.setFileContentValues()
            console.log(this);
        },

        initializeParsedFileContent(parsedFileContent) {
            if(!this.fileContent) return null;
            this.setParsedJSON(this.fileContent)

            this.parsedFileContentBody = [];

            this.parsedFileContentHeader = 
            Object.keys(this.parsedJSON[0]);
            
            this.parsedJSON.map(obj => {
                this.parsedFileContentBody.push(Object.values(obj))
            });

            this.parsedFileContent = [
                this.parsedFileContentHeader,
                ...this.parsedFileContentBody
            ]

            this.initialDataToRender = [
                this.parsedFileContentHeader,
                ...this.parsedFileContentBody
            ]
    
            this.setComparisonHistory([])
    
            // this.initializeFileContentRecords()
        },

        initializeDatapointIndex(datapointIndex) {
            this.datapointIndex = datapointIndex
    
            if(!this.fileContentRecords) return null;
            this.setFileContentValues()
        },

        initializeSortedFileContent() {

            this.sortedFileContent = [
                this.fileContentHeader,
                ...this.fileContentRecords.map(record => record.line)
            ]
            console.log('test1');
        },
    
        initializeSortedParsedFileContent() {
            console.log('test2');
            this.sortedParsedFileContentBody = this.fileContentRecords.map(record => record.parsedFileContentLine);

            this.sortedParsedFileContent = [
                this.parsedFileContentHeader,
                ...this.sortedParsedFileContentBody
            ]

            this.parsedFileContentHeader

            // assign a key for each value of the sortedBody
            this.sortedJSON = []

            this.sortedParsedFileContentBody.map(values => {
                const obj = {}
                values.map((value, index) => {
                    const key = this.parsedFileContentHeader[index];

                    obj[key] = value;
                })
                this.sortedJSON.push(obj)
            })

            if(this.JSONKey) {
                this.sortedJSON = 
                { 
                    [this.JSONKey] : this.parsedJSON
                }
            }

            this.sortedFileContent = JSON.stringify(this.sortedJSON, undefined, " ").split('\n');
            console.log(this.sortedFileContent);
        }
    };

    return Object.assign(
        state,
        setParsedJSON(),
        setFileContent(),
        setFileContentRecords(),
        setFileContentValues(),
        recordComparison(),
        setComparisonHistory()
    )
}

const recorderType = {
    CSV: () => CSVDataRecorder(),
    JSON: () => JSONDataRecorder(),
}

export {
    recorderType,
    dataRecorder,
    CSVDataRecorder
}