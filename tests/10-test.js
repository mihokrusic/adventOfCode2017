const assert = require('assert');

const day10 = require('../solutions/10.js');

describe('Day 10', () => {

	var sample = '3,4,1,5';
	var test = '165,1,255,31,87,52,24,113,0,91,148,254,158,2,73,153';

	describe('Part 1', () => {
		it('sample', 		() => assert.equal(12, day10.part_one(5, sample)));
		it('test', 			() => assert.equal(4114, day10.part_one(256, test)));
	});

	describe('Part 2', () => {
		it('test', 			() => assert.equal('2F8C3D2100FDD57CEC130D928B0FD2DD', day10.part_two(test)));
	});
});