export default class {
    constructor(root) {
        this.root = root;
    }

    onChooseFile() {
        this.root.innerText = 'Choose your file';
    }

    onLoading() {
        this.root.innerText = 'Loading...';
    }

    onDone() {
        this.root.innerText = 'Done';
    }

    onSetFile(fileName) {
        this.root.innerText = fileName;
    }

    Options = {
        hide: function(elements) {
            elements.map(element => {
                element.style.transition = "all 2s";
                element.style.opacity = '0';
            })
        },
        show: function(elements) {
            elements.map(element => {
                element.style.transition = "all 2s";
                element.style.opacity = '1';
            })
        },

        disable: function(elements) {
            elements.map(element => {
                element.disabled = true;
            })
            
        },
        enable: function(elements) {
            elements.map(element => {
                element.disabled = false;
            })
        }
    }
}