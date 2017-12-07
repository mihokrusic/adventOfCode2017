const parseInput = (input) => {
	var parsed = input
		.trim()
		.replace(/\t/g, '')
		.replace(/ \(/g, '|')
		.replace(/\)/g, '')
		.replace(/ -> /g, '|')
		.replace(/, /g, '|')
		.split(/\n/)
		.map((item) => item.split('|'));

	var objects = [], object;
	for (var i = 0; i < parsed.length; i++) {
		object = {
			name: parsed[i][0],
			weight: +parsed[i][1],
			children: [],
			childrenWeights: [],
			totalChildrenWeights: 0
		}
		if (parsed[i].length > 2) {
			for (var j = 2; j < parsed[i].length; j++) {
				object.children.push(parsed[i][j]);
			}
		}
		objects.push(object);
	}
	return objects;
};

const getHead = (objects, currentIx) => {
	for (var i = 0; i < objects.length; i++) {
		if (objects[i].children.indexOf(objects[currentIx].name) > -1)
			return getHead(objects, i);
	}
	return currentIx;
};

const getByName = (objects, name) => {
	for (var i = 0; i < objects.length; i++) {
		if (objects[i].name === name) {
			return i;
		}
	}
	return -1
};

const calculateWeights = (objects, currentIx) => {
	var object = objects[currentIx];
	if (object.children.length === 0)
		return object.weight;

	var total = 0;
	for (var i = 0; i < object.children.length; i++) {
		var childObjectIx = getByName(objects, object.children[i]);
		object.childrenWeights[i] = calculateWeights(objects, childObjectIx);
		total += object.childrenWeights[i];
	}
	object.totalChildrenWeights = total;

	if (total % object.childrenWeights[0] !== 0) {
	}

	return total + object.weight;
};

const getUnbalancedNode = (objects, currentIx) => {
	var object = objects[currentIx];
	if (object.children.length === 0)
		return true;

	if (object.totalChildrenWeights % object.childrenWeights[0] !== 0) {
		console.log(object.name, object.children);
		console.log(object.name, object.childrenWeights);
	}

	for (var i = 0; i < object.children.length; i++) {
		var childObjectIx = getByName(objects, object.children[i]);
		if (!getUnbalancedNode(objects, childObjectIx))
			return false;
	}

	return true;
}

const part_one = (input) => {
	var head = '';
	var objects = parseInput(input);
	var head = objects[getHead(objects, 0)].name;
	return head;
};

const part_two = (input) => {
	var head = '';
	var objects = parseInput(input);
	var headIx = getHead(objects, 0);

	calculateWeights(objects, headIx);
	getUnbalancedNode(objects, headIx);

	return head;
};

module.exports = {
	part_one: part_one,
	part_two: part_two
}