const setDataPoints = (results, selectElement) => {
    const csvHeaders = results.data[0].map(element => `<option>${element}</option>`);
    selectElement.innerHTML = csvHeaders.join('');
}

export default setDataPoints;