const parseInput = (input) => {
	var parsed = input.trim().replace(/\n/g, "*").split("*");
	for (var i = 0; i < parsed.length; i++) {
		parsed[i] = parsed[i].trim().replace(/\t/g, "*").split("*").map(Number);
	}
	return parsed;
};

const part_one = (input) => {
	var checksum = 0;
	var parsedInput = parseInput(input);

	var max, min, value;
	for (var i = 0; i < parsedInput.length; i++) {
		min = max = undefined;

		for (var j = 0; j < parsedInput[i].length; j++) {
			value = parsedInput[i][j];
			if (min === undefined && max === undefined) {
				min = value;
				max = value;
			} else {
				if (max < value)
					max = value;
				if (min > value)
					min = value;
			}
		}

		checksum+= (max - min);
	}
	return checksum;
};

const part_two = (input) => {
	var checksum = 0;
	var parsedInput = parseInput(input);

	var firstValue, secondValue, min, max;
	for (var i = 0; i < parsedInput.length; i++) {
		for (var j = 0; j < parsedInput[i].length - 1; j++) {
			firstValue = parsedInput[i][j];
			for (var k = j + 1; k < parsedInput[i].length; k++) {
				secondValue = parsedInput[i][k];

				min = (firstValue > secondValue ? secondValue : firstValue);
				max = (firstValue > secondValue ? firstValue : secondValue);

				if (max % min === 0) {
					checksum += (max / min);
				}
			}
		}
	}
	return checksum;
};

module.exports = {
	part_one: part_one,
	part_two: part_two
}
