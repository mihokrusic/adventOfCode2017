const part_one = (input) => {
	var score = 0;

	var parsed = input.split('');

	var groups = [];
	var isGarbage = false;
	var escaping = false;
	for (var i = 0; i < parsed.length; i++) {
		var char = parsed[i];

		if (char === '!') {
			escaping = !escaping;
			continue;
		}

		if (isGarbage && char === '>' && !escaping) {
			isGarbage = false;
			continue;
		}

		if (!isGarbage) {
			switch (char) {
				case '<':
					isGarbage = true;
					continue;
				case '{':
					groups.push('{');
					break;
				case '}':
					score += groups.length;
					groups.pop();
					break;
			}
		}
		escaping = false;
	}

	return score;
};


const part_two = (input) => {
	var garbageCount = 0;

	var parsed = input.split('');

	var groups = [];
	var isGarbage = false;
	var escaping = false;
	for (var i = 0; i < parsed.length; i++) {
		var char = parsed[i];

		if (char === '!') {
			escaping = !escaping;
			continue;
		}

		if (!isGarbage && char === '<') {
			isGarbage = true;
			continue;
		}

		if (isGarbage && char === '>' && !escaping) {
			isGarbage = false;
			continue;
		}

		if (isGarbage && !escaping)
			garbageCount++;
		escaping = false;
	}

	return garbageCount;
};

module.exports = {
	part_one: part_one,
	part_two: part_two
}