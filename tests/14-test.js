const assert = require('assert');

const day14 = require('../solutions/14.js');

describe('Day 14', () => {

	describe('Part 1', () => {
		it('flqrgnkx', 	() => assert.equal(8108, day14.part_one('flqrgnkx')));
		it('amgozmfv', 	() => assert.equal(8222, day14.part_one('amgozmfv')));
	});

	describe('Part 2', () => {
		it('flqrgnkx', 	() => assert.equal(1242, day14.part_two('flqrgnkx')));
		it('amgozmfv', 	() => assert.equal(1086, day14.part_two('amgozmfv')));
	});
});