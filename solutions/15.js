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
			var jumpTest = getValue(command[1], programs[currentProgram].registers)
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
			registers: { p: 0 },
			status: 'running',
			cache: [],
			pos: 0,
			sentCount: 0
		},
		'b': {
			registers: { p: 1 },
			status: 'running',
			cache: [],
			pos: 0,
			sentCount: 0
		},

	}

	var command, advance;
	var currentProgram = 'a', otherProgram = 'b';

	while (true) {
		if (programs[currentProgram].status === 'running' || (programs[currentProgram].status === 'waiting' && programs[currentProgram].cache.length > 0)) {
			advance = true;
			command = input[programs[currentProgram].pos];
			switch (command[0]) {
				case "set":
			    	set(command[1], command[2], programs[currentProgram].registers);
					break;
				case "add":
					add(command, programs[currentProgram].registers);
					break;
				case "mul":
					mul(command, programs[currentProgram].registers);
					break;
				case "mod":
					mod(command, programs[currentProgram].registers);
					break;
				case "snd":
					programs[otherProgram].cache.push(getValue(command[1], programs[currentProgram].registers));
					programs[currentProgram].sentCount++;
					break;
				case "rcv":
					if (programs[currentProgram].cache.length > 0) {
						var cacheItem = programs[currentProgram].cache.shift();
			    		set(command[1], cacheItem, programs[currentProgram].registers);
						programs[currentProgram].status = 'running';
					} else {
						programs[currentProgram].status = 'waiting';
					}
					break;
				case "jgz":
				    var jumpTest = getValue(command[1], programs[currentProgram].registers)
					if (jumpTest > 0) {
						advance = false;
						programs[currentProgram].pos += getValue(command[2], programs[currentProgram].registers);;
					}
					break;
			}

			if (programs[currentProgram].status === 'running' && advance)
				programs[currentProgram].pos++;

			if (programs[currentProgram].pos < 0 || programs[currentProgram].pos >= input.length)
				programs[currentProgram].status = 'terminated';
		}

		if (programs[currentProgram].status !== 'running') {
			currentProgram = (currentProgram === 'a' ? 'b' : 'a');
			otherProgram = (currentProgram === 'a' ? 'b' : 'a');
		}

		if (programs['a'].status === 'waiting' && programs['a'].cache.length === 0 &&
			programs['b'].status === 'waiting' && programs['b'].cache.length === 0) {
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