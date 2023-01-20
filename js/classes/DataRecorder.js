export default class {
    constructor(data, delimiter, datapointIndex) {
        this.data = data // unmodified data

        this.delimiter = delimiter // data splitter
        this.splitData = this.data.split(this.delimiter) // split data by the delimiter

        this.unmodifiedHeader = this.splitData[0]; // csv header
        this.unmodifiedDataBody = this.splitData.slice(1); // csv data

        this.datapointIndex = datapointIndex // index of the column to be sorted
        
        this.dataRecords = this.unmodifiedDataBody.map((unmodifiedLine, index) => {
            return new DataRecord(unmodifiedLine, index) // create data record for each line of the data body
        })

    }

    setParsedData = (parsedData) => {

        this.parsedData = parsedData;

        this.setParsedBHeader(this.parsedData[0]);
        this.setParsedBody(this.parsedData.slice(1));

    }   

    setunmodifiedHeader = (unmodifiedHeader) => {
        this.unmodifiedHeader = unmodifiedHeader
    }

    setParsedBHeader = (setParsedHeader) => {
        this.parsedHeader = setParsedHeader
    }

    setParsedBody = (parsedBody) => {
        this.parsedBody = parsedBody

        // set the values for the dataRecords that can be gathered from the parsed data
        this.dataRecords.forEach((record, index) => {

            record.setParsedDataLine(
                this.parsedBody[index]
            )

            if(this.parsedBody[index] == null) {

                record.setValue(
                    undefined
                )

                return null;    
            };

            record.setValue(
                this.parsedBody[index][this.datapointIndex]
            )

        });
    }
}

class DataRecord {

    constructor(unmodifiedLine, index) {

        this.unmodifiedLine = unmodifiedLine; // the line of data before it was seperated by the delimiter

        this.parsedDataLine = undefined;  // can be taken from the array

        this.value = undefined; // the value of the column to be sorted for that particular row

        this.moveHistory = [index] // history of where the element was moved starting from its initial position

    }

    moveHistoryRecorder(indexMoved) {
        this.moveHistory.push(indexMoved)
    }

    setParsedDataLine = (parsedDataLine) => {
        this.parsedDataLine = parsedDataLine
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
    unmodified data, 
    parsed data, 
    and the collection of the data records


    DataRecoreds will handle the line of the data. 
    This will include the:
    unmodified line of the data,
    the parsed line of the data, 
    the moveHistory of that data, 
    the value to be sorted on the data,
*/