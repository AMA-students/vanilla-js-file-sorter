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
        if(!this.statusTextDisplayer) return;
        this.statusTextDisplayer.innerText = statusText;
    }

    Options = {
        hide: function(elements) {

            elements.forEach(element => {
                
                if(element.classList.contains('hide')) return;

                element.classList.add('hide');

                if(element.classList.contains('show')) {
                    element.classList.remove('show');
                }

                this.cover(element);

            })
        },
        show: function(elements) {

            elements.forEach(element => {

                if(element.classList.contains('show')) return;

                element.classList.add('show');

                if(element.classList.contains('hide')) {
                    element.classList.remove('hide');
                }

                this.uncover(element)

            })
        },

        disable: function(elements) {
            elements.forEach(element => {
                element.disabled = true;
                element.classList.add('disabled')
            })
            
        },
        enable: function(elements) {
            elements.forEach(element => {
                element.disabled = false;
                element.classList.remove('disabled')
            })
        },

        cover: function(element) {
            const coverExist  = element.querySelector('.cover');

            if(coverExist) return;
            const cover = document.createElement('div');
            cover.classList.add('cover')
            element.style.position = 'relative';
            element.appendChild(cover);
        },
        uncover: function(element) {
            const cover = element.querySelector('.cover');
            if(cover) element.removeChild(cover);
        },

        restrictSettings: function(elements) {
            elements.forEach(element => {
                this.disable([element]);
                this.disable([element.nextElementSibling]);

                this.cover(element.parentElement)
            })
        }, 
        unrestrictSettings: function(elements) {
            elements.forEach(element => {
                this.enable([element]);
                this.enable([element.nextElementSibling]);

                this.uncover(element.parentElement)
            })
        }
    }
    delegateEvent(elements, eventObj) {
        const {event, func} = eventObj;
        
        elements.forEach(element => {
            element.addEventListener(event, func)
        });
    }
    delegateOnclickEvent(config) {
        const {elements, func} = config;
        
        elements.forEach(element => {
            element.onclick = () => {
                func()
            }
        });
    }
    removeElementOnclickEvent(elements) {
        elements.forEach(element => {
            element.onclick = undefined;
        });
    }
    delegateClassMutationObserver(config) {
        const {
            elements,        // array of elemets to be observed
            classToObserve,  // a string representing the class to be observed
            withClass,       // function to be triggered when classToObserve is present
            withoutClass     // function to be triggered when classToObserve is not present
        } = config

        const elementClassObserver = new MutationObserver((mutations) => {
            mutations.forEach(mu => {
              if (mu.type !== "attributes" && mu.attributeName !== "class") return;
          
              if (mu.target.classList.contains(classToObserve)) {
                withClass()
                return;
              };
          
              withoutClass()
            });
        });

        elements.forEach(element => {
            elementClassObserver.observe(element, {attributes: true})
        })

        return elementClassObserver;
    }
    dynamicElementObserver = (selector, cb) => {
        const observer = new MutationObserver(() => {
            const dynamicElements = document.querySelectorAll(selector);
            cb(dynamicElements, observer);
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

    }
}