const initElements = (elementCount) => {
	var elements = new Array(elementCount);
	for (var i = 0; i < elements.length; i++) 
		elements[i] = i;
	return elements;
};


const knotHashRound = (elements, lengths, roundData) => {
	var pos = roundData.pos;
	var skip = roundData.skip;
	for (var i = 0; i < lengths.length; i++) {
		var length = lengths[i];

		var hasOverflow = (pos + length >= elements.length);
		var overflow = (pos + length - elements.length);
		temp = [];
		for (var j = 0; j < length; j++) {
			temp.push(elements[(pos + j) % elements.length]);
		}
		temp.reverse();

		elements.splice(pos, temp.length, ...temp);
		if (hasOverflow) {
			elements.splice(0, overflow);
			for (var k = 0; k < elements.length - overflow; k++)
				elements.push(elements.shift());
		}
		pos = ((pos + length + skip) % elements.length);
		skip++;
	}	


	return {
		pos: pos,
		skip: skip
	}
};


const numberToHash = (num) => {
	var hash = (num).toString(16).toUpperCase();
	if (hash.length === 1)
		hash = '0' + hash;
	return hash;	
};


const part_one = (elementCount, input) => {	
	var result = 0;

	var elements = initElements(elementCount);
	var lengths = input.replace(/ /g,'').split(',').map(Number);

	knotHashRound(elements, lengths, { pos: 0, skip: 0 });

	return elements[0] * elements[1];
};


const part_two = (input) => {

	var elements = initElements(256);
	var lengths = [];
	var sufix = [17, 31, 73, 47, 23];
	for (var i = 0; i < input.length; i++) {
		lengths.push(input.charCodeAt(i));
	}
	lengths.push(...sufix);
	
	var roundResult = {
		pos: 0,
		skip: 0
	};
	for (var i = 0; i < 64; i++) {
		roundResult = knotHashRound(elements, lengths, roundResult);
	}

	var denseHashHex = '';
	for (var i = 0; i < 16; i++) {
		var denseElem = elements[16 * i];
		for (var j = 1; j < 16; j++) {
			denseElem = denseElem ^ elements[16 * i + j];
		}
		var hash = numberToHash(denseElem);
		denseHashHex += hash;
	}

	return denseHashHex;
};

module.exports = {
	part_one: part_one,
	part_two: part_two
}