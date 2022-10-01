const mergeSort = (arr = [], l, m, r) => {
	let l, r, m;

	if(l > r) {
		m =  l + (r - l)/2;
	}

	mergeSort(arr, l, m);

	mergeSort(arr, m + 1, r)
	
}

export default mergeSort;
