var input;

const parseInput = (raw) => {
	var parsed = raw
		.trim()
		.replace(/ /g, '')
		.split(/\n/)
		.map((item) => item.split(':').map(Number));

	return parsed;
};

const part_one = (raw) => {
	input = parseInput(raw);
	var numberOfLayers = input[input.length - 1][0] + 1;
	var layers = new Array(numberOfLayers).fill(0);
	var scanners = new Array(numberOfLayers).fill(0);
	var directions = new Array(numberOfLayers).fill(1);
	var pos = -1;
	var cost = 0;

	for (var i = 0; i < input.length; i++)
		layers[input[i][0]] = input[i][1];

	for (var i = 0; i < numberOfLayers; i++) {
		pos++;
		// console.log("Pico " + (i + 1) + ", pos " + pos);
		// console.log("    ", scanners);

		if (layers[pos] > 0 && scanners[pos] === 0) {
			cost += (pos * layers[pos]);
			//console.log("Caught on pos " + pos);
		}

		for (var j = 0; j < numberOfLayers; j++) {
			if (layers[j] === 0)
				continue;

			if (directions[j] === 1 && scanners[j] === layers[j] - 1) {
				directions[j] = -1;
			}
			if (directions[j] === -1 && scanners[j] === 0) {
				directions[j] = 1;
			}
			scanners[j] += directions[j];
		}

		//console.log("    ", scanners);
	}

	// console.log(input);
	// console.log(layers);
	// console.log(scanners);
	//console.log(cost);
	return cost;
};

const part_two = (raw) => {

	return 0;
};

module.exports = {
	part_one: part_one,
	part_two: part_two
}