const parseInput = (input) => {
	var parsed = input
		.trim()
		.replace(/\t/g, '')
		.replace(/ inc /g, '|inc|')
		.replace(/ dec /g, '|dec|')
		.replace(/ if /g, '|')
		.replace(/ > /g, '|>|')
		.replace(/ < /g, '|<|')
		.replace(/ >= /g, '|>=|')
		.replace(/ == /g, '|==|')
		.replace(/ <= /g, '|<=|')
		.replace(/ != /g, '|!=|')
		.split(/\n/)
		.map((item) => item.split('|'));

	return parsed;
};

const getRegister = (registers, name) => {
	for (var i = 0; i < registers.length; i++) {
		if (registers[i].name === name)
			return i;
	}

	registers.push({
		name: name,
		value: 0
	});
	registerIx = (registers.length - 1);

	return registerIx;
};

const isConditionPassed = (registers, instruction, conditionRegisterIx) => {
	var conditionPassed = false;
	var conditionTest = (+instruction[5]);
	switch (instruction[4]) {
		case ">":
			conditionPassed = (registers[conditionRegisterIx].value > conditionTest);
			break;
		case "<":
			conditionPassed = (registers[conditionRegisterIx].value < conditionTest);
			break;
		case ">=":
			conditionPassed = (registers[conditionRegisterIx].value >= conditionTest);
			break;
		case "<=":
			conditionPassed = (registers[conditionRegisterIx].value <= conditionTest);
			break;
		case "==":
			conditionPassed = (registers[conditionRegisterIx].value === conditionTest);
			break;
		case "!=":
			conditionPassed = (registers[conditionRegisterIx].value !== conditionTest);
			break;
	}
	return conditionPassed;
};

const getMaxRegister = (registers) => {
	var max = 0;
	for (var i = 0; i < registers.length; i++) {
		if (registers[i].value > max)
			max = registers[i].value;
	}

	return max;
};

const part_one = (input) => {
	var instructions = parseInput(input);
	var registers = [];

	for (var i = 0; i < instructions.length; i++) {
		var registerIx = getRegister(registers, instructions[i][0]);
		var conditionRegisterIx = getRegister(registers, instructions[i][3]);

		conditionPassed = isConditionPassed(registers, instructions[i], conditionRegisterIx);

		if (conditionPassed) {
			if (instructions[i][1] === 'inc') {
				registers[registerIx].value += (+instructions[i][2]);
			} else {
				registers[registerIx].value -= (+instructions[i][2]);
			}
		}
	}

	return getMaxRegister(registers);
};

const part_two = (input) => {
	var instructions = parseInput(input);
	var registers = [];

	var maxedValue = undefined;
	for (var i = 0; i < instructions.length; i++) {
		var registerIx = getRegister(registers, instructions[i][0]);
		var conditionRegisterIx = getRegister(registers, instructions[i][3]);

		conditionPassed = isConditionPassed(registers, instructions[i], conditionRegisterIx);

		if (conditionPassed) {
			if (instructions[i][1] === 'inc') {
				registers[registerIx].value += (+instructions[i][2]);
			} else {
				registers[registerIx].value -= (+instructions[i][2]);
			}
			if (registers[registerIx].value > maxedValue || maxedValue === undefined)
				maxedValue = registers[registerIx].value;
		}
	}

	return maxedValue;
};

module.exports = {
	part_one: part_one,
	part_two: part_two
}