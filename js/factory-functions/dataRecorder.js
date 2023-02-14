const fileContentSetter = state => ({ 

    setFileContent(fileContent) {
        state.fileContent = fileContent 
    }

});

const dataPointIndexSetter = state => ({ 

    setDataPointIndex(datapointIndex) {
        state.datapointIndex = datapointIndex
    } 

});

const comparisonHistorySetter = state => ({ 

    setComparisonHistory(history) {
        state.comparisonHistory = history
    }

});

const fileContentSplitter = state => ({

    splitFileContent(delimiter) {
        state.delimiter = delimiter
        state.splitFileContent = state.fileContent.split(state.delimiter)
        state.splitFileContent = removeUndefined(state.splitFileContent)
    }

})

const fileValuesSetter = state => ({
    setFileContentValues() {
        state.fileContentRecords.forEach((record, index) => {
            record.setValue(
                state.parsedFileContentBody[index][state.datapointIndex]
            )    
        });
    }    
})

const fileRecordsSetter = state => ({
    setFileContentRecords() {
        state.fileContentRecords = state.parsedFileContentBody.map((parsedFileContentLine, index) => {
            return new FileContentRecord(parsedFileContentLine, index) // create data record for each line of the data body
        })
    }
})

const fileHeaderSetter = state => ({
    setFileContentHeader(fileContentHeader) {
        state.fileContentHeader = fileContentHeader
    }
})

const setFileContentBody = state => ({
    setFileContentBody(fileContentBody) {
        state.fileContentBody = fileContentBody
    }  
})

const parsedFileSetter = state => ({
    setParsedFileContent(parsedFileContent) {
        state.parsedFileContent = removeUndefined(parsedFileContent);
    }   
})

const parsedFileHeaderSetter = state => ({
    setParsedFileContentHeader(setParsedFileContentHeader) {
        state.parsedFileContentHeader = setParsedFileContentHeader
    }  
})

const parsedFileBodySetter = state => ({
    setParsedFileContentBody(parsedFileContentBody) {
        state.parsedFileContentBody = parsedFileContentBody
    }    
})

const comparisonRecorder = state => ({
    recordComparison(comparison) {
        state.comparisonHistory.push(comparison)
    }
})

const dataRecorder = (fileContent, datapointIndex) => {

    let state = {};

    state = Object.assign(
        state,
        fileContentSetter(state), 
        dataPointIndexSetter(state), 
        comparisonHistorySetter(state), 
        fileContentSplitter(state), 
        fileValuesSetter(state),
        fileRecordsSetter(state), 
        fileHeaderSetter(state), 
        setFileContentBody(state), 
        parsedFileSetter(state), 
        parsedFileHeaderSetter(state), 
        parsedFileBodySetter(state), 
        comparisonRecorder(state) 
    )

    state.setFileContent(fileContent) // fileContent data

    state.setDataPointIndex(datapointIndex) // index of the column to be sorted

    return state;
}