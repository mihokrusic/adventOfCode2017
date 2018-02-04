const parseInput = (raw) => {
	var parsed = raw
		.trim()
		.split(/\n/g)
		.map((item) => item.trim().split(" "));

	return parsed;
};

const getRule = (blueprint, state, value) => {
	for (let rule of blueprint) {
		if (rule[0] === state && +rule[1] === value)
			return rule;
	}
	return false;
};

const part_one = (raw, steps) => {
	var blueprint = parseInput(raw);
	var currentState = 'A';
	var pos = 0;
	var tape = {};

	var currentValue, currentRule;
	for (var i = 0; i < steps; i++) {
		if (typeof tape[pos] === 'undefined')
			tape[pos] = 0;

		currentValue = tape[pos];
		currentRule = getRule(blueprint, currentState, currentValue);

		tape[pos] = +currentRule[2];
		pos += (currentRule[3] === 'L' ? -1 : 1);
		currentState = currentRule[4];

		if (!currentRule) {
			throw "No rule for this situation!";
		}
	}

	var turnedOn = 0;
	for (let key of Object.keys(tape)) {
		if (tape[key] === 1)
			turnedOn++;
	}
	return turnedOn;
};

const part_two = (raw) => {
	return 0;
};

module.exports = {
	part_one: part_one,
	part_two: part_two
}