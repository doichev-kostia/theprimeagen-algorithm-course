export default function bs_list(haystack: number[], needle: number): boolean {
	let low = 0;
	let high = haystack.length;

	do {
		const diff = (high - low) / 2
		const middle = Math.floor(low + diff);

		const value = haystack[middle];

		if (value === needle) {
			return true;
		} else if (value < needle) {
			low = middle + 1;
		} else {
			high = middle;
		}

	} while( low < high );

	return false;
}
