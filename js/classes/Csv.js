import elementLimiter from "../functions/elementLimiter.js";
import STATUS from './Status.js';
export default class {
    constructor(root) {
        this.root = root;
    }

    update(headerColumns = [], datas) {
        this.clear();
        this.setHeader(headerColumns);
        // this.setBody(datas);
        this.splitRendering(datas);
    }

    clear() {
        this.root.innerHTML = '';
    }
    
    setHeader(headerColumns) {
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');

        headerColumns.map(headerText => {
            // console.log(headerText)
            const th = document.createElement('th');
            th.innerText = headerText;
            tr.appendChild(th);
        })

        thead.appendChild(tr);
        this.root.appendChild(thead)

        // this.root.insertAdjacentHTML('afterbegin',`
        //     <thead>
        //         <tr>
        //             ${headerColumns.map(headerText => `<th>${headerText}</th>` ).join('') }
        //         </tr>
        //     </thead>
        // `
        // )
    }

    setBody(datas) {
        const rowsHtml = datas.map( row => {
            return `
                <tr>
                    ${
                        row.map(text => `<td>${text}</td>`).join('')
                    }
                </tr>
            `
        })

        // original render method
        // this.root.insertAdjacentHTML('beforeend', `
        //     <tbody>
        //     ${
        //         rowsHtml.join('')
        //     }
        //     </tbody>
        // `);
    }

    splitRendering(data) {
        // console.log(divide(data, 50))
        const tbody = document.createElement('tbody');
        const renders = elementLimiter(data, 5000);
        let renderedCounter = 1
        let stopped = false;

        renders.map( data => {
            
            const renderTimeout = setTimeout(() => {
                console.log(stopped)            
                if(stopped) return;
                data.forEach(row => {
                    const tr = document.createElement('tr');
                    row.forEach( data => {
                        const td = document.createElement('td');

                        if(data.original) {
                            td.innerText = data.original;
                        }else {
                            td.innerText = data;
                        }

                        // tableDatas.appendChild(td);
                        tr.appendChild(td)

                        // console.log(data)
                    })

                    this.root.appendChild(tr)
                })    

                if(renderedCounter !== renders.length) {
                    document.querySelector('#status').innerText = `Loading: ${renderedCounter++}/${renders.length}`
                } else {
                    document.querySelector('#status').innerText = `Loading: ${renderedCounter++}/${renders.length}`
                    setTimeout(()=> document.querySelector('#status').innerText = `Done`, 500)
                    document.querySelector('#clear').style.display = 'block';
                    document.querySelector('#stop').style.display = 'none';
                }
            }, 1500);

            document.querySelector('#stop').onclick = ()=> {
                const Status = new STATUS(document.querySelector('#status'));
                Status.Options.enable([document.querySelector('#clear')]);
                Status.Options.disable([document.querySelector('#stop')]);
                stopped = true;
                console.log('stopped', stopped)
                clearTimeout(renderTimeout)
            }
        });
    };
    
};

const arr = []
for(let i = 0; i < 100; i++) {
    arr.push(i)
}

console.log(elementLimiter(arr, 45))