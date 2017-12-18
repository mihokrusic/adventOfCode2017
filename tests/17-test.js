const assert = require('assert');

const day17 = require('../solutions/17.js');

describe('Day 17', () => {

	describe('Part 1', () => {
		it('sample', 	() => assert.equal(638, day17.part_one(3, 2017)));
		it('test', 		() => assert.equal(1914, day17.part_one(343, 2017)));
	});

	describe('Part 2', () => {
		it('test', 		() => assert.equal(41797835, day17.part_two(343, 50000000)));
	});
});