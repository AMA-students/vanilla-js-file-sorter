export default class {
  constructor(root) {
      this.root = root
  }

  headerHighlighter = (headerIndex) => {

    const headers = this.root.querySelectorAll('th');
    headers.forEach((header, index) => {

      if(index === headerIndex) {
        header.classList.add('highlight')
      } else {
        header.classList.remove('highlight')
      }

    })

  }
  
}