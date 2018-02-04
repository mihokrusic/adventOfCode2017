const parseInput = (raw) => {
	var parsed = raw
		.trim()
		.split(/\n/g)
		.map((item) => item.trim().split("/").map((item) => +item));

	for (let item of parsed) {
		if (item[0] > item[1]) {
			var temp = item[1];
			item[1] = item[0];
			item[0] = temp;
		}
	}

	return parsed;
};

const getKey = (port) => {
	return port[0] + '|' + port[1];
};

const compatiblePorts = (port, bridge) => {
	return (port[0] === bridge.output) || (port[1] === bridge.output);
};

const getBridges = (ports, bridge) => {
	for (let port of ports) {
		if (compatiblePorts(port, bridge) && bridge.visited.indexOf(getKey(port)) === -1) {
			var visited = bridge.visited.slice(0);
			visited.push(getKey(port));
			bridge.children.push({
				input: bridge.output,
				output: (port[0] === bridge.output ? port[1] : port[0]),
				visited: visited,
				strength: bridge.strength + port[0] + port[1],
				children: []
			});
			getBridges(ports, bridge.children[bridge.children.length - 1]);
		}
	}
};

var strongest, length;
const getStrongest = (bridge, strength) => {
	for (let child of bridge.children) {
		if (child.strength > strongest)
			strongest = child.strength;
		getStrongest(child);
	}
};

const getStrengthOfLongestBridge = (bridge, strength) => {
	for (let child of bridge.children) {
		if (child.visited.length >= length) {
			length = child.visited.length;
			strongest = (child.strength > strongest ? child.strength : strongest);
		}
		getStrengthOfLongestBridge(child);
	}
};

const part_one = (raw) => {
	var ports = parseInput(raw);
	var bridges = [];

	for (let port of ports) {
		if (port[0] === 0) bridges.push({
			input: port[0],
			output: port[1],
			visited: [getKey(port)],
			strength: port[0] + port[1],
			children: []
		});
	}
	ports = ports.filter(function(port) {
	    return port[0] !== 0 && port[1] !== 0;
	});

	for (let bridge of bridges) {
		getBridges(ports, bridge)
	}

	strongest = 0;
	for (let bridge of bridges) {
		if (bridge.strength > strongest)
			strongest = bridge.strength;
		getStrongest(bridge, strongest)
	}

	return strongest;
};

const part_two = (raw) => {
	var ports = parseInput(raw);
	var bridges = [];

	for (let port of ports) {
		if (port[0] === 0) bridges.push({
			input: port[0],
			output: port[1],
			visited: [getKey(port)],
			strength: port[0] + port[1],
			children: []
		});
	}
	ports = ports.filter(function(port) {
	    return port[0] !== 0 && port[1] !== 0;
	});

	for (let bridge of bridges) {
		getBridges(ports, bridge)
	}

	strongest = 0, length = 0;
	for (let bridge of bridges) {
		getStrengthOfLongestBridge(bridge, strongest)
	}

	return strongest;
};

module.exports = {
	part_one: part_one,
	part_two: part_two
}