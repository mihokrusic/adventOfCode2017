const dec2bin = (dec) => {
    return ("00000000" + (parseInt(dec, 10)).toString(2)).substr(-16);
};

const factorA = 16807;
const factorB = 48271;

const calculateNextValue = (value, factor) => {
	return (value * factor) % 2147483647;
};

const areValuesEqual = (valueA, valueB) => {
	var binA = dec2bin(valueA);
	var binB = dec2bin(valueB);

	return (binA === binB ? 1 : 0);
};

const part_one = (startA, startB, numberOfPairs) => {
	var valueA = startA;
	var valueB = startB;
	var matches = 0;
	for (var i = 0; i < numberOfPairs; i++) {

		valueA = calculateNextValue(valueA, factorA);
		valueB = calculateNextValue(valueB, factorB);

		matches += areValuesEqual(valueA, valueB);
	}

	return matches;
};

const part_two = (startA, startB, numberOfPairs) => {
	var valueA = startA;
	var valueB = startB;
	var binA, binB;
	var matches = 0;

	var calculatedA = [], calculatedB = [];

	while (calculatedA.length < numberOfPairs || calculatedB.length < numberOfPairs) {

		if (calculatedA.length < numberOfPairs) {
			valueA = calculateNextValue(valueA, factorA);
			if (valueA % 4 === 0)
				calculatedA.push(valueA);
		}

		if (calculatedB.length < numberOfPairs) {
			valueB = calculateNextValue(valueB, factorB);
			if (valueB % 8 === 0)
				calculatedB.push(valueB);
		}
	};

	for (var i = 0; i < calculatedA.length; i++) {
		matches += areValuesEqual(calculatedA[i], calculatedB[i]);
	}

	return matches;
};

module.exports = {
	part_one: part_one,
	part_two: part_two
}


