var input;

const parseInput = (raw) => {
	var parsed = raw
		.trim()
		.replace(/ /g, '')
		.replace(/<->/g, '|')
		.replace(/,/g, '|')
		.split(/\n/)
		.map((item) => item.split('|').map(Number));

	return parsed;
};

const getProgramFromInput = (id) => {
	for (var i = 0; i < input.length; i++) {
		if (input[i][0] === id)
			return input[i];
	}

	return false;
};

const generateProgramTree = (current, visitedPrograms) => {
	var visited = current.visited.slice(0);
	visited.push(current.id);

	var program = getProgramFromInput(current.id);
	program = program.filter((elem, index) => visited.indexOf(elem) === -1);

	if (visitedPrograms && visitedPrograms.indexOf(current.id))
		visitedPrograms.push(current.id);

	for (var i = 0; i < program.length; i++) {
		current.children.push({
			id: program[i],
			children: [],
			visited: visited
		});
		generateProgramTree(current.children[i], visitedPrograms);
	}
};

const getUniquePrograms = (current, uniquePrograms) => {

	if (uniquePrograms.indexOf(current.id) === -1)
		uniquePrograms.push(current.id);

	for (var i = 0; i < current.children.length; i++) {
		if (uniquePrograms.indexOf(current.children[i].id) === -1)
			uniquePrograms.push(current.children[i].id);
		getUniquePrograms(current.children[i], uniquePrograms);
	}
};

const part_one = (raw) => {
	var numberOfPrograms = 0;
	input = parseInput(raw);

	var programs = { id: 0, children: [], visited: [] }

	generateProgramTree(programs);

	var uniquePrograms = [];
	getUniquePrograms(programs, uniquePrograms);

	return uniquePrograms.length;
};

const part_two = (raw) => {
	var numberOfPrograms = 0;
	input = parseInput(raw);

	var groups = [];
	var visitedPrograms = [];

	var programsInput = input.slice(0).filter((elem) => (visitedPrograms.indexOf(elem[0]) === -1));
	while (programsInput.length > 0) {
		groups.push({
			id: programsInput[0][0],
			children: [],
			visited: []
		});

		generateProgramTree(groups[groups.length - 1], visitedPrograms);

		programsInput = input.slice(0).filter((elem) => (visitedPrograms.indexOf(elem[0]) === -1));
	}

	return groups.length;
};

module.exports = {
	part_one: part_one,
	part_two: part_two
}