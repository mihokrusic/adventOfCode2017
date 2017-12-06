const part_one = (input) => {
	var sum = 0;
	for (var i = 0; i < input.length; i++) {

		var nextLocation = (i === input.length - 1 ? 0 : i + 1);
		if (input[i] === input[nextLocation]) {
			sum += +input[i];
		}
	}
	return sum;
};

const part_two = (input) => {
	var sum = 0;
	var checkAhead = (input.length / 2);

	for (var i = 0; i < input.length; i++) {
		var nextLocation = (i + checkAhead);
		if (nextLocation >= input.length)
			nextLocation-=input.length;
		if (input[i] === input[nextLocation]) {
			sum += +input[i];
		}
	}
	return sum;
};

module.exports = {
	part_one: part_one,
	part_two: part_two
}
