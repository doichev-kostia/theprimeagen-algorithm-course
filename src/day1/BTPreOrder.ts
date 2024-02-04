function walk(node: BinaryNode<number>, path: number[]): void {
	path.push(node.value)

	if (node.left == null && node.right == null) {
		return
	}

	if (node.left) {
		walk(node.left, path)
	}

	if (node.right) {
		walk(node.right, path)
	}
}

export default function pre_order_search(head: BinaryNode<number>): number[] {
	const path: number[] = [];

	walk(head, path);

	return path;
}
