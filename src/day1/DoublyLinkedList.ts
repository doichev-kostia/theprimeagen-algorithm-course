import assert from "node:assert";

class Node<T> {
	constructor(public data: T, public next: Node<T> | null, public prev: Node<T> | null) {
	}
}


export default class DoublyLinkedList<T> {
	private head: Node<T> | null = null;
	private tail: Node<T> | null = null;
	public length: number;


	constructor() {
		this.length = 0;
	}

	prepend(item: T): void {
		const node = new Node(item, this.head, null);
		if (this.head) {
			this.head.prev = node;
		}

		if (this.head?.next == null && !this.tail) {
			this.tail = node;
		}
		this.head = node;
		this.length += 1;
	}

	insertAt(item: T, idx: number): void {
		const isInBounds = idx >= 0 && idx <= this.length;
		if (!isInBounds) {
			throw new Error("Index is out of bounds");
		}

		if (idx === 0) {
			this.prepend(item);
		} else if (idx === this.length) {
			this.append(item);
		} else {
			const currentNode = this.getNode(idx);
			assert(currentNode, "Node should exist");
			const prevNode = currentNode.prev;
			const newNode = new Node(item, currentNode, prevNode);
			currentNode.prev = newNode;
			if (prevNode) {
				prevNode.next = newNode;
			}
			this.length += 1
		}

	}

	append(item: T): void {
		const node = new Node(item, null, this.tail);
		if (this.tail) {
			this.tail.next = node;
		}

		if (this.tail?.prev == null && !this.head) {
			this.head = node;
		}

		this.tail = node;
		this.length += 1;
	}

	remove(item: T): T | undefined {
		const node = this.traverse(item);
		if (!node) {
			return undefined;
		}

		const prev = node.prev;
		const next = node.next;

		if (prev) {
			prev.next = next;
		} else {
			this.head = next;
		}

		if (next) {
			next.prev = prev
		} else {
			this.tail = prev;
		}

		this.length -= 1;
		return node.data;
	}

	get(idx: number): T | undefined {
		const node = this.getNode(idx);

		return node?.data;
	}

	removeAt(idx: number): T | undefined {
		const node = this.getNode(idx);
		if (!node) {
			return undefined;
		}

		const prev = node.prev;
		const next = node.next;

		if (prev) {
			prev.next = next;
		} else {
			this.head = next
		}

		if (next) {
			next.prev = prev;
		} else {
			this.tail = prev;
		}


		this.length -= 1;
		return node.data;
	}

	private traverse(item: T): Node<T> | null {
		let current = this.head;
		while (current) {
			if (current.data === item) {
				return current;
			}


			current = current.next;
		}

		return null;
	}

	private getNode(idx: number): Node<T> | null {
		assert(idx >= 0, "Index can't be negative");

		if (idx === 0) {
			return this.head;
		} else if (idx > this.length) {
			return null;
		} else if (this.length === 0) {
			return null;
		} else if (idx === this.length - 1) {
			return this.tail;
		}

		assert(this.length > 0, "The length should be more than 1");

		const middle = Math.round(this.length / 2);

		if (idx <= middle) {
			// traverse from the beginning
			// start from 1 as we already handled idx === 0
			let current = this.head?.next;
			for (let i = 1; i <= idx; i += 1) {
				const isLast = i === idx;
				if (isLast) {
					return current ?? null;
				}

				if (!current?.next) {
					return null;
				}

				current = current.next;
			}
		} else {
			// traverse from the end
			// start from length - 2 as we already handled idx === length - 1
			let current = this.tail?.prev;
			for (let i = this.length - 2; i >= idx; i -= 1) {
				const isCorrect = i === idx;
				if (isCorrect) {
					return current ?? null;
				}

				if (!current?.prev) {
					return null;
				}

				current = current.prev;
			}
		}

		return null;
	}
}
