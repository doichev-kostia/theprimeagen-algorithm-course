function cmp(a: BinaryNode<number>, b: BinaryNode<number>): boolean {
	if ((a.left && !b.left) || (!a.left && b.left)) {
		return false
	}

	if ((a.right && !b.right) || (!a.right && b.right)) {
		return false
	}

	if (a.value !== b.value) {
		return false
	}

	if (a.left) {
		const res = cmp(a.left, b.left as BinaryNode<number>)
		if (res === false) {
			return false
		}
	}

	if (a.right) {
		const res = cmp(a.right, b.right as BinaryNode<number>)
		if (res === false) {
			return false;
		}
	}

	return true;
}

export default function compare(a: BinaryNode<number> | null, b: BinaryNode<number> | null): boolean {
	if (!a && !b) {
		return true;
	}

	if ((!a && b) || (a && !b)) {
		return false
	}

	return cmp(a as BinaryNode<number>, b as BinaryNode<number>);
}
