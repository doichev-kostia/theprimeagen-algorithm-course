export default function bubble_sort(arr: number[]): void {
	// [1, 7, 3, 4]
	for (let i = 0; i < arr.length; i += 1) {
		for (let j = 0; j < arr.length - 1 - i; j++) {
			const left = arr[j];
			const right = arr[j + 1]
			if (left > right) {
				const tmp = left;
				arr[j] = arr[j + 1];
				arr[j + 1] = tmp;
			}
		}
	}
}
