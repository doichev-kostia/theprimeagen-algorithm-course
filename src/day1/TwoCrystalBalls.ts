export default function two_crystal_balls(breaks: boolean[]): number {
	let breakpoint = Math.floor(Math.sqrt(breaks.length));

	for (let i = 0; i < breaks.length; i += breakpoint) {
		if (i + breakpoint > breaks.length) {
			const diff = breaks.length - i;
			breakpoint = diff; // so I do not have an overflow
		}

		const result = breaks[i];
		if (!result) {
			continue;
		}

		let prev = 0;
		if (i - breakpoint >= 0) { // to prevent an overflow
			prev = i - breakpoint;
		}

		for (let j = prev; j < i; j+= 1) {
			if (breaks[j]) {
				return j;
			}
		}
	}

	return -1;
}
