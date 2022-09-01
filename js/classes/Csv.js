import elementLimiter from "../functions/elementLimiter.js";
import STATUS from './Status.js';

const Status = new STATUS(document.querySelector('#status'));

const form = document.querySelector("#getfile");
const selectGroup = document.querySelector('#sort-select-group')
const select = document.querySelector('#select');

//buttons
const inputFile = document.querySelector("#file");
const submitBtn = document.querySelector("#submit");
const displayBtn = document.querySelector('#display')
const clearBtn = document.querySelector('#clear')
const stopBtn = document.querySelector('#stop')
export default class {
    constructor(root) {
        this.root = root;
    }

    onSummarize(headerColumns = [], datas) {
        const obj = this.summarize(datas)
        this.update(headerColumns, obj)
    }

    onDisplay(headerColumns = [], datas) {
        this.update(headerColumns, datas)    
    }

    onUpdate(headerColumns = [], datas) {
        this.update(headerColumns, datas)    
    }

    update(headerColumns = [], datas) {
        this.clear();
        this.setHeader(headerColumns);
        if(!Array.isArray(datas)) {
            let {summarized, counter } = datas;
            summarized = summarized.slice(0, summarized.length/2).concat('yeet', summarized.slice(summarized.length/2));

            this.splitRendering(summarized, counter);
            return
        }
        this.splitRendering(datas);
    }

    summarize(datas) {
        let counter = 0;
        let summarized = datas.filter(elem => {
            let actualLength = datas.length - 1
            const LIMIT = 10
            
            let isEdgeElement = datas.indexOf(elem) < LIMIT || datas.indexOf(elem) > ( actualLength - LIMIT);

            if(isEdgeElement) {
                return isEdgeElement
            }

            counter += 1;
        });

        console.log(summarized)
        return {summarized, counter}
    }

    clear() {
        this.root.innerHTML = '';
    }
    
    setHeader(headerColumns) {
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');

        headerColumns.map(headerText => {
            const th = document.createElement('th');
            th.innerText = headerText;
            tr.appendChild(th);
        })

        thead.appendChild(tr);
        this.root.appendChild(thead)
    }

    // setBody(datas) {
    //     const rowsHtml = datas.map( row => {
    //         return `
    //             <tr>
    //                 ${
    //                     row.map(text => `<td>${text}</td>`).join('')
    //                 }
    //             </tr>
    //         `
    //     })
    // }
    
    async splitRendering(data, counter = null) {
        const MAX_ELEMENT_LIMIT = 5000;
        const tbody = document.createElement('tbody');
        const renders = elementLimiter(data, MAX_ELEMENT_LIMIT);
        let renderedCounter = 1
        let stopped = false;

        renders.map( data => {
            
            const renderTimeout = setTimeout(async () => {
                console.log(stopped)            
                if(stopped) return;
                data.forEach(row => {
                    const tr = document.createElement('tr');
                    // console.log(row)
                    if(!Array.isArray(row)) {
                        console.log(counter)
                        row = [counter]
                    }
                    row.forEach( data => {
                        const td = document.createElement('td');

                        if(data.original) {
                            td.innerText = data.original;
                        }else {
                            td.innerText = data;
                        }
                        tr.appendChild(td)

                    })

                    this.root.appendChild(tr)
                })    

                if(renderedCounter !== renders.length) {
                    // if(!document.querySelector('#progress').getAttribute('max')) {
                    //     document.querySelector('#progress').max = renders.length;
                    // }
                    // document.querySelector('#progress').value = renderedCounter;
                    document.querySelector('#status').innerText = `Loading: ${renderedCounter++}/${renders.length}`
                } else {
                    // when loading is done
                    // if(!document.querySelector('#progress').getAttribute('max')) {
                    //     document.querySelector('#progress').max = renders.length;
                    // }
                    // document.querySelector('#progress').value = renderedCounter;
                    document.querySelector('#status').innerText = `Loading: ${renderedCounter++}/${renders.length}`
                    setTimeout(()=> document.querySelector('#status').innerText = `Done`, 500)
                    Status.Options.enable([clearBtn, inputFile, submitBtn]);
                    Status.Options.disable([stopBtn]);
                }
            }, 1500);

            document.querySelector('#stop').onclick = ()=> {
                Status.Options.enable([clearBtn]);
                Status.Options.disable([stopBtn]);
                stopped = true;
                console.log('stopped', stopped)
                clearTimeout(renderTimeout)
            }
        });
    };
    
};

// const arr = []
// for(let i = 0; i < 100; i++) {
//     arr.push(i)
// }

// console.log(elementLimiter(arr, 45))