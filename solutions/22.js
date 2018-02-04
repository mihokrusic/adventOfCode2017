const parseInput = (raw) => {
	var parsed = raw
		.trim()
		.split(/\n/g)
		.map((item) => item.trim().split(''));

	return parsed;
};

const initMap = (input) => {
	var map = {};
	var mid = Math.floor(input.length / 2);
	var pos;
	for (var i = 0; i < input.length; i++) {
		for (var j = 0; j < input[i].length; j++) {
			if (input[i][j] === '.')
				continue;

			pos = getMapKey(mid - i, j - mid);
			map[pos] = input[i][j];
		}
	}
	return map;
};

const getMapKey = (x, y) => {
	return y + '|' + x;
};

const move = (pos, direction) => {
	switch (direction) {
		case 0:
			pos.y++;
			break;
		case 1:
			pos.x++;
			break;
		case 2:
			pos.y--;
			break;
		case 3:
			pos.x--;
			break;
	}
	return pos;
};

const part_one = (raw, bursts) => {
	var input = parseInput(raw);
	var map = initMap(input);

	var pos = { x: 0, y: 0 };
	var direction = 0; // 0 up, 1 right, 2 down, 3 left
	var infections = 0;

	for (var i = 0; i < bursts; i++) {
		var currentPos = getMapKey(pos.y, pos.x);
		if (typeof map[currentPos] === 'undefined') {
			map[currentPos] = '.';
		}

		if (map[currentPos] === '.') {
			direction = (direction - 1 + 4) % 4;
			map[currentPos] = '#';
			infections++;
		} else {
			direction = (direction + 1) % 4;
			map[currentPos] = '.';
		}

		pos = move(pos, direction);
	}

	return infections;
};

const part_two = (raw, bursts) => {
	var input = parseInput(raw);
	var map = initMap(input);

	var pos = { x: 0, y: 0 };
	var direction = 0; // 0 up, 1 right, 2 down, 3 left
	var infections = 0;

	for (var i = 0; i < bursts; i++) {
		var currentPos = getMapKey(pos.y, pos.x);
		if (typeof map[currentPos] === 'undefined') {
			map[currentPos] = '.';
		}

		var currentNode = map[currentPos];
		var futureNode;
		switch (currentNode) {
			case '.':
				futureNode = 'W';
				direction = (direction - 1 + 4) % 4;
				break;
			case 'W':
				infections++;
				futureNode = '#';
				break;
			case '#':
				direction = (direction + 1) % 4;
				futureNode = 'F';
				break;
			case 'F':
				direction = (direction - 2 + 4) % 4;
				futureNode = '.';
				break;
		}

		pos = move(pos, direction);
		map[currentPos] = futureNode;
	}

	return infections;
};


module.exports = {
	part_one: part_one,
	part_two: part_two
}