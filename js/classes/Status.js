export default class {
    constructor(root) {
        this.root = root;
    }

    onChooseFile(Options) {
        this.root.innerText = 'Choose your file';
        if(!Options) return;
        Options.hideBtn.map( button => button.style.display = 'none');
    }

    onLoading(Options) {
        this.root.innerText = 'Loading...';
        if(!Options) return;
        Options.hideBtn.map( button => button.style.display = 'none');
    }

    onDone(Options) {
        this.root.innerText = 'Done';
        if(!Options) return;
        Options.hideBtn.map( button => button.style.display = 'none');
        Options.showBtn.map(button => button.style.display = 'initial');
    }

    onSetFile(fileName, Options) {
        this.root.innerText = fileName;
        if(!Options) return;
        
        Options.hideBtn.map( button => button.style.display = 'none');
        Options.showBtn.map(button => button.style.display = 'initial');
    }
}