const ARRAY_DIMS = 1001;
const ARRAY_MID = Math.floor(ARRAY_DIMS / 2);

const parseInput = (raw) => {
	var parsed = raw
		.trim()
		.split(/\n/g)
		.map((item) => item.trim().split(''));

	return parsed;
};

const initMap = (input) => {

	var map = new Array(ARRAY_DIMS);
	for (var i = 0; i < map.length; i++) {
		map[i] = Array.apply(null, Array(ARRAY_DIMS)).map(String.prototype.valueOf, ".")
	}

	var inputDims = input.length;
	for (var i = 0; i < input.length; i++) {
		for (var j = 0; j < input[i].length; j++) {
			var mapX = Math.floor((ARRAY_DIMS - inputDims) / 2) + i;
			var mapY = Math.floor((ARRAY_DIMS - inputDims) / 2) + j;
			map[mapX][mapY] = input[i][j];
		}
	}
	return map;
};

const printMap = (map) => {
	console.log("Map:");
	for (var i = 0; i < map.length; i++) {
		var row = '';
		for (var j = 0; j < map[i].length; j++) {
			row += map[i][j];
		}
		console.log(row);
	}
};

const part_one = (raw, bursts) => {

	var input = parseInput(raw);
	var map = initMap(input);

	var pos = {
		x: ARRAY_MID,
		y: ARRAY_MID,
		direction: 0 // 0 up, 1 right, 2 down, 3 left
	};
	var infections = 0;

	for (var i = 0; i < bursts; i++) {
		if (map[pos.y][pos.x] === '.') {
			pos.direction = ((pos.direction - 1 + 4) % 4);
			map[pos.y][pos.x] = '#';
			infections++;
		} else {
			pos.direction = ((pos.direction + 1) % 4);
			map[pos.y][pos.x] = '.';
		}
		switch (pos.direction) {
			case 0:
				pos.y--;
				break;
			case 1:
				pos.x++;
				break;
			case 2:
				pos.y++;
				break;
			case 3:
				pos.x--;
				break;
		}
	}

	// printMap(map);
	return infections;
};

const part_two = (raw) => {
	return 0;
};


module.exports = {
	part_one: part_one,
	part_two: part_two
}