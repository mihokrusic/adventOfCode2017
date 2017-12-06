const assert = require('assert');

const day06 = require('../solutions/06.js');

describe('Day 6', () => {
	describe('Part 1', () => {
		it('sample input', 	() => assert.equal(5, day06.part_one('0	2	7	0')));
		it('test input', 	() => assert.equal(3156, day06.part_one('2	8	8	5	4	2	3	1	5	5	1	2	15	13	5	14')));
	});

	describe('Part 2', () => {
		it('sample input', 	() => assert.equal(4, day06.part_two('0	2	7	0')));
		it('test input', 	() => assert.equal(1610, day06.part_two('2	8	8	5	4	2	3	1	5	5	1	2	15	13	5	14')));
	});
});