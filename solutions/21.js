const parseInput = (raw) => {
	var parsed = raw
		.trim()
		.split(/\n/g)
		.map((item) => item.split(/ => /g));

	return parsed;
};

const createStartPixels = () => {
	var start = new Array(3);
	start[0] = [".", "#", "."];
	start[1] = [".", "'", "#"];
	start[2] = ["#", "#", "#"];

	return start;
};

const pixelsToString = (pixels) => {
	var result = "";
	for (var i = 0; i < pixels.length; i++) {
		for (var j = 0; j < pixels.length; j++) {
			result += pixels[i][j]
		}

		if (i < pixels.length - 1)
			result += "/";
	}

	return result;
};

const breakPixels = (pixels) => {
};

const printPixels = (pixels) => {
	var line;
	process.stdout.write("----------\n");
	for (var i = 0; i < pixels.length; i++) {
		line = "";
		for (var j = 0; j < pixels.length; j++) {
			line += pixels[i][j]
		}

		process.stdout.write(line + "\n");
	}
	process.stdout.write("----------\n");
};

const part_one = (raw, iterations) => {
	var input = parseInput(raw);
	var pixels = createStartPixels();

	// Povecamo pixele nekoliko puta
	for (var i = 0; i < iterations; i++) {
		var groups = breakPixels(pixels);

		// Dijelimo pixele ne grupe zavisno jesu djejivi sa 3 ili 4
		// Grupu u string, ako postoji pravilo primjenjujemo
		// Grupu rotiramo 3 puta, svaki put provjeravamo pravila
		// Grupu mirror, provjeravamo pravilo
		// Mirror grupe rotiramo tri puta, svaki put provjeravamo pravila

		// Ako nismo nasli plan, javljamo grešku!

		// Ako smo našli plan, primjenjujemo ga
		// Na kraju sve grupe spajamo nazad u jedan array pixela

		console.log("Iteration: " + (i + 1));
		printPixels(pixels);
	}

	// Idemo po svim pikselima i brojimo koliko ima upaljenih i to vracamo

	return 0;
};

const part_two = (raw) => {
	return 0;
};

module.exports = {
	part_one: part_one,
	part_two: part_two
}