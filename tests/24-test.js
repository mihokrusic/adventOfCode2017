const assert = require('assert');
const dayNumber = '24';

const day = require('../solutions/' + dayNumber + '.js');

describe('Day ' + dayNumber, () => {

	var test = `
		0/2
		2/2
		2/3
		3/4
		3/5
		0/1
		10/1
		9/10
	`;

	var real = `
		48/5
		25/10
		35/49
		34/41
		35/35
		47/35
		34/46
		47/23
		28/8
		27/21
		40/11
		22/50
		48/42
		38/17
		50/33
		13/13
		22/33
		17/29
		50/0
		20/47
		28/0
		42/4
		46/22
		19/35
		17/22
		33/37
		47/7
		35/20
		8/36
		24/34
		6/7
		7/43
		45/37
		21/31
		37/26
		16/5
		11/14
		7/23
		2/23
		3/25
		20/20
		18/20
		19/34
		25/46
		41/24
		0/33
		3/7
		49/38
		47/22
		44/15
		24/21
		10/35
		6/21
		14/50
	`;

	describe('Part 1', () => {
		it('test', 		() => assert.equal(31, day.part_one(test)));
		it('real', function(done) {
			this.timeout(360000);
			assert.equal(1656, day.part_one(real))
			done();
		});
	});

	describe('Part 2', () => {
		it('test', 		() => assert.equal(19, day.part_two(test)));
		it('real', function(done) {
			this.timeout(360000);
			assert.equal(1642, day.part_two(real))
			done();
		});
	});
});
