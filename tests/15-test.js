const assert = require('assert');
const dayNumber = '15';

const day = require('../solutions/' + dayNumber + '.js');

describe('Day ' + dayNumber, () => {

	describe('Part 1', () => {
		it('small sample', function(done) {
			this.timeout(360000);
			assert.equal(12, day.part_one(65, 8921, 1000000));
			done();
		});
		it('sample', function(done) {
			this.timeout(360000);
			assert.equal(588, day.part_one(65, 8921, 40000000));
			done();
		});
		it('test', function(done) {
			this.timeout(360000);
			assert.equal(650, day.part_one(783, 325, 40000000));
			done();
		});
	});

	describe('Part 2', () => {
		it('sample', function(done) {
			this.timeout(360000);
			assert.equal(309, day.part_two(65, 8921, 5000000));
			done();
		});
		it('test', function(done) {
			this.timeout(360000);
			assert.equal(336, day.part_two(783, 325, 5000000));
			done();
		});
	});
});