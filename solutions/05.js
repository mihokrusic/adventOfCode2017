const parseInput = (input) => {
	var temp = input
		.trim()
		.split(/\n/)
		.map(Number);
	return temp;
}

const part_one = (input) => {
	var numberOfSteps = 0;
	var currentPos = 0;
	var jumps = parseInput(input);

	while (currentPos < jumps.length) {
		var nextJump = jumps[currentPos];
		jumps[currentPos]++;
		currentPos += nextJump;
		numberOfSteps++;
	}

	return numberOfSteps
}

const part_two = (input) => {
	var numberOfSteps = 0;
	var currentPos = 0;
	var jumps = parseInput(input);

	while (currentPos < jumps.length) {
		var nextJump = jumps[currentPos];
		jumps[currentPos] += (jumps[currentPos] >= 3 ? -1 : 1)
		currentPos += nextJump;
		numberOfSteps++;
	}

	return numberOfSteps;
}

module.exports = {
	part_one: part_one,
	part_two: part_two
}