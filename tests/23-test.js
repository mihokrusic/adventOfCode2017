const assert = require('assert');
const dayNumber = '23';

const day = require('../solutions/' + dayNumber + '.js');

describe('Day ' + dayNumber, () => {

	var test = `
		set b 84
		set c b
		jnz a 2
		jnz 1 5
		mul b 100
		sub b -100000
		set c b
		sub c -17000
		set f 1
		set d 2
		set e 2
		set g d
		mul g e
		sub g b
		jnz g 2
		set f 0
		sub e -1
		set g e
		sub g b
		jnz g -8
		sub d -1
		set g d
		sub g b
		jnz g -13
		jnz f 2
		sub h -1
		set g b
		sub g c
		jnz g 2
		jnz 1 3
		sub b -17
		jnz 1 -23
	`;

	describe('Part 1', () => {
		it('test', 		() => assert.equal(6724, day.part_one(test)));
	});

	describe('Part 2', () => {
		//it('test', 		() => assert.equal(17264, day.part_two(test)));
	});
});
