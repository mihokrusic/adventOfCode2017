console.log("AdventOfCode 2017 - 03");
console.log("----------------------");

var input;
input = 368078;

if (process.argv.length === 3)
	input = +process.argv[2];

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
		//console.log("Dolje");
	} else if (input >= groupExp - groupN*2 + 2) {
		middle = (groupExp - groupN + 1) - distanceToMiddle;
		//console.log("Lijevo");
	} else if (input >= groupExp - groupN*3 + 3) {
		middle = (groupExp - groupN*2 + 2) - distanceToMiddle;
		//console.log("Gore");
	} else if (input >= groupExp - groupN*3) {
		middle = (groupExp - groupN*3 + 3) - distanceToMiddle;
		//console.log("Desno");
	}
	steps = Math.abs(input - middle) + groupIx;

	console.log("Part 1 number of steps " + steps);
}

function partTwo() {
	var result = 0;

	var curr = 0;
	var ringIx = 0, ringMax = 1, ringSide = 1;

	var distanceToMiddle = Math.floor(ringSide / 2);
	while (curr < 50) {
		curr++;
		console.log(curr);
		if (curr > ringMax) {
			ringIx++;
			ringSide = (2 * ringIx) + 1;
			distanceToMiddle = Math.floor(ringSide / 2);
			ringMax = Math.pow(ringSide, 2);
			console.log(`Switched to ring ${ringIx} with max ${ringMax} and ring side ${ringSide}, ${distanceToMiddle}`)
		}
	}

	console.log("Part 2 result value is " + result)
}

partOne();
partTwo();