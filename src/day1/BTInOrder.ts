function walk(node: BinaryNode<number>, path: number[]): void {
	if (!node.left) {
		path.push(node.value);
	}

	if (node.left == null && node.right == null) {
		return;
	}

	if (node.left) {
		walk(node.left, path);
		path.push(node.value)
	}

	if (node.right) {
		walk(node.right, path);
	}
}

export default function in_order_search(head: BinaryNode<number>): number[] {
	const path: number[] = [];

	walk(head, path);

	return path;
}
