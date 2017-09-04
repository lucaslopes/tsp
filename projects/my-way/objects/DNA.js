class DNA {
  constructor(numOfCities, path) {
    this.dist = Infinity;
    this.fitness = 0;
    this.path = path.slice();

    if (random(1) < 0.05) this.shuffle();
  }

  shuffle() {
    let i = floor(random(this.path.length));
    let j = floor(random(this.path.length));
    this.path.swap(i, j);
  }

  calcDistance() {
    let sum = 0;
    for (let i = 0; i < this.path.length - 1; i++) {
      let cityA = cities[this.path[i]];
      let cityB = cities[this.path[i + 1]];
      let d = dist(cityA.pos.x, cityA.pos.y, cityB.pos.x, cityB.pos.y);
      sum += d;
    }
    this.dist = sum;
    return this.dist;
  }

  mapFitness(minDist, maxDist) {
    this.fitness = map(this.dist, minDist, maxDist, 1, 0);
    return this.fitness;
  }

  normalizeFitness(numOfCities) {
    this.fitness /= numOfCities;
  }

  crossover(other) {
    let pathA = this.path;
    let pathB = other.path;

    let start = floor(random(pathA.length));
    let end = floor(random(start + 1, pathA.length + 1));

    let newPath = pathA.slice(start, end);
    let leftOver = pathA.length - newPath.length;

    let count = 0;
    let i = 0;
    while (count < leftOver) {
      let city = pathB[i];
      if (!newPath.includes(city)) {
        newPath.push(city);
        count++;
      }
      i++;
    }
    return newPath;
  }
}
