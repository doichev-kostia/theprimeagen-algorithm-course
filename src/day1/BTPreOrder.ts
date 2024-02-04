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

function walk_immutable(node: BinaryNode<number>, path: number[]): number[] {
	let p = [...path, node.value]

	if (node.left == null && node.right == null) {
		return p
	}

	if (node.left) {
		p = walk_immutable(node.left, p);
	}

	if (node.right) {
		p = walk_immutable(node.right, p)
	}

	return p;
}

export default function pre_order_search(head: BinaryNode<number>): number[] {
	// const path: number[] = [];
	//
	// walk(head, path);
	//
	// return path;

	return walk_immutable(head, []);
}
