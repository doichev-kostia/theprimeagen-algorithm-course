
function search(node: BinaryNode<number>, needle: number): boolean {
	// not really needed, but come on, we are in JS land. as any is the king :)
	if (!node) {
		return false
	}
	if (node.value === needle) {
		return true
	}

	if (node.value < needle) {
		return !!node.right && search(node.right, needle);
	}

	return !!node.left && search(node.left, needle);
}
export default function dfs(head: BinaryNode<number>, needle: number): boolean {
	if (!head) {
		return false;
	}

	return search(head, needle);
}
