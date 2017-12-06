const assert = require('assert');

const day01 = require('../solutions/01.js')

describe('Day 1', () => {

	describe('Part 1', () => {
		it('should properly calculate 1122', 		() => assert.equal(3, day01.part_one('1122')));
		it('should properly calculate 1111', 		() => assert.equal(4, day01.part_one('1111')));
		it('should properly calculate 1234', 		() => assert.equal(0, day01.part_one('1234')));
		it('should properly calculate 91212129', 	() => assert.equal(9, day01.part_one('91212129')));
	});

	describe('Part 2', () => {
		it('should properly calculate 1212', 		() => assert.equal(6, day01.part_two('1212')));
		it('should properly calculate 1221',		() => assert.equal(0, day01.part_two('1221')));
		it('should properly calculate 123425', 		() => assert.equal(4, day01.part_two('123425')));
		it('should properly calculate 123123', 		() => assert.equal(12, day01.part_two('123123')));
		it('should properly calculate 12131415', 	() => assert.equal(4, day01.part_two('12131415')));
	});
});