/**
 * [
 * 	"wwwweww",
 * 	"w     w",
 * 	"wswwwww"
 * ]
 */

// x - row
// y - column

/**
 * Base case:
 * - it's a wall
 * - it's off the grid
 * - it's the end
 * - I've been here before
 */

function walk(maze: string[], wall: string, position: Point, end: Point, seen: boolean[][], path: Point[]): boolean {
	if (position.x === end.x && position.y === end.y) {
		return true;
	}

	// off the grid
	if (position.y >= maze.length || position.y < 0 || position.x >= maze[position.y].length || position.x < 0) {
		return false;
	}

	if (maze[position.y].charAt(position.x) === wall) {
		return false;
	}

	// I've been here before
	if (seen[position.y][position.x]) {
		return false;
	}

	seen[position.y][position.x] = true;

	const top = {
		x: position.x,
		y: position.y - 1,
	};

	const shouldGoUp = walk(maze, wall, top, end, seen, path);

	if (shouldGoUp) {
		path.push(top);
		return true;
	}

	const right = {
		x: position.x + 1,
		y: position.y,
	}
	const shouldGoRight = walk(maze, wall, right, end, seen, path);

	if (shouldGoRight) {
		path.push(right);
		return true;
	}

	const bottom = {
		x: position.x,
		y: position.y + 1
	}

	const shouldGoBottom = walk(maze, wall, bottom, end, seen, path);

	if (shouldGoBottom) {
		path.push(bottom);
		return true;
	}

	const left = {
		x: position.x - 1,
		y: position.y,
	};

	const shouldGoLeft = walk(maze, wall, left, end, seen, path);

	if (shouldGoLeft) {
		path.push(left);
		return true;
	}

	return false;
}

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
	const path: Point[] = [];
	const seen: boolean[][] = new Array(maze.length).fill(0).map((item, idx) => {
		return new Array(maze[idx].length).fill(false);
	})

	walk(maze, wall, start, end, seen, path);
	path.push(start);

	return path.reverse();
}
