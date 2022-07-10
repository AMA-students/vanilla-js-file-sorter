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
            elements.map(element => element.style.display = 'none')
        },
        show: function(elements) {
            elements.map(element => element.style.display = 'initial')
        }
    }
}