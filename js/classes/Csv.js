import elementLimiter from "../functions/elementLimiter.js";
import { removeUndefined } from "./utility.js";
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
        datas = removeUndefined(datas);
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
        // console.log(this)

        // clear the table before displaying the new table
        this.clear();

        this.setHeader(headerColumns);

        //for summarize
        if(!Array.isArray(datas)) {
            let {summarized, counter } = datas;

            /* 
                summurized is equal to the first half of itself + the concat + its other half
            */

            summarized = summarized.slice(0, summarized.length/2).concat("", summarized.slice(summarized.length/2));
            // console.log(summarized)
            this.splitRendering(summarized, counter);
            return
        }
        this.splitRendering(datas);
    }

    summarize(datas) {


        let counter = 0;

        let summarized = datas.filter(elem => {

            // the actual length of the datas, not by its index
            let actualLength = datas.length - 1;

            /* 
                the maximum rows to be rendered in each end of the dataset
                ex. 
                if the dataset is = [1,2,3,4,5,6,7,8,9,10] and the limit is = 2, 
                it will only take the first 2 elements from the endpoints(the first two elements and the last two elements) of 
                the dataset, which is = [1,2,9,10]
            */
            const LIMIT = 10
            
            /*
                get the element that belongs to the edge and is within the limit
                element is an edge element if the index of the element is < LIMIT or 
                if the index of the element is > (actualLength - LIMIT)
            */

            let isEdgeElement = datas.indexOf(elem) < LIMIT || datas.indexOf(elem) > ( actualLength - LIMIT);

            // return the element if it is an edge element
            if(isEdgeElement) return true;

            counter += 1;
        });

        // console.log(summarized)
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

                let rowsLength = null;

                data.forEach(row => {

                    if(!rowsLength) {
                        rowsLength = row.length;
                    }

                    const tr = document.createElement('tr');
                    
                    // if the row is not an array, it
                    if(!Array.isArray(row)) {
                        console.log(counter)
                        if(rowsLength) {

                            let padding = [];

                            for(let i = 0; i < rowsLength; i++) {
                                padding[i] = "";
                            }

                            // adding padding to the table
                            row = padding.slice(0, padding.length/2).concat([`... ${counter}x ...`], 
                            padding.slice( (padding.length/2) + 1 ));
                            tr.style.fontSize = "25px"
                        }
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