const parseInput = (input) => {
	return input.trim().split(/\t/).map(Number);
}

const getBlockWithMax = (blocks) => {
	var max = null, indexMax = null;

	for (var i = 0; i < blocks.length; i++) {
		if (indexMax === null || blocks[i] > max) {
			indexMax = i;
			max = blocks[i];
		}
	}
	return [indexMax, max];
}

const hashBlocks = (blocks) => {
	var hash = '';
	for (var i = 0; i < blocks.length; i++) {
		hash += blocks[i] + "|";
	}
	return hash;
}

const isBlockUnique = (history, blockHash) => {
	for (var i = 0; i < history.length; i++) {
		if (history[i] === blockHash)
			return i;
	}

	return -1;
}

const solution = (part1, input) => {
	var numberOfCycles = 0;
	var blocks = parseInput(input);
	var history = [];
	history.push(hashBlocks(blocks));
	while (true) {
		numberOfCycles++;

		var max = getBlockWithMax(blocks);

		var pos = max[0];
		blocks[pos] = 0;
		while (max[1] > 0) {
			pos++;
			if (pos === blocks.length)
				pos = 0;

			blocks[pos]++;
			max[1]--;
		}

		var blockHash = hashBlocks(blocks);
		var isUnique = isBlockUnique(history, blockHash);
		if (isUnique !== -1)
			break;
		history.push(hashBlocks(blocks));
	}

	if (part1)
		return numberOfCycles
	else
		return (numberOfCycles - isUnique);
}

const part_one = (input) => solution(true, input);
const part_two = (input) => solution(false, input);

module.exports = {
	part_one: part_one,
	part_two: part_two
}