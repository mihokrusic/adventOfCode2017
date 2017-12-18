const assert = require('assert');

const day15 = require('../solutions/15.js');

describe('Day 15', () => {

	var sample = `
		set a 1
		add a 2
		mul a a
		mod a 5
		snd a
		set a 0
		rcv a
		jgz a -1
		set a 1
		jgz a -2
	`;

	var test = `
		set i 31
		set a 1
		mul p 17
		jgz p p
		mul a 2
		add i -1
		jgz i -2
		add a -1
		set i 127
		set p 464
		mul p 8505
		mod p a
		mul p 129749
		add p 12345
		mod p a
		set b p
		mod b 10000
		snd b
		add i -1
		jgz i -9
		jgz a 3
		rcv b
		jgz b -1
		set f 0
		set i 126
		rcv a
		rcv b
		set p a
		mul p -1
		add p b
		jgz p 4
		snd a
		set a b
		jgz 1 3
		snd b
		set f 1
		add i -1
		jgz i -11
		snd a
		jgz f -16
		jgz a -19
	`;

	describe('Part 1', () => {
		it('sample', 	() => assert.equal(4, day15.part_one(sample)));
		it('test', 		() => assert.equal(1187, day15.part_one(test)));
	});

	describe('Part 2', () => {
		// it('sample', 	() => assert.equal('abcde', day15.part_two(5, sample)));
		// it('test', 		() => assert.equal('fbidepghmjklcnoa', day15.part_two(16, test)));
	});
});