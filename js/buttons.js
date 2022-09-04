//buttons
const inputFile = document.querySelector("#file");
const submitBtn = document.querySelector("#submit");
const displayBtn = document.querySelector('#display')
const clearBtn = document.querySelector('#clear')
const stopBtn = document.querySelector('#stop')
const downloadBtn = document.querySelector('#download')

const allBtns = [clearBtn, displayBtn, stopBtn, inputFile, submitBtn];

export {
    clearBtn,
    displayBtn,
    stopBtn,
    inputFile,
    submitBtn,
    downloadBtn,
    allBtns
}
