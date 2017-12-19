var maze;

const parseInput = (raw) => {
	var parsed = raw
		.split(/\n/);

	return parsed;
};

const isLetter = (char) => {
	return (char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90);
};

const getNextDirection = (maze, intersectionPos, currentDirection) => {
	var checkPos;
	switch (currentDirection) {
		case 'up':
		case 'down':
			if (intersectionPos.x !== 0) {
				checkChar = maze[intersectionPos.y][intersectionPos.x-1];
				if (checkChar && (checkChar === '-' || isLetter(checkChar)))
					return 'left';
			}
			if (intersectionPos.x !== maze[intersectionPos.y].length - 1) {
				checkChar = maze[intersectionPos.y][intersectionPos.x+1];
				if (checkChar && (checkChar === '-' || isLetter(checkChar)))
					return 'right';
			}
			break;
		case 'left':
		case 'right':
			if (intersectionPos.y !== 0) {
				checkChar = maze[intersectionPos.y-1][intersectionPos.x];
				if (checkChar && (checkChar === '|' || isLetter(checkChar)))
					return 'up';
			}
			if (intersectionPos.y !== maze.length - 1) {
				checkChar = maze[intersectionPos.y+1][intersectionPos.x];
				if (checkChar && (checkChar === '|' || isLetter(checkChar)))
					return 'down';
			}
			break;
	}
};

const solution = (part1, raw) => {
	var letters = '';
	var currentPos = { x: 0, y: 0 };
	var direction = 'down';

	maze = parseInput(raw);
	for (var i = 0; i < maze[0].length; i++) {
		if (maze[0].charAt(i) === '|') {
			currentPos.x = i;
			break;
		}
	}

	var nextChar, nextPos;
	var steps = 0;
	while (true) {
		nextPos = currentPos;
		steps++;

		switch (direction) {
			case 'up':
				nextPos.y -= 1;
				break;
			case 'down':
				nextPos.y += 1;
				break;
			case 'left':
				nextPos.x -= 1;
				break;
			case 'right':
				nextPos.x += 1;
				break;
		}

		currentPos.x = nextPos.x;
		currentPos.y = nextPos.y;

		if (nextPos.y < 0 || nextPos.y === maze.length || nextPos.x < 0 || nextPos.x === maze[nextPos.y].length)
			break;

		nextChar = maze[nextPos.y][nextPos.x];

		if (nextChar === ' ')
			break;

		if (nextChar === '+') {
			direction = getNextDirection(maze, nextPos, direction);
		} else {
			if (isLetter(nextChar)) {
				letters += nextChar;
			}
		}
	}

	return (part1 ? letters : steps);
};

const part_one = (raw) => solution(true, raw);
const part_two = (raw) => solution(false, raw);

module.exports = {
	part_one: part_one,
	part_two: part_two
}