var totalCities = prompt("Digite o número de cidades:");
var popTotal = 200;
var recordDistance = Infinity;
var population = [];
var cities = [];
var bestEver;

function setup() {
  createCanvas(750, 500);

  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(10, width - 10), random(10, height / 2 - 10));
    cities[i] = v;
  }

  for (var i = 0; i < popTotal; i++)
    population[i] = new DNA(totalCities);
}

function draw() {
  background(51);

  var minDist = Infinity;
  var maxDist = 0;

  var bestNow;
  for (var i = 0; i < population.length; i++) {
    var d = population[i].calcDistance();

    if (d < recordDistance) {
      recordDistance = d;
      bestEver = population[i];
    }

    if (d < minDist) {
      minDist = d;
      bestNow = population[i];
    }

    if (d > maxDist) {
      maxDist = d;
    }
  }

  bestEver.show(255, 0, 255);
  translate(0, height / 2);
  // line(0, 0, width, 0);
  bestNow.show(126, 126, 126);

  var sum = 0;
  for (var i = 0; i < population.length; i++)
    sum += population[i].mapFitness(minDist, maxDist);

  for (var i = 0; i < population.length; i++)
    population[i].normalizeFitness(sum);

  var newPop = [];
  for (var i = 0; i < population.length; i++) {
    var a = pickOne(population);
    var b = pickOne(population);

    var order = a.crossover(b);
    newPop[i] = new DNA(totalCities, order);
  }

  population = newPop;
}

function pickOne() {
  var index = 0;
  var r = random(1);

  while (r > 0) {
    r -= population[index].fitness;
    index += 1;
  }

  index -= 1;
  return population[index];
}
