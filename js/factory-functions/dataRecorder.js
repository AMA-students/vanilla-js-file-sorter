import { removeUndefined } from "../classes/utility.js"

import { CSVFileRecord, JSONFileRecord } from "./fileContentRecord.js"

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
            this.fileContentRecords.forEach((record, index) => {
                record.setValue(
                    this.parsedFileContentBody[index][this.datapointIndex]
                )    
            });
        }    
    }
}

function setFileContentRecords() {
    return {
        setFileContentRecords() {

            const recordType = {
                CSV: (...args) => CSVFileRecord(...args),
                JSON: (...args) => JSONFileRecord(...args),
            }

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
        setParsedFileContent(parsedFileContent) {
            this.parsedFileContent = removeUndefined(parsedFileContent);
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
                ...this.fileContentRecords.map(record => record.fileContentLine)
            ]
    
        },
    
        initializeSortedParsedFileContent() {
    
            this.sortedParsedFileContent = [
                this.parsedFileContentHeader,
                ...this.fileContentRecords.map(record => record.parsedFileContentLine)
            ]
    
        }
    };

    return Object.assign(
        state,
        dataRecorder(fileContent, datapointIndex)
    )
}

export {
    dataRecorder,
    CSVDataRecorder
}