const parseInput = (input) => {
	var temp = input.trim().replace(/\n/g, "*").split("*");
	for (var i = 0; i < temp.length; i++) {
		temp[i] = temp[i].trim().split(" ");
	}
	return temp;
}

const hasWordAlready = (words, word) => {
	if (words.length === 0)
		return false;

	for (var k = 0; k < words.length; k++) {
		if (words[k] === word) {
			return true;
		}
	}

	return false;
};

const sortWord = (word) => {
	return word.split('').sort().join('');
}

const solution = (part1, input) => {
	var validPhrases = 0;
	var parsed = parseInput(input);
	var words, currentValid;
	for (var i = 0; i < parsed.length; i++) {

		if (parsed[i].length === 1) {
			validPhrases++;
			continue;
		}

		words = [];
		currentValid = true;

		for (var j = 0; j < parsed[i].length; j++) {
			var word = (part1 ? parsed[i][j] : sortWord(parsed[i][j]));
			if (hasWordAlready(words, word)) {
				currentValid = false;
				break;
			}
			words.push(word);
		}
		if (currentValid)
			validPhrases++;
	}
	return validPhrases;
}

const part_one = (input) => solution(true, input);
const part_two = (input) => solution(false, input);

module.exports = {
	part_one: part_one,
	part_two: part_two
}