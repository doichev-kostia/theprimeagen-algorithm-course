function walk(node: BinaryNode<number>, path: number[]): void {
	if (node.left == null && node.right == null) {
		path.push(node.value)
		return;
	}

	if (node.left) {
		walk(node.left, path);
	}

	if (node.right) {
		walk(node.right, path);
	}

	path.push(node.value)
}

export default function post_order_search(head: BinaryNode<number>): number[] {
	const path: number[] = [];

	walk(head, path);

	return path;
}
