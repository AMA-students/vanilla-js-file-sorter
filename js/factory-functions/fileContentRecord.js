// factory functions
// const moveRecorder = () => ({ recordMove: indexMoved => this.moveHistory.push(indexMoved)});

// const valueSetter = () => ({ setValue: value => this.value = value });
function moveRecorder() {
    return {
        recordMove (indexMoved) {
            this.moveHistory.push(indexMoved)
        }
    }
}

function valueSetter () {
    return {
        setValue(value) {
            this.value = value;
        }
    }
}

const parsedLineSetter = () => ({
     setParsedLine: parsedLine => this.parsedLine = parsedLine
});

function lineSetter() {
     return {
        setLine(line) {
            this.line = line
        }
     } 
};

// states

const CSVFileRecord = (parsedFileContentLine, index) => {

    const state = {
        parsedFileContentLine: parsedFileContentLine,

        value: null,

        moveHistory: [index]
    }

    return Object.assign(
        state,
        moveRecorder(state),
        valueSetter(state),
        parsedLineSetter(state),
        lineSetter(state)
    )
}

const JSONFileRecord = (parsedFileContentLine, index) => {

    const state = {
        parsedFileContentLine: parsedFileContentLine,

        value: null,

        moveHistory: [index]
    }

    return Object.assign(
        state,
        moveRecorder(state),
        valueSetter(state),
    )
}