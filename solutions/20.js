var input;

const parseInput = (raw) => {
	var parsed = raw
		.trim()
		.replace(/ /g, '')
		.replace(/p=</g, '')
		.replace(/v=</g, '')
		.replace(/a=</g, '')
		.replace(/>/g, '')
		.split(/\n/)
		.map((item) => item.split(",").map(Number));

	return parsed;
};

const part_one = (raw) => {
	var input = parseInput(raw);
	var numberOfParticles = input.length;
	var particles = [];
	for (var i = 0; i < numberOfParticles; i++) {
		particles.push({
			p: 	{	x: input[i][0],	y: input[i][1],	z: input[i][2] },
			v: 	{	x: input[i][3],	y: input[i][4],	z: input[i][5] },
			a: 	{	x: input[i][6],	y: input[i][7],	z: input[i][8] }
		});
	}

	var minimalDistance, distance;
	var closestParticle, position;
	for (var j = 0; j < numberOfParticles; j++) {
		position = {
			x: particles[j].v.x + (particles[j].v.x + particles[j].a.x * 1000000),
			y: particles[j].v.y + (particles[j].v.y + particles[j].a.y * 1000000),
			z: particles[j].v.z + (particles[j].v.z + particles[j].a.z * 1000000)
		}

		distance = Math.abs(position.x) + Math.abs(position.y) + Math.abs(position.z);
		if (!minimalDistance || distance < minimalDistance) {
			minimalDistance = distance;
			closestParticle = j;
		}
	}

	return closestParticle;
};

const part_two = (raw) => {
	return 0;
};

module.exports = {
	part_one: part_one,
	part_two: part_two
}