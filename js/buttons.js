//buttons
const inputFile = document.querySelector("#file");
const submitBtn = document.querySelector("#submit");
const displayBtn = document.querySelector('#display')
const clearBtn = document.querySelector('#clear')
const stopBtn = document.querySelector('#stop')
const updateBtn = document.querySelector('#update')
const downloadBtn = document.querySelector('#download')
const settingsBtn = document.querySelector('#settings')

const allBtns = [clearBtn, displayBtn, stopBtn, inputFile, submitBtn];

export {
    clearBtn,
    displayBtn,
    stopBtn,
    inputFile,
    submitBtn,
    updateBtn,
    downloadBtn,
    settingsBtn,
    allBtns
}
