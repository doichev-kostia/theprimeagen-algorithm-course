import Queue from "@code/Queue";

export default function bfs(head: BinaryNode<number>, needle: number): boolean {
	const queue = new Queue<BinaryNode<number>>();

	queue.enqueue(head)

	let found = false
	while (queue.length) {
		const node = queue.deque() as BinaryNode<number>;
		if (node.value === needle) {
			found = true;
			break;
		}

		if (node.left == null && node.right == null) {
			continue;
		}

		if (node.left) {
			queue.enqueue(node.left);
		}

		if (node.right) {
			queue.enqueue(node.right);
		}
	}

	return found;

}
