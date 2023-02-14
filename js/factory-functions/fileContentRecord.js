// factory functions
const moveRecorder = state => ({ recordMove: indexMoved => state.moveHistory.push(indexMoved)});

const valueSetter = state => ({ setValue: value => state.value = value });

const parsedLineSetter = state => ({
     setParsedLine: parsedLine => state.parsedLine = parsedLine
});

const lineSetter = state => ({ setLine: line => state.line = line });

// states

const CSVFileRecord = (parsedFileContentLine, index) => {

    const state = {
        fileContentLine: null,

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
        fileContentLine: null,

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