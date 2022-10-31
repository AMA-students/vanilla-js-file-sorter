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
                this.cover(element);
            })
        },
        show: function(elements) {
            elements.map(element => {
                element.style.transition = "all 2s";
                element.style.opacity = '1';
                this.uncover(element)
            })
        },

        disable: function(elements) {
            elements.map(element => {
                element.disabled = true;
                element.classList.add('disabled')
            })
            
        },
        enable: function(elements) {
            elements.map(element => {
                element.disabled = false;
                element.classList.remove('disabled')
            })
        },

        cover: function(element) {
            const coverExist  = element.querySelector('.cover');

            if(coverExist) return;
            const cover = document.createElement('div');
            cover.classList.add('cover')
            // console.log(element)
            element.style.position = 'relative';
            cover.style.position = 'absolute';
            cover.style.top = '0'
            cover.style.height = '100%'
            cover.style.width = '100%'
            element.appendChild(cover);
        },
        uncover: function(element) {
            const cover = element.querySelector('.cover');
            if(cover) element.removeChild(cover);
        }
    }
}