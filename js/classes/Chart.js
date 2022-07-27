import elementLimiter from "../functions/elementLimiter.js";
import STATUS from './Status.js';

const Status = new STATUS(document.querySelector('#status'));

const form = document.querySelector("#getfile");
const selectGroup = document.querySelector('#sort-select-group')
const select = document.querySelector('#select');


// contastants
const ELEMENT_LIMIT = 5000;

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

    update(datas) {
        this.clear();
        this.splitRendering(datas);
    }

    clear() {
        this.root.innerHTML = '';
    }

    
    splitRendering(array) {
        const isRow = true; 
        const bars = document.createElement('div')
        bars.classList.add('bars')
        bars.style.display = 'inline-flex'
        bars.style.flexDirection = isRow ? 'row' : 'column'
        bars.style.width = '100vw'
        this.root.appendChild(bars)

        // Divides the data so that each render is within or less than the ELEMENT_LIMIT
        const renders = elementLimiter(array, ELEMENT_LIMIT);

        let renderedCounter = 1
        let stopped = false;

        // rendering
        renders.map( render => {
            
            const renderTimeout = setTimeout(() => {
                console.log(stopped)            
                if(stopped) return;


                render.forEach(data => {
                    let height, width, margin;
                    if(isRow) {
                        height = `${data}px`
                        width = `10px`
                        margin = 'marginLeft'
                    }

                    if(!isRow) {
                        height = `10px`
                        width = `${data}px`
                        margin = 'marginTop'
                    }

                    const bar = document.createElement('div');
                    bar.dataset.value = data;

                    if(!isNaN(data)){
                        // console.log({height, width, margin,isRow})
                        bar.style.height = height
                        bar.style.width = width
                        bar.style.backgroundColor = `gray`
                        bar.style[margin] = `5px`
                        bar.classList.add('bar')
                    }
                    bars.appendChild(bar)
                })    

                if(renderedCounter !== renders.length) {
                    document.querySelector('#status').innerText = `Loading: ${renderedCounter++}/${renders.length}`
                } else {
                    // when loading is done
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