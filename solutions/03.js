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
}

const part_two = (input) => {
	var steps = 0;

	var ringIx = 0, ringStart = 0, ringEnd = 1, ringSide = 1, distanceToMiddle = 0;
	var values = [], newValues = [];

	var curr = 0;
	var currentValue = 0;
	while (currentValue < input) {
		curr++;
		if (curr > ringEnd) {
			ringIx++;
			ringSide = (2 * ringIx) + 1;
			ringStart = curr;
			ringEnd = Math.pow(ringSide, 2);
			distanceToMiddle = Math.floor(ringSide / 2);

			values = newValues;
			newValues = [];
			//console.log(values);
		}

		if (curr === 1)
			newValues.push(1);

		var str = '';
		if (curr === ringEnd - 3*(ringSide - 1)) {
			str = ' gore desno'
		} else if (curr === ringEnd - 2*(ringSide - 1)) {
			str = ' gore lijevo'
		} else if (curr === ringEnd - (ringSide - 1)) {
			str = ' dolje lijevo'
		} else if (curr === ringEnd) {
			str = ' dolje desno'
		}

		console.log(curr + str);

		currentValue++;
	}

	return steps;
}

module.exports = {
	part_one: part_one,
	part_two: part_two
}