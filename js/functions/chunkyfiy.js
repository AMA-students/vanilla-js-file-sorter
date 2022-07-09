function chunkify(a, n, balanced) {
    console.table({
        a: a,
        n: n,
        balanced: balanced
    })
    console.log(1)
    if (n < 2)
        return [a];

    var len = a.length,
            out = [],
            i = 0,
            size;
    console.log(2)
    if (len % n === 0) {
        console.log(3)
        size = Math.floor(len / n);
        while (i < len) {
            out.push(a.slice(i, i += size));
        }
    }
    
    else if (balanced) {
        console.log(4)
        while (i < len) {
            size = Math.ceil((len - i) / n--);
            out.push(a.slice(i, i += size));
        }
    }

    else {
        console.log(5)
        n--;
        size = Math.floor(len / n);
        if (len % size === 0)
            size--;
        while (i < size * n) {
            out.push(a.slice(i, i += size));
        }
        out.push(a.slice(size * n));

    }
    console.log(6)
    return out;
}
export default chunkify;