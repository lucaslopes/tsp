var cities = [];
var totalCities = prompt("Digite o número de cidades:");
var recordDistance;
var bestEver;

function setup() {
  createCanvas(750, 500);
  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(10, width - 10), random(10, height - 10));
    cities[i] = v;
  }

  var d = calcDistance(cities);
  recordDistance = d;
  bestEver = cities.slice();
}

function draw() {
  background(51);

  stroke(126);
  strokeWeight(1);
  noFill();
  beginShape();
  for (var i = 0; i < cities.length; i++) {
    vertex(cities[i].x, cities[i].y);
  }
  endShape();

  stroke(255, 0, 255);
  strokeWeight(2);
  noFill();
  beginShape();
  for (var i = 0; i < cities.length; i++) {
    vertex(bestEver[i].x, bestEver[i].y);
  }
  endShape();

  fill(255);
  noStroke();
  for (var i = 0; i < cities.length; i++)
    ellipse(cities[i].x, cities[i].y, 8, 8);

  var i = floor(random(cities.length));
  var j = floor(random(cities.length));
  swap(cities, i, j);

  var d = calcDistance(cities);
  if (d < recordDistance) {
    recordDistance = d;
    bestEver = cities.slice();
  }
}

function calcDistance(points) {
  var sum = 0;
  for (var i = 0; i < points.length - 1; i++) {
    var d = dist(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
    sum += d;
  }
  return sum;
}

function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}
