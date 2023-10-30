
function swap<T>(array: T[], idx: number, idx2: number) {
	const temp = array[idx];
	array[idx] = array[idx2]
	array[idx2] = temp;
}

function qs(array: number[], low: number, high: number): void {
	if (low >= high) {
		return;
	}

	const pivotIdx = partition(array, low, high);

	qs(array, low, pivotIdx - 1);
	qs(array, pivotIdx + 1, high);
}

function partition(array: number[], low: number, high: number) {
	const pivot = array[high];

	let idx = low - 1;

	for (let i = low; i < high; i += 1) {
		if (array[i] <= pivot) {
			idx +=1;
			swap(array, idx, i);
		}
	}

	idx += 1;
	array[high] = array[idx]
	array[idx] = pivot;

	return idx;
}

export default function quick_sort(arr: number[]): void {
	qs(arr, 0, arr.length - 1)
}
