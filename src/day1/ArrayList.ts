export default class ArrayList<T> {
	public length: number;
	private cursor: number;
	private array: Array<T | undefined>;
	private multiplier: number = 2; // change the name
	#capacity: number;


	constructor(length: number) {
		this.cursor = 0;
		this.length = length;
		this.#capacity = this.length * this.multiplier;
		this.array = new Array(this.#capacity);
	}

	get capacity() {
		return this.#capacity;
	}

	prepend(item: T): void {
		if (this.length === this.#capacity) {
			this.grow(); // Yeah, I can apply some optimizations here to reduce the number of loops
		}

		for (let i = this.cursor; i > 0; i -= 1) {
			const prev = i - 1;
			this.array[i] = this.array[prev];
		}

		this.array[0] = item;
		this.cursor += 1;
		if (this.cursor === this.length + 1) {
			this.length += 1;
		}
	}

	append(item: T): void {
		if (this.length === this.#capacity) {
			this.grow();
		}

		this.array[this.cursor] = item;
		this.cursor += 1;
		if (this.cursor === this.length + 1) {
			this.length += 1;
		}
	}

	insertAt(item: T, idx: number): void {
		if (idx < 0 || idx > this.length) {
			return undefined;
		}

		if (this.length === this.#capacity) {
			this.grow();
		}

		if (idx > this.cursor + 1) {
			this.array[idx] = item;
			this.cursor += 1;
			if (this.cursor === this.length) {
				this.length += 1;
			}
			return;
		}

		if (idx === this.cursor + 1) {
			return this.append(item);
		} else if (idx === 0) {
			return this.prepend(item);
		} else {
			for (let i = this.cursor; i > idx; i -= 1) {
				// shift 1 position
				const next = this.cursor + 1;
				this.array[next] = this.array[i];
			}

			this.array[idx] = item;
			this.length += 1;
		}

	}

	remove(item: T): T | undefined {
		let idx: number | undefined;
		for (let i = 0; i < this.cursor; i += 1) {
			if (this.array[i] === item) {
				idx = i;
				break;
			}
		}

		if (idx == undefined) {
			return undefined;
		}

		return this.removeAt(idx);
	}

	get(idx: number): T | undefined {
		return this.array[idx];
	}

	removeAt(idx: number): T | undefined {
		if (idx < 0 || idx >= this.length) {
			return undefined;
		}

		if (idx === this.length - 1) {
			const value = this.array[idx];
			this.array[idx] = undefined;
			this.length = 0;
			this.cursor = 0;

			return value;
		}


		const value = this.array[idx]

		for (let i = idx; i <= this.length - 1; i += 1) {
			const isLast = i === this.length - 1;
			if (isLast) {
				this.array[i] = undefined;
			} else {
				this.array[i] = this.array[i + 1];
			}
		}

		this.cursor -= 1;
		this.length -= 1;
		return value;
	}

	private grow() {
		const prevArray = this.array;
		this.#capacity = this.length * this.multiplier;
		this.array = new Array<T>(this.#capacity);

		for (let i = 0; i < prevArray.length; i  += 1) {
			this.array[i] = prevArray[i];
		}
	}
}
