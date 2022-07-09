import divideArr from "../functions/divideArr.js";
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
        const renders = divideArr(data, 5000);

        let renderedCounter = 1
        renders.map( data => {
            // console.log(data)
            
            setTimeout(() => {
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
                }
            }, 1500);
            
        });
    };
    
};

const arr = []
for(let i = 0; i < 100; i++) {
    arr.push(i)
}

console.log(divideArr(arr, 45))