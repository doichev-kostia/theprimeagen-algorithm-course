/**
 * [
 * 	"wwwweww",
 * 	"w     w",
 * 	"wswwwww"
 * ]
 */

// x - row
// y - column
type Y = number;
type X = number;

/**
 * y, x
 */
const direction: [Y, X][] = [
	[-1, 0],
	[0, 1],
	[1, 0],
	[0, -1]
];

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

	for (let i = 0; i < direction.length; i += 1) {
		const [y, x] = direction[i];
		const pos = {
			x: position.x + x,
			y: position.y + y
		}

		const shouldGo = walk(maze, wall,pos, end, seen, path);
		if (shouldGo) {
			path.push(pos);
			return true;
		}
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
