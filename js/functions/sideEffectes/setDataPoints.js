/*
    Takes the first line of the given CSV file as header names.
    For each header name, it will add an <option/> element to the selectElement.
*/

const setDataPoints = (results, selectElement) => {
    const csvHeaders = results.data[0].map(element => `<option>${element}</option>`);
    selectElement.innerHTML = csvHeaders.join('');
}

export default setDataPoints;