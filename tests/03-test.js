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
		it('First value larger than 120 is 122',	() => assert.equal(122, day03.part_two(120)));
		it('First value larger than 300 is 304',	() => assert.equal(304, day03.part_two(304)));
		it('First value larger than 400 is 747',	() => assert.equal(747, day03.part_two(400)));
		it('First value larger than 368078 is ??',	() => assert.equal(0, day03.part_two(368078)));
	});
});

