
// (a) <- (b) <- (c)
//                ^ head
class Node<T> {
	constructor(public data: T, public prev: Node<T> | null) {
	}
}


export default class Stack<T> {
	public length: number;
	private head: Node<T> | null;

	constructor() {
		this.length = 0;
		this.head = null;
	}

	push(item: T): void {
		this.length += 1;
		const node = new Node(item, this.head);

		if (this.head) {
			node.prev = this.head;
		}

		this.head = node;
	}

	pop(): T | undefined {
		const node = this.head;

		if (!node) {
			return undefined;
		}
		this.length -= 1;

		this.head = this.head?.prev ?? null;

		node.prev = null; // GC

		return node.data;
	}

	peek(): T | undefined {
		return this.head?.data;
	}
}
