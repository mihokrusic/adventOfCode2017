const part_one = (steps, loops) => {
	var states = [0];
	var newPosition;
	var value = 1, currentPos = 0;
	for (var i = 0; i < loops; i++) {
		var steps2 = steps % states.length;
		var newPosition = (currentPos + steps2) % states.length;
		if (newPosition === states.length) {
			states.push(value);
			currentPos = states.length - 1;
		} else {
			states.splice(newPosition + 1, 0, value);
			currentPos = newPosition + 1;
		}

		value++;
	}

	return states[(newPosition + 2) % states.length];
};

const part_two = (steps, loops) => {
	var afterZero = 0;
	var numberOfElements = 1;
	var currentPos = 0, newPosition = 0;
	for (var i = 0; i < loops; i++) {
		var steps2 = steps % numberOfElements;
		newPosition = (currentPos + steps2) % numberOfElements;
		
		if (newPosition === numberOfElements) {
			currentPos = numberOfElements;
		} else {
			currentPos = newPosition + 1;
		}		
		numberOfElements++;

		if (currentPos === 1)
			afterZero = i + 1;
	}

	return afterZero;
};

module.exports = {
	part_one: part_one,
	part_two: part_two
}