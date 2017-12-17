var commands;

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

const getPrograms = (numberOfPrograms) => {
	var programs = new Array(numberOfPrograms);
	for (var i = 0; i < programs.length; i++) {
		programs[i] = String.fromCharCode(97 + i);
	}
	return programs;
};

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
				var from = programs.indexOf(commands[i].from);
				var to = programs.indexOf(commands[i].to);
				doExchange(programs, from, to);
				break;
		}
	}

	return programs;
};

const part_one = (numberOfPrograms, raw) => {
	var commands = parseInput(raw);
	var programs = getPrograms(numberOfPrograms);

	var result = doDance(programs, commands);
	return result.join('');
};

const part_two = (numberOfPrograms, raw) => {

	var cacheBefore = [],
		cacheAfter = [],
		commands = parseInput(raw),
		programs = getPrograms(numberOfPrograms),
		iterations = 1000000000;

	for (var i = 0; i < iterations; i++) {

		before = programs.join('');
		var cacheIx = cacheBefore.indexOf(before)
		if (cacheIx !== -1) {

			var group = i - cacheIx;
			var remainder = (iterations - 1) - i;
			var finalPosition = cacheIx + (remainder % group);

			programs = cacheAfter[finalPosition].split('');
			break;
		}
		
		programs = doDance(programs, commands);
		cacheBefore.push(before);
		cacheAfter.push(programs.join(''));
	}

	return programs.join('');
};

module.exports = {
	part_one: part_one,
	part_two: part_two
}