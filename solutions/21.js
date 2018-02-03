const parseInput = (raw) => {
	var parsed = raw
		.trim()
		.split(/\n/g)
		.map((item) => item.trim().split(/ => /g));

	return parsed;
};

const copyArray = (original) => {
	var copy = Array(original.length);
	for (var i = 0; i < original.length; i++) {
		copy[i] = [];
		for (var j = 0; j < original.length; j++)
			copy[i].push(original[i][j]);
	}
	return copy;
};

const flip = (ruleArray) => {
	var flipedArray = copyArray(ruleArray);

	if (ruleArray.length === 2) {
		flipedArray[0][0] = ruleArray[0][1];
		flipedArray[0][1] = ruleArray[0][0];
		flipedArray[1][0] = ruleArray[1][1];
		flipedArray[1][1] = ruleArray[1][0];
	}
	if (ruleArray.length === 3) {
		flipedArray[0][0] = ruleArray[0][2];
		flipedArray[0][2] = ruleArray[0][0];
		flipedArray[1][0] = ruleArray[1][2];
		flipedArray[1][2] = ruleArray[1][0];
		flipedArray[2][0] = ruleArray[2][2];
		flipedArray[2][2] = ruleArray[2][0];
	}

	return flipedArray;
};

const rotate90 = (ruleArray) => {
	var rotatedArray = copyArray(ruleArray);

	if (ruleArray.length === 2) {
		rotatedArray[0][0] = ruleArray[1][0];
		rotatedArray[0][1] = ruleArray[0][0];
		rotatedArray[1][0] = ruleArray[1][1];
		rotatedArray[1][1] = ruleArray[0][1];
	}
	if (ruleArray.length === 3) {
		rotatedArray[0][0] = ruleArray[2][0];
		rotatedArray[0][1] = ruleArray[1][0];
		rotatedArray[0][2] = ruleArray[0][0];
		rotatedArray[1][0] = ruleArray[2][1];
		rotatedArray[1][2] = ruleArray[0][1];
		rotatedArray[2][0] = ruleArray[2][2];
		rotatedArray[2][1] = ruleArray[1][2];
		rotatedArray[2][2] = ruleArray[0][2];
	}

	return rotatedArray;
};

const rotateInputRules = (rules) => {
	var allRules = [];
	for (let rule of rules) {
		var ruleArray = stringToPixels(rule[0]), rotated;
		// base rule
		allRules.push({ input: rule[0], output: rule[1] });
		// rotate90
		allRules.push({ input: pixelsToString(rotate90(ruleArray)), output: rule[1] });
		// rotate180
		allRules.push({ input: pixelsToString(rotate90(rotate90(ruleArray))), output: rule[1] });
		// rotate270
		allRules.push({ input: pixelsToString(rotate90(rotate90(rotate90(ruleArray)))), output: rule[1] });
		// flip
		allRules.push({ input: pixelsToString(flip(ruleArray)), output: rule[1] });
		// rotate90
		allRules.push({ input: pixelsToString(rotate90(flip(ruleArray))), output: rule[1] });
		// rotate180
		allRules.push({ input: pixelsToString(rotate90(rotate90(flip(ruleArray)))), output: rule[1] });
		// rotate270
		allRules.push({ input: pixelsToString(rotate90(rotate90(rotate90(flip(ruleArray))))), output: rule[1] });
	}

	return allRules;
};

const stringToPixels = (str) => {
	return str
		.split('/')
		.map((item) => item.split(''));
};

const pixelsToString = (pix) => {
	var str = '';
	for (let row of pix) {
		str += row.join('') + '/';
	}
	return str.substring(0, str.length - 1);
};

const findRule = (rules, input) => {
	for (var i = 0; i < rules.length; i++) {
		if (rules[i].input === input)
			return rules[i].output;
	}
	return false;
};

const breakPixels = (pixels) => {
	var groupSize = (pixels.length % 2 === 0 ? 2 : 3);
	var groupsInRow = Math.floor(pixels.length / groupSize);
	var groupCount = Math.pow(groupsInRow, 2);

	var groups = Array(groupCount);
	for (var i = 0; i < groupCount; i++)
		groups[i] = [];

	//console.log("Break pixels into " + groupCount + " group(s), each size of " + groupSize);

	if (groupCount === 1) {
		groups[0] = pixels;
	} else {
		var y, x;
		for (var g = 0; g < groups.length; g++) {
			y = Math.floor(g / groupsInRow) * groupSize;
			x = (g % groupsInRow) * groupSize;
			//console.log("Grupa " + g + ", y je od " + y + " do " + (y+groupSize-1) + ", x je od " + x + " do " + (x+groupSize-1));
			for (var i = y; i <= y + groupSize - 1; i++) {
				groups[g].push([]);
				for (var j = x; j <= x + groupSize - 1; j++) {
					groups[g][groups[g].length - 1].push(pixels[i][j]);
				}
			}
		}
	}

	return groups;
};


const joinPixels = (groups) => {
	var pixels;
	if (groups.length === 1) {
		pixels = groups[0];
	} else {
		var newMatrixSize = (Math.sqrt(groups.length));
		var groupSize = groups[0].length;
		pixels = Array(newMatrixSize * groupSize);
		for (var i = 0; i < pixels.length; i++) {
			pixels[i] = [];

			for (var j = 0; j < newMatrixSize; j++) {
				pixels[i] = pixels[i].concat(groups[Math.floor(i / groupSize) * newMatrixSize + j][i % groupSize])
			}
		}
	}

	return pixels;
};


const printPixels = (pixels) => {
	var line;
	process.stdout.write("--------------------\n");
	for (var i = 0; i < pixels.length; i++) {
		line = "";
		for (var j = 0; j < pixels.length; j++) {
			line += pixels[i][j]
		}

		process.stdout.write(line + "\n");
	}
	process.stdout.write("--------------------\n\n");
};


const countTurnedOnPixels = (pixels) => {
	var count = 0;
	for (var i = 0; i < pixels.length; i++) {
		for (var j = 0; j < pixels[i].length; j++) {
			if (pixels[i][j] === '#')
				count++;
		}
	}

	return count;
};


const solution = (raw, iterations) => {
	var inputRules = parseInput(raw);
	var rules = rotateInputRules(inputRules);
	var pixels = stringToPixels('.#./..#/###');

	for (var i = 0; i < iterations; i++) {
		var output;
		var groups = breakPixels(pixels);

		var groupsOutput = [];
		for (let group of groups) {
			output = findRule(rules, pixelsToString(group));
			if (output) {
				groupsOutput.push(stringToPixels(output));
			} else {
				console.log("--------------------");
				console.log(group);
				throw "Should not happen, can't find matching transformation rule";
			}
		}

		pixels = joinPixels(groupsOutput);
	}

	return countTurnedOnPixels(pixels);
};


module.exports = {
	part_one: solution,
	part_two: solution
}