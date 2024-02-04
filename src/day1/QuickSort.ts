function swap<T>(array: T[], idx: number, idx2: number) {
	const temp = array[idx];
	array[idx] = array[idx2];
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
	const half = Math.floor((high - low) / 2);
	const mid = low + half;
	let pivotIdx = mid
	const pivot = array[pivotIdx];

	let idx = low - 1;

	for (let i = low; i <= high; i += 1) {
		if (i === pivotIdx) {
			continue;
		}
		if (array[i] > pivot) {
			continue;
		}

		idx += 1;
		if (idx === pivotIdx) {
			swap(array, pivotIdx, pivotIdx + 1)
			pivotIdx += 1
		}
		swap(array, idx, i);
	}

	idx += 1;
	if (pivotIdx !== idx) {
		array[pivotIdx] = array[idx];
		array[idx] = pivot;
	}

	return idx;
}

export default function quick_sort(arr: number[]): void {
	qs(arr, 0, arr.length - 1);
}
