var commands;
var cache = [];

const parseInput = (raw) => {
	var parsed = raw
		.trim()
		.replace(/ /g, '')
		.split(/,/);

	for (var i = 0; i < parsed.length; i++) {
		var item = [], places = [];
		if (parsed[i].charAt(0) === 's') {
			item = {
				command: 'spin', places: +parsed[i].substring(1)
			};
		}
		if (parsed[i].charAt(0) === 'x') {
			places = parsed[i].substring(1).split(/\//g);
			item = {
				command: "exchange", from: +places[0], to: +places[1]
			};
		}
		if (parsed[i].charAt(0) === 'p') {
			places = parsed[i].substring(1).split(/\//g);
			item = {
				command: "partner", from: places[0], to: places[1]
			};
		}
		parsed[i] = item;
			
	}

	return parsed;
};

const findProgramIndex = (programs, program) => {
	for (var i = 0; i < programs.length; i++) {
		if (programs[i] === program)
			return i;
	}
	return -1;
}

const doSpin = (programs, places) => {
	var programsToSpin = programs.slice(programs.length - places);
	return programsToSpin.concat(programs).slice(0, programs.length);
};

const doExchange = (programs, from, to) => {
	var place1 = from;
	var place2 = to;

	var temp = programs[place1];
	programs[place1] = programs[place2];
	programs[place2] = temp;
};

const doPartner = (programs, from, to) => {
	var place1 = findProgramIndex(programs, from);
	var place2 = findProgramIndex(programs, to);

	doExchange(programs, place1, place2);
};

const doDance = (programs, commands) => {
	for (var i = 0; i < commands.length; i++) {
		switch (commands[i].command) {
			case 'spin':
				programs = doSpin(programs, commands[i].places);
				break;
			case 'exchange':
				doExchange(programs, commands[i].from, commands[i].to);
				break;
			case 'partner':
				doPartner(programs, commands[i].from, commands[i].to);
				break;
		}
	}

	return programs;
};

const part_one = (numberOfPrograms, raw) => {
	var commands = parseInput(raw);
	var programs = new Array(numberOfPrograms);
	for (var i = 0; i < programs.length; i++) {
		programs[i] = String.fromCharCode(97 + i);
	}

	var result = doDance(programs, commands);
	return result.join('');
};

const part_two = (numberOfPrograms, raw) => {
	var commands = parseInput(raw);
	var programs = new Array(numberOfPrograms);
	for (var i = 0; i < programs.length; i++) {
		programs[i] = String.fromCharCode(97 + i);
	}

	console.time("partTwo");
	var before, after;
	for (var i = 0; i < 1000000000; i++) {
		before = programs.join('');
		if (i % 1000 === 0)
			console.log((i / 1000000000 * 100).toFixed(2));

		programs = doDance(programs, commands);
		after = programs.join('');
		
	}
	console.timeEnd("partTwo");

	return programs.join('');
};

module.exports = {
	part_one: part_one,
	part_two: part_two
}