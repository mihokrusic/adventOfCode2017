console.log("AdventOfCode 2017 - 05");
console.log("----------------------");

var input;

input = `0	2	7	0`;

input = `2	8	8	5	4	2	3	1	5	5	1	2	15	13	5	14`;

function parseInput() {
	var temp = input.trim().replace(/\t/g, "*").split("*");
	temp = temp.map(Number);
	return temp;
}

function getBlockWithMax(blocks) {
	var max = null, indexMax = null;

	for (var i = 0; i < blocks.length; i++) {
		if (indexMax === null || blocks[i] > max) {
			indexMax = i;
			max = blocks[i];
		}
	}
	return [indexMax, max];
}

function hashBlocks(blocks) {
	var hash = '';
	for (var i = 0; i < blocks.length; i++) {
		hash += blocks[i] + "|";
	}
	return hash;
}

function isBlockUnique(history, blockHash) {
	for (var i = 0; i < history.length; i++) {
		if (history[i] === blockHash)
			return i;
	}

	return -1;
}

function solution() {
	var numberOfCycles = 0;
	var blocks = parseInput();
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

	console.log("Part 1: " + numberOfCycles);
	console.log("Part 2: " + (numberOfCycles - isUnique));
}

solution();