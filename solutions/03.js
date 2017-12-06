const part_one = (input) => {
	var steps = 0;
	var groupExp = 0, groupIx = 0, groupN;
	while (groupExp < input) {
		groupIx++;
		groupN = 2*groupIx + 1;
		groupExp = Math.pow(groupN, 2);
	}

	var distanceToMiddle = Math.floor(groupN / 2);
	var middle;
	if (input >= groupExp - groupN + 1) {
		middle = groupExp - distanceToMiddle;
	} else if (input >= groupExp - groupN*2 + 2) {
		middle = (groupExp - groupN + 1) - distanceToMiddle;
	} else if (input >= groupExp - groupN*3 + 3) {
		middle = (groupExp - groupN*2 + 2) - distanceToMiddle;
	} else if (input >= groupExp - groupN*3) {
		middle = (groupExp - groupN*3 + 3) - distanceToMiddle;
	}
	steps = Math.abs(input - middle) + groupIx;

	return steps;
};

const getSum = (currentPos, spiral) => {
	var sum = 0;
	for (var i = -1; i < 2; i++) {
		for (var j = -1; j < 2; j++) {
			if (currentPos.x + i > 0 && 
				currentPos.x + i < spiral.length &&
				currentPos.y + j > 0 &&
				currentPos.y + i < spiral.length)
				sum+=spiral[currentPos.x+i][currentPos.y+j];
		}
	}
	return sum;
};

const part_two = (input) => {
	var steps = 0;
	var spiralDims = 70; // Really, not good
	var spiralCenter = Math.floor(spiralDims / 2);

	var spiral = new Array(spiralDims);
	for (var i = 0; i < spiralDims; i++)
		spiral[i] = new Array(spiralDims).fill(0);

	var currentPos = { x: spiralCenter, y: spiralCenter };
	var movement = { x: 1, y: 0 };
	var currentSquare = 1,
		ring = 0, 
		ringSide = (2 * ring + 1), 
		ringMax = Math.pow(ringSide, 2),
		lastSum = 0;

	// init center value and loop until we find a sum larger than input
	spiral[currentPos.x][currentPos.y] = 1;
	while (lastSum < input) {
		if (currentSquare !== 1) 
			spiral[currentPos.x][currentPos.y] = getSum(currentPos, spiral);
		lastSum = spiral[currentPos.x][currentPos.y];

		// move cursor
		currentPos.x += movement.x;
		currentPos.y += movement.y;

		// if new ring
		currentSquare++;
		if (currentSquare > ringMax) {
			movement = { x: 0, y: 1 };
			ring++;
			ringSide = (2 * ring + 1); 
			ringMax = Math.pow(ringSide, 2);
		}

		// if we are on a corner
		if (currentSquare === ringMax - 3 * (ringSide - 1)) {
			movement = { x: -1, y: 0 };
		} else if (currentSquare === ringMax - 2 * (ringSide - 1)) {
			movement = { x: 0, y: -1 };
		} else if (currentSquare === ringMax - (ringSide - 1)) {
			movement = { x: 1, y: 0 };
		}
	}

	return lastSum;
};

module.exports = {
	part_one: part_one,
	part_two: part_two
}