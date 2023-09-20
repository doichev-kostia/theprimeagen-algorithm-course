class Node<T> {
	constructor(public data: T, public next: Node<T> | null) {
	}
}

export default class Queue<T> {
	public length: number;
	private head: Node<T> | null;
	private tail: Node<T> | null;

	constructor() {
		this.head = this.tail = null;
		this.length = 0;
	}

	enqueue(item: T): void {
        const node = new Node(item, null);
        this.length += 1;

        if (!this.tail) {
            this.tail = this.head = node;
            return;
        }

        this.tail.next = node;
        this.tail = node;
	}

	deque(): T | undefined {
        if (!this.head) {
            return undefined;
        }

        this.length -= 1;

        const node = this.head;
        this.head = this.head.next;

        node.next = null; // GC

        if (this.length === 0) {
            this.tail = null;
        }

        return node.data;
	}

	peek(): T | undefined {
        return this.head?.data;
	}
}
