const _ = require("lodash");

const parseInput = (input) => {
	return input
		.trim()
		.replace(/\t/g, '')
		.replace(/ \(/g, '|')
		.replace(/\)/g, '')
		.replace(/ -> /g, '|')
		.replace(/, /g, '|')
		.split(/\n/)
		.map((item) => item.split('|'));
}

const getParent = (trunks, child) => {
	for (var i = 0; i < trunks.length; i++) {
		if (trunks[i].children.indexOf(child) > -1)
			return getParent(trunks, trunks[i].name);
	}
	return child;
}

const solution = (part1, input) => {
	var head = '';
	var parsed = parseInput(input);

	var objects = [], object;
	for (var i = 0; i < parsed.length; i++) {
		object = {
			name: parsed[i][0],
			weight: +parsed[i][1],
			children: []
		}
		if (parsed[i].length > 2) {
			for (var j = 2; j < parsed[i].length; j++) {
				object.children.push(parsed[i][j]);
			}
		}
		objects.push(object);
	}

	var trunks = _.filter(objects, (obj) => obj.children.length > 0);

	var head = getParent(trunks, trunks[0].name);
	return head;
}

const part_one = (input) => solution(true, input);
const part_two = (input) => solution(false, input);

module.exports = {
	part_one: part_one,
	part_two: part_two
}