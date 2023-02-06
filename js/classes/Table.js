import elementLimiter from "../functions/elementLimiter.js";
import { removeUndefined } from "./utility.js";
import STATUS from './Status.js';
 
/*============================={ buttons }=============================*/
import { stopBtn } from '../buttons.js'

/*============================={ class instances }=============================*/
const Status = new STATUS(document.querySelector('#status'));

export default class {
    constructor(root) {
        this.root = root;
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

    setBody(datas) {
        const tbody = document.createElement('tbody');

        datas.map( row => {
            const tr = document.createElement('tr');
            row.forEach( data => {
                const td = document.createElement('td');

                td.innerText = data;

                tr.appendChild(td)
            })
            
            tbody.appendChild(tr)
        })
        this.root.appendChild(tbody)

    }

    onSummarize(headerColumns = [], datas) {
        datas = removeUndefined(datas);

        const summarized = this.summarize(datas)

        this.update(headerColumns, datas, summarized)
    }

    onDisplay(headerColumns = [], datas) {
        this.update(headerColumns, datas)    
    }

    onUpdate(headerColumns = [], datas) {
        this.update(headerColumns, datas)    
    }

    update(headerColumns = [], datas, summarized) {

        // clear the table before displaying the new table
        this.clear();

        this.setHeader(headerColumns);

        let config = {
            data: datas, 
        }

        if(summarized) {

            const { leftEdge, rightEdge, lengthOfSummarizedRows } = summarized;

            config = {
                ...config,
                summary: [...leftEdge,"", ...rightEdge ],
                lengthOfSummarizedRows: lengthOfSummarizedRows
            }
        }

        this.splitRendering(config);

    }

    summarize(dataset) {

        const LIMIT = 10

        const leftEdge = [...dataset].splice(0, LIMIT);

        const rightEdge = [...dataset].splice(dataset.length - LIMIT);

        const lengthOfSummarizedRows = [...dataset].splice(LIMIT, dataset.length - ( LIMIT * 2 ) ).length;

        const summarized = {
            leftEdge: [...leftEdge],
            rightEdge: [...rightEdge],
            summary: [...leftEdge, ...rightEdge],
            lengthOfSummarizedRows: lengthOfSummarizedRows
        }

        return summarized;
    }

    async splitRendering(config) {
        const { data, summary, lengthOfSummarizedRows } = config

        const dataLength = data.length;
        const columnLength = data[0].length;
        
        const MAX_ELEMENT_LIMIT = (dataLength/ columnLength) * 0.2;

        const renderDelay = (dataLength/ columnLength) * 0.015;

        const renders = elementLimiter(data, MAX_ELEMENT_LIMIT);

        const renderSummurized = (summary) => {
            const summarizerIndex = summary.indexOf("")

            console.log(data, summary, lengthOfSummarizedRows);

            const rowLength = summary[0].length;

            const tbody = document.createElement('tbody');

            summary.forEach((row, index) => {

                const tr = document.createElement('tr');

                if(index === summarizerIndex) {
                    row = addPadding(row, tr, rowLength)
                }

                renderRow(row, tr)
                    
                tbody.appendChild(tr)
                
            })

            this.root.appendChild(tbody)

        }

        const render = (render, tbody) => {


            render.forEach((row, index) => {

                const tr = document.createElement('tr');

                renderRow(row, tr)
                    
                tbody.appendChild(tr)
                
            })


        }

        const delayedRendering = (renders) => {
            const tbody = document.createElement('tbody');

            let x = 0;

            const renderInterval = setInterval(async ()=> {
                const dataTorender = renders[x]            

                render(dataTorender, tbody)

                x++;

                if(x > renders.length - 1) {
                    clearInterval(renderInterval)
                }

                await new Promise(resolve => setTimeout(resolve, 1000));
            }, renderDelay)

            this.root.appendChild(tbody)
        }


        if(summary) {
            renderSummurized(summary)
            return;
        } else {
            delayedRendering(renders)
        }

        function renderRow(row, tr) {
            row.forEach( data => {
                const td = document.createElement('td');

                td.innerText = data;

                tr.appendChild(td)
            })

            return tr;
        }

        function addPadding(row, tr, rowLength) {
            let padding = [];

            for(let i = 0; i < rowLength; i++) {
                padding[i] = "";
            }

            const paddingLength = padding.length;

            const leftPadding = padding.splice(0, paddingLength/2)
            const rightPadding = padding.splice(paddingLength/2, paddingLength - 1)

            row = [...leftPadding, `... ${lengthOfSummarizedRows}x ...`, ...rightPadding]
            tr.style.fontSize = "25px"

            return row;
        }
    };

}