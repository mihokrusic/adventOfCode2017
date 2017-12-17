var day10 = require('./10.js');

const hex2bin = (hex) => {
    return ("00000000" + (parseInt(hex, 16)).toString(2)).substr(-4);
};

const removeRegion = (grid, x, y) => {
	if (grid[x][y] === '2')
		return;

	grid[x] = grid[x].substr(0, y) + "2" + grid[x].substr(y + 1);

	if (x !== 0 && grid[x-1][y] === "1")
		removeRegion(grid, x-1, y);
	
	if (x !== (grid.length - 1) && grid[x+1][y] === "1")
		removeRegion(grid, x+1, y);

	if (y !== 0 && grid[x][y-1] === "1")
		removeRegion(grid, x, y-1);

	if (y !== (grid.length - 1) && grid[x][y+1] === "1")
		removeRegion(grid, x, y+1);
};

const getNumberOfRegions = (grid) => {
	var regions = 0;
	for (var i = 0; i < grid.length; i++) {
		for (var j = 0; j < grid.length; j++) {
			if (grid[i][j] === "1")  {
				regions++;
				removeRegion(grid, i, j);
			}
		}
	}
    return regions;
};

const solution = (part1, raw) => {
	var usedSquares = 0, numberOfRegions = 0;
	var rowString, knotHash, bits;

	var grid = [];
	for (var i = 0; i < 128; i++) {
		rowString = raw + "-" + i;
		knotHash = day10.part_two(rowString);
		bits = '';
		for (var j = 0; j < knotHash.length; j++) {
		 	bits += hex2bin(knotHash[j]);
		}
		grid.push(bits);
		usedSquares += bits.match(/1/g).length;
	}

	if (!part1) {
		numberOfRegions = getNumberOfRegions(grid);
	}

	return (part1 ? usedSquares : numberOfRegions);
};

const part_one = (raw) => solution(true, raw);
const part_two = (raw) => solution(false, raw);

module.exports = {
	part_one: part_one,
	part_two: part_two
}