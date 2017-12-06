const assert = require('assert');

const day03 = require('../solutions/03.js')

describe('Day 3', () => {

	describe('Part 1', () => {
		it('8 is 1 step away', 			() => assert.equal(1, day03.part_one(8)));
		it('9 is 2 steps away', 		() => assert.equal(2, day03.part_one(9)));
		it('12 is 3 steps away', 		() => assert.equal(3, day03.part_one(12)));
		it('13 is 2 steps away', 		() => assert.equal(4, day03.part_one(13)));
		it('23 is 2 steps away',		() => assert.equal(2, day03.part_one(23)));
		it('1024 is 31 steps away', 	() => assert.equal(31, day03.part_one(1024)));
		it('368078 is 371 steps away', 	() => assert.equal(371, day03.part_one(368078)));
	});

	describe('Part 2', () => {
		it('3rd square has value 2',	() => assert.equal(2, day03.part_two(3)));
		it('7th square has value 11', 	() => assert.equal(11, day03.part_two(7)));
		it('12th square has value 57',	() => assert.equal(57, day03.part_two(12)));
		it('18th square has value 304', () => assert.equal(304, day03.part_two(18)));
		it('23th square has value 806', () => assert.equal(806, day03.part_two(23)));
	});
});

