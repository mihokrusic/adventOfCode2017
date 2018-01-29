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

const particlesInSamePos = (particle1, particle2) => {
	return (particle1.p.x === particle2.p.x && particle1.p.y === particle2.p.y && particle1.p.z === particle2.p.z);
};

const moveParticle = (particle) => {
	particle.v.x += particle.a.x;
	particle.v.y += particle.a.y;
	particle.v.z += particle.a.z;

	particle.p.x += particle.v.x;
	particle.p.y += particle.v.y;
	particle.p.z += particle.v.z;
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
	for (var j = 0; j < particles.length; j++) {
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

	for (var i = 0; i < 1000; i++) {
		particles.forEach((particle) => {
			moveParticle(particle);
		});

		var j = 0, foundIdentical = false;
		while (j < particles.length) {
			foundIdentical = false;
			var p = 0;
			while (p < particles.length) {
				if (p === j) {
					p++;
					continue;
				}

				if (particlesInSamePos(particles[j], particles[p])) {
					foundIdentical = true;
					particles.splice(p, 1);
				} else {
					p++;
				}
			}
			if (foundIdentical) {
				particles.splice(j, 1);
			} else {
				j++;
			}
		}
	}

	return particles.length;
};

module.exports = {
	part_one: part_one,
	part_two: part_two
}