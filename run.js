const dayNumber = '25';
const day = require('./solutions/' + dayNumber + '.js');

var test = `
A 0 1 R B
A 1 0 L B
B 0 1 L A
B 1 1 R A
`;

console.log(day.part_one(test, 6));