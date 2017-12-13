const assert = require('assert');

const day13 = require('../solutions/13.js');

describe('Day 13', () => {

	var sample = `
		0: 3
		1: 2
		4: 4
		6: 4
	`;

	var test = `
		0: 3
		1: 2
		2: 4
		4: 6
		6: 5
		8: 8
		10: 6
		12: 4
		14: 8
		16: 6
		18: 8
		20: 8
		22: 6
		24: 8
		26: 9
		28: 12
		30: 8
		32: 14
		34: 10
		36: 12
		38: 12
		40: 10
		42: 12
		44: 12
		46: 12
		48: 12
		50: 14
		52: 12
		54: 14
		56: 12
		60: 14
		62: 12
		64: 14
		66: 14
		68: 14
		70: 14
		72: 14
		74: 14
		78: 26
		80: 18
		82: 17
		86: 18
		88: 14
		96: 18
	`;

	describe('Part 1', () => {
		it('sample', 	() => assert.equal(24, day13.part_one(sample)));
		it('test', 		() => assert.equal(748, day13.part_one(test)));
	});

	describe('Part 2', () => {
		it('sample', 	() => assert.equal(10, day13.part_two(sample)));
		it('test', 		() => assert.equal(3873662, day13.part_two(test)));
	});
});