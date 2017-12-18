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
		if (command[0] === 'jgz')
			if (registers[command[1]] !== 0) {
				advance = false;
				i += getValue(command[2], registers);;
			}

		if (advance)
			i++;
	}
};

const doProgram = (input, registers, status, queue, otherQueue, pos, sentCount) => {
	if (status === 'running' || (status === 'waiting' && queue.length > 0)) {
		advance = true;
		command = input[pos];
		console.log('A', command, status, pos);
		switch (command[0]) {
			case "set":
		    	set(command[1], command[2], registers);
				break;
			case "add":
				add(command, registers);
				break;
			case "mul":
				mul(command, registers);
				break;
			case "mod":
				mod(command, registers);
				break;
			case "snd":
				otherQueue.push(getValue(command[1], registers));
				sentCount++;
				break;
			case "rcv":
				if (queue.length > 0) {
					var cacheItem = queue.shift();
		    		set(command[1], cacheItem, registers);
					status = 'running';
				} else {
					status = 'waiting';
				}
				break;
			case "jgz":
				if (registers[command[1]] !== 0) {
					advance = false;
					pos += getValue(command[2], registers);;
				}
				break;
		}

		if (status === 'running' && advance)
			pos++;

		if (pos < 0 || pos >= input.length)
			status = 'terminated';

		console.log(pos, status, input.length);
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
	var currentProgram = 'a';

	while (programs['a'].status !== 'terminated' || programs['b'].status !== 'terminated') {

		if (programs[currentProgram].status !== 'running') {
			currentProgram = (currentProgram === 'a' ? 'b' : 'a');
		}

		// Do A
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
					programs['b'].cache.push(getValue(command[1], programs[currentProgram].registers));
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
					if (programs[currentProgram].registers[command[1]] !== 0) {
						advance = false;
						programs[currentProgram].pos += getValue(command[2], programs[currentProgram].registers);;
					}
					break;
			}

			if (programs[currentProgram].status === 'running' && advance)
				programs[currentProgram].pos++;

			if (programs[currentProgram].pos < 0 || programs[currentProgram].pos >= input.length)
				programs[currentProgram].status = 'terminated';

			console.log(currentProgram, programs[currentProgram].status, programs[currentProgram].pos, command);
		}

		if (['waiting', 'terminated'].indexOf(programs['a'].status) > -1 && ['waiting', 'terminated'].indexOf(programs['b'].status) > -1) {
			programs['a'].status = 'terminated';
			programs['b'].status = 'terminated';
		}
	}

	return programs['a'].sentCount;
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