var input;

const parseInput = (raw) => {
	return raw.trim().replace(/ /g, '').split(',');
};

const movement = {
	n:  { x: 0,  y: 1, z: -1 },	s:  { x: 0,  y: -1, z: 1 },
	ne: { x: 1,  y: 0, z: -1 },	sw: { x: -1,  y: 0, z: 1 },
	se: { x: 1,  y: -1, z: 0 },	nw: { x: -1,  y: 1, z: 0 },
};

const solution = (part1, raw) => {
	input = parseInput(raw);
	var pos = { x: 0, y: 0, z: 0 }

	var maxDistance = 0, distance;
	for (var i = 0; i < input.length; i++) {
		var move = movement[input[i]];
		pos.x += move.x; pos.y += move.y; pos.z += move.z;

		distance = ((Math.abs(pos.x) + Math.abs(pos.y) + Math.abs(pos.z)) / 2);
		if (distance > maxDistance) maxDistance = distance;
	}

	return (part1 ? distance : maxDistance);
};

const part_one = (raw) => solution(true, raw);
const part_two = (raw) => solution(false, raw);

module.exports = {
	part_one: part_one,
	part_two: part_two
}