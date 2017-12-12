const parseInput = (input) => {
	var parsed = input
		.trim()
		.replace(/ /g, '')
		.replace(/<->/g, '|')
		.replace(/,/g, '|')
		.split(/\n/)
		.map((item) => item.split('|').map(Number));

	return parsed;
};

const getProgramFromInput = (id, input) => {
	for (var i = 0; i < input.length; i++) {
		if (input[i][0] === id)
			return input[i];
	}

	return false;
};

const generateProgramTree = (current, input) => {
	var visited = current.visited.slice(0);
	visited.push(current.id);

	var program = getProgramFromInput(current.id, input);
	program = program.filter((elem, index) => visited.indexOf(elem) === -1);

	for (var i = 0; i < program.length; i++) {
		current.children.push({
			id: program[i],
			children: [],
			visited: visited
		});
		generateProgramTree(current.children[i], input);
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

const part_one = (input) => {
	var numberOfPrograms = 0;
	var parsedInput = parseInput(input);

	var programs = { id: 0, children: [], visited: [] }

	generateProgramTree(programs, parsedInput);

	var uniquePrograms = [];
	getUniquePrograms(programs, uniquePrograms);

	return uniquePrograms.length;
};

const part_two = (input) => {
	var numberOfPrograms = 0;
	var parsedInput = parseInput(input);	

	var groups = [{ id: 0, children: [], visited: [] }];
	var visitedPrograms = [];

	

	return 0;
};

module.exports = {
	part_one: part_one,
	part_two: part_two
}