console.log("AdventOfCode 2017 - 02");
console.log("----------------------");

var input;
input = 13;

if (process.argv.length === 3)
	input = +process.argv[2];

//input = 368078;

function partOne() {
	var steps = 0;
	var groupExp = 0, groupIx = 0, groupN;
	while (groupExp < input) {
		groupIx++;
		groupN = 1 + 2*groupIx;
		groupExp = Math.pow(groupN, 2);
	}

	var distanceToMiddle = Math.floor(groupN / 2);
	var middle;
	if (input >= groupExp - groupN + 1) {
		middle = groupExp - distanceToMiddle;
		console.log("Dolje");
	} else if (input >= groupExp - groupN*2 + 2) {
		middle = (groupExp - groupN + 1) - distanceToMiddle;
		console.log("Lijevo");
	} else if (input >= groupExp - groupN*3 + 3) {
		middle = (groupExp - groupN*2 + 2) - distanceToMiddle;
		console.log("Gore");
	} else if (input >= groupExp - groupN*3) {
		middle = (groupExp - groupN*3 + 3) - distanceToMiddle;
		console.log("Desno");
	}
	steps = Math.abs(input - middle) + groupIx;

	//console.log(groupIx, groupN, groupExp);

	console.log("Part 1 number of steps: " + steps);
}

function partTwo() {
}

console.log("Input is " + input);
partOne();
partTwo();