const parseInput = (raw) => {
	var parsed = raw
		.trim()
		.split(/\n/g)
		.map((item) => item.trim().split(" "));

	return parsed;
};

const getValue = (value, registers) => {
	var isNumber = parseInt(value, 10);
	return (isNumber ? +value : registers[value]);
};

const set = (register, value, registers) => {
	registers[register] = getValue(value, registers);
};

const add = (command, registers) => {
	var currentValue = (registers[command[1]] || 0);
	registers[command[1]] = currentValue + getValue(command[2], registers);
};

const mul = (command, registers) => {
	var currentValue = (registers[command[1]] || 0);
	registers[command[1]] = currentValue * getValue(command[2], registers);
};

const mod = (command, registers) => {
	var currentValue = (registers[command[1]] || 0);
	registers[command[1]] = currentValue % getValue(command[2], registers);
};

const loopCommandsPart1 = (input) => {
	var registers = {}, i = 0;
	var lastSoundFrequency = 0;
	var command, advance;
	while (i < input.length) {
		command = input[i];
		advance = true;

		if (command[0] === 'set')
			set(command[1], command[2], registers);
		if (command[0] === 'add')
			add(command, registers);
		if (command[0] === 'mul')
			mul(command, registers);
		if (command[0] === 'mod')
			mod(command, registers);
		if (command[0] === 'snd')
			if (registers[command[1]] !== 0)
				lastSoundFrequency = registers[command[1]];
		if (command[0] === 'rcv')
			if (registers[command[1]] !== 0 && lastSoundFrequency !== 0)
				return lastSoundFrequency;
		if (command[0] === 'jgz') {
			var jumpTest = getValue(command[1], registers)
			if (jumpTest > 0) {
				advance = false;
				i += getValue(command[2], registers);;
			}
		}

		if (advance)
			i++;
	}
};

const loopCommandsPart2 = (input) => {

	var programs = {
		'a': {
			registers: { p: 0 }, status: 'running', cache: [], pos: 0, sentCount: 0
		},
		'b': {
			registers: { p: 1 }, status: 'running', cache: [], pos: 0, sentCount: 0
		},

	}

	var command, advance;
	var current = 'a', other = 'b';
	var currentProgram = programs[current];
	var otherProgram = programs[other];

	while (true) {
		if (currentProgram.status === 'running' || (currentProgram.status === 'waiting' && currentProgram.cache.length > 0)) {
			advance = true;
			command = input[currentProgram.pos];
			switch (command[0]) {
				case "set":
			    	set(command[1], command[2], currentProgram.registers);
					break;
				case "add":
					add(command, currentProgram.registers);
					break;
				case "mul":
					mul(command, currentProgram.registers);
					break;
				case "mod":
					mod(command, currentProgram.registers);
					break;
				case "snd":
					otherProgram.cache.push(getValue(command[1], currentProgram.registers));
					currentProgram.sentCount++;
					break;
				case "rcv":
					if (currentProgram.cache.length > 0) {
						var cacheItem = currentProgram.cache.shift();
			    		set(command[1], cacheItem, currentProgram.registers);
						currentProgram.status = 'running';
					} else {
						currentProgram.status = 'waiting';
					}
					break;
				case "jgz":
				    var jumpTest = getValue(command[1], currentProgram.registers)
					if (jumpTest > 0) {
						advance = false;
						currentProgram.pos += getValue(command[2], currentProgram.registers);;
					}
					break;
			}

			if (currentProgram.status === 'running' && advance)
				currentProgram.pos++;

			if (currentProgram.pos < 0 || currentProgram.pos >= input.length)
				currentProgram.status = 'terminated';
		}

		if (currentProgram.status !== 'running') {
			current = (current === 'a' ? 'b' : 'a');
			other = (current === 'a' ? 'b' : 'a');
			currentProgram = programs[current];
			otherProgram = programs[other];
		}

		if (programs['a'].status === 'waiting' && programs['a'].cache.length === 0 &&
			programs['b'].status === 'waiting' && programs['b'].cache.length === 0) {
			break;
		}
		if (programs['a'].status === 'terminated' && programs['b'].status === 'terminated') {
			break;
		}
	}

	return programs['b'].sentCount;
};

const part_one = (raw) => {
	var input = parseInput(raw);
	var result = loopCommandsPart1(input);
	return result;
};

const part_two = (raw) => {
	var input = parseInput(raw);
	var result = loopCommandsPart2(input);
	return result;
};

module.exports = {
	part_one: part_one,
	part_two: part_two
}