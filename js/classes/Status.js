export default class {
    constructor(statusTextDisplayer) {
        this.statusTextDisplayer = statusTextDisplayer;
    }

    setStatus(config) {

        Object.entries(config).forEach( ([key, value]) => {

            if(this[key]){
                this[key](value)
                return;
            }

            if(!this.Options[key]) {
                console.warn("%cThe key: " + `%c${key}` + " %cis not recognized. Check if it's a valid property", "color: warn", "color: yellow", "color: warn");
                return;
            }

            this.Options[key](value)
        })

    }

    setStatusText(statusText) {
        this.statusTextDisplayer.innerText = statusText;
    }

    onChooseFile(callBack) {
        this.root.innerText = 'Choose your file';

        if(!callBack) return 
        callBack();
    }

    onLoading(callBack) {
        this.root.innerText = 'Loading...';
        if(!callBack) return 
        callBack();
    }

    onDone(callBack) {
        this.root.innerText = 'Done';
        if(!callBack) return 
        callBack();
    }

    onSetFile(fileName) {
        this.root.innerText = fileName;
    }

    Options = {
        hide: function(elements) {

            elements.map(element => {
                
                if(element.classList.contains('hide')) return;

                element.classList.add('hide');

                if(element.classList.contains('show')) {
                    element.classList.remove('show');
                }

                this.cover(element);

            })
        },
        show: function(elements) {

            elements.map(element => {

                if(element.classList.contains('show')) return;

                element.classList.add('show');

                if(element.classList.contains('hide')) {
                    element.classList.remove('hide');
                }

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