const parseInput = (input) => {
	return input.trim().replace(/ /g, '').split(',');
};


const movement = {
	n:  { x: 1,  y: 1  },
	ne: { x: 1,  y: 0  },
	se: { x: 0,  y: -1 },
	s:  { x: -1, y: -1 },
	sw: { x: -1, y: 0  },
	nw: { x: 0,  y: 1  },

}


const part_one = (input) => {	
	var parsed = parseInput(input);
	var pos = { x: 0, y: 0 }

	for (var i = 0; i < parsed.length; i++) {
		var move = movement[parsed[i]];
		pos.x += move.x;
		pos.y += move.y;
	}
	//console.log(parsed);
	console.log(pos);

	return 0;
};


const part_two = (input) => {
};

module.exports = {
	part_one: part_one,
	part_two: part_two
}