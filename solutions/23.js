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

const set = (command, registers) => {
	registers[command[1]] = getValue(command[2], registers);
};

const sub = (command, registers) => {
	var currentValue = (registers[command[1]] || 0);
	registers[command[1]] = currentValue - getValue(command[2], registers);
};

const mul = (command, registers) => {
	var currentValue = (registers[command[1]] || 0);
	registers[command[1]] = currentValue * getValue(command[2], registers);
};

const part_one = (raw) => {
	var input = parseInput(raw);
	var registers = { a:0, b:0, c:0, d:0, e:0, f:0, g:0, h:0 }, i = 0;
	var mulUsed = 0;

	var command, advance;
	while (i < input.length) {
		command = input[i];
		advance = true;

		if (command[0] === 'set')
			set(command, registers);
		if (command[0] === 'sub')
			sub(command, registers);
		if (command[0] === 'mul') {
			mulUsed++;
			mul(command, registers);
		}
		if (command[0] === 'jnz') {
			var jumpTest = getValue(command[1], registers)
			if (jumpTest !== 0) {
				advance = false;
				i += getValue(command[2], registers);;
			}
		}

		if (advance)
			i++;
	}

	return mulUsed;
};

const isPrime = (num) => {
  for (let i = 2; i < num; i++)
    if (num % i === 0)
    	return false;

  return (num !== 1);
}

const part_two = (raw) => {
	var b = 108400;
	var i = 0, h = 0;
	while (i < 1001) {
		if (!isPrime(b))
			h++;

		b += 17;
		i++;
	}
	return h;
};

module.exports = {
	part_one: part_one,
	part_two: part_two
}