var input, numberOfLayers, layers;

const parseInput = (raw) => {
	var parsed = raw
		.trim()
		.replace(/ /g, '')
		.split(/\n/)
		.map((item) => item.split(':').map(Number));

	return parsed;
};

const calculatePosition = (elemIx, delay, movement) => {
	var halfPeriod = layers[elemIx] - 1;
	var fullPeriod = 2 * (layers[elemIx] - 1);
	var futurePos = delay + movement;

	if (futurePos % fullPeriod === 0) {
		return 0;
	}
	if (futurePos % halfPeriod === 0) {
		return halfPeriod;
	}

	var valueInHalf = (futurePos % halfPeriod);
	var valueInFull = (futurePos % fullPeriod);
	if (valueInHalf === valueInFull) {
		return valueInFull;
	} else {
		return fullPeriod - valueInFull;
	}
};

const doRun = (breakIfCaught, delay) => {
	var pos = -1;
	var cost = 0;

	for (var i = 0; i < layers.length; i++) {
		pos++;
		var newPos = (calculatePosition(pos, delay, pos));
		if (layers[pos] > 0 && newPos === 0) {
			if (breakIfCaught) {
				return -1;
			} else {
				cost += (pos * layers[pos]);
			}
		}
	}

	return cost;
};

const part_one = (raw, timer) => {
	if (timer) console.time("part1");
	input = parseInput(raw);
	numberOfLayers = input[input.length - 1][0] + 1;
	layers = new Array(numberOfLayers).fill(0);

	for (var i = 0; i < input.length; i++)
		layers[input[i][0]] = input[i][1];

	var cost = doRun(false, 0);
	if (timer) console.timeEnd("part1");
	return cost;
};

const part_two = (raw, timer) => {
	if (timer)
		console.time("part2");
	input = parseInput(raw);
	numberOfLayers = input[input.length - 1][0] + 1;
	layers = new Array(numberOfLayers).fill(0);

	//var skipDelays = [];
	for (var i = 0; i < input.length; i++) {
		layers[input[i][0]] = input[i][1];
		//if (skipDelays.indexOf(input[i][1] + (i + 1)) === -1)
		//	skipDelays.push(input[i][1] + (i + 1));
	}

	//console.log(skipDelays);
	var delay = 0, result, skip;
	while (true) {
		skip = false;

		// for (var i = 0; i < skipDelays.length; i++) {
		// 	if (delay % skipDelays[i] === 0) {
		// 		skip = true;
		// 		break;
		// 	}
		// }

		if (!skip) {
			result = doRun(true, delay);
			if (result !== -1) {
				break;
			}
		}

		delay++;
	}

	if (timer)
		console.timeEnd("part2");
	return delay;
};

module.exports = {
	part_one: part_one,
	part_two: part_two
}