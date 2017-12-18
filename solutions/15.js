const parseInput = (raw) => {
	var parsed = raw
		.trim()
		.split(/\n/g)
		.map((item) => item.trim().split(" "));

	return parsed;
};

const getValue = (command, registers) => {

	var isNumber = parseInt(command[2], 10);
	var result = (isNumber ? +command[2] : registers[command[2]]);
	return result;
};

const loopCommands = (input) => {
	var registers = {}, i = 0;
	var lastSoundFrequency = 0;
	var jumped;
	while (i < input.length) {
		var command = input[i];
		jumped = false;
		switch (command[0]) {
			case "set":
				registers[command[1]] = getValue(command, registers);
				break;
			case "add":
				registers[command[1]] = (registers[command[1]] || 0) + getValue(command, registers);
				break;
			case "mul":
				registers[command[1]] = (registers[command[1]] || 0) * getValue(command, registers);
				break;
			case "mod":
				registers[command[1]] = registers[command[1]] % getValue(command, registers);;
				break;
			case "snd":
				if (registers[command[1]] !== 0)
					lastSoundFrequency = registers[command[1]];
				break;
			case "rcv":
				if (registers[command[1]] !== 0 && lastSoundFrequency !== 0)
					return lastSoundFrequency;
				break;
			case "jgz":
				if (registers[command[1]] !== 0) {
					jumped = true;
					i += getValue(command, registers);;
				}
				break;
		}

		if (!jumped)
			i++;
	}
};

const part_one = (raw) => {
	var input = parseInput(raw);

	var result = loopCommands(input);
	return result;
};

const part_two = (raw) => {
	return 0;
};

module.exports = {
	part_one: part_one,
	part_two: part_two
}