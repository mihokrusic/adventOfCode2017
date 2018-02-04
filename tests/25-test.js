const assert = require('assert');
const dayNumber = '25';

const day = require('../solutions/' + dayNumber + '.js');

describe('Day ' + dayNumber, () => {

	var test = `
		A 0 1 R B
		A 1 0 L B
		B 0 1 L A
		B 1 1 R A
	`;

	var real = `
		A 0 1 R B
		A 1 0 L B
		B 0 0 R C
		B 1 1 L B
		C 0 1 R D
		C 1 0 L A
		D 0 1 L E
		D 1 1 L F
		E 0 1 L A
		E 1 0 L D
		F 0 1 R A
		F 1 1 L E
	`;

	describe('Part 1', () => {
		it('test', 		() => assert.equal(3, day.part_one(test, 6)));
		it('real', function(done) {
			this.timeout(360000);
		 	assert.equal(3732, day.part_one(real, 12586542))
		 	done();
		});
	});
});
