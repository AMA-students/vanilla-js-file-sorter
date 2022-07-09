// import { parse } from "papaparse";

const fileParse = async (text) => {
    const result = await fetch(text)
    const file = await result.text()
    return Papa.parse(file)
}

export default fileParse;