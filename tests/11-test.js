const assert = require('assert');

const day11 = require('../solutions/11.js');

describe('Day 11', () => {
	describe('Part 1', () => {
		it('ne,ne,ne', 			() => assert.equal(3, day11.part_one('ne,ne,ne')));
		it('ne,ne,sw,sw', 		() => assert.equal(0, day11.part_one('ne,ne,sw,sw')));
		it('ne,ne,s,s', 		() => assert.equal(2, day11.part_one('ne,ne,s,s')));
		it('se,sw,se,sw,sw', 	() => assert.equal(3, day11.part_one('se,sw,se,sw,sw')));
	});

	describe('Part 2', () => {
	});
});