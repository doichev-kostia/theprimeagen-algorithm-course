function swap<T>(array: T[], idx: number, idx2: number) {
	const temp = array[idx];
	array[idx] = array[idx2];
	array[idx2] = temp;
}

export default class MinHeap {
	public length: number;
	private list: Array<number>;

	constructor() {
		this.list = [];
		this.length = 0;
	}

	insert(value: number): void {
		let valueIdx = this.length;
		this.length += 1;
		this.list.push(value);

		let parentIndex = this.getParentIndex(valueIdx);
		if (parentIndex < 0) {
			return;
		}

		// heapify up
		while (this.list[parentIndex] > value) {
			swap(this.list, valueIdx, parentIndex);
			valueIdx = parentIndex;
			parentIndex = this.getParentIndex(valueIdx);
		}
	}

	delete(): number {
		const head = this.list[0];
		if (!head) {
			throw new Error("Heap is empty");
		}

		this.length -= 1;
		if (this.list.length === 1) {
			return head;
		}

		const last = this.list.pop() as number;
		this.list[0] = last;

		// no children there
		if (this.list.length === 1) {
			return head;
		}

		let valueIdx = 0;
		// heapify down
		while (true) {
			const [leftIdx, rightIdx] = this.getChildrenIndices(valueIdx);

			const left = leftIdx <= this.list.length ? this.list[leftIdx] : -1;
			const right = rightIdx <= this.list.length ? this.list[rightIdx] : -1;

			if (left === -1 && right === -1) {
				// nowhere to go
				break;
			} else if (left === -1) {
				swap(this.list, valueIdx, rightIdx);
				valueIdx = rightIdx;
			} else if (right === -1) {
				swap(this.list, valueIdx, leftIdx);
				valueIdx = leftIdx;
			} else if (left < right) {
				swap(this.list, valueIdx, leftIdx);
				valueIdx = leftIdx;
			} else if (right < left) {
				swap(this.list, valueIdx, rightIdx);
				valueIdx = rightIdx;
			} else {
				swap(this.list, valueIdx, leftIdx);
				valueIdx = rightIdx;
			}

		}

		return head;
	}

	private getChildrenIndices(parentIdx: number) {
		const nextLevel = parentIdx * 2;
		return [nextLevel + 1, nextLevel + 2];
	}

	private getParentIndex(childIdx: number) {
		return Math.floor((childIdx - 1) / 2);
	}
}
