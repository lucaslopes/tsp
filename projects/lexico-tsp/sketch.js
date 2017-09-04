var totalCities = prompt("Digite o número de cidades:");
var count = 0;
var cities = [];
var order = [];
var totalPermutations;
var recordDistance;
var bestEver;

function setup() {
  createCanvas(750, 500);
  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(10, width - 10), random(10, height / 2 - 10));
    cities[i] = v;
    order[i] = i;
  }

  var d = calcDistance(cities, order);
  recordDistance = d;
  bestEver = order.slice();

  totalPermutations = factorial(totalCities);
}

function draw() {
  background(51);

  stroke(255, 0, 255);
  strokeWeight(1);
  noFill();
  beginShape();
  for (var i = 0; i < order.length; i++) {
    var n = bestEver[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();

  fill(255);
  noStroke();
  for (var i = 0; i < cities.length; i++)
    ellipse(cities[i].x, cities[i].y, 8, 8);

  translate(0, height / 2);
  stroke(126);
  noFill();
  beginShape();
  for (var i = 0; i < order.length; i++) {
    var n = order[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();

  fill(255);
  stroke(126);
  for (var i = 0; i < cities.length; i++)
    ellipse(cities[i].x, cities[i].y, 8, 8);

  var d = calcDistance(cities, order);
  if (d < recordDistance) {
    recordDistance = d;
    bestEver = order.slice();
  }

  textSize(16);
  fill(255, 0, 255, 200);
  noStroke();
  var percent = 100 * (count / totalPermutations);
  text(nf(percent, 0, 2) + "%", 10, height / 2 - 10);

  nextOrder();
}

function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function factorial(n) {
  if (n == 1) return 1;
  else return n * factorial(n - 1);
}

function calcDistance(points, order) {
  var sum = 0;
  for (var i = 0; i < order.length - 1; i++) {
    var cityAIndex = order[i];
    var cityA = points[cityAIndex];
    var cityBIndex = order[i + 1];
    var cityB = points[cityBIndex];
    var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}

function nextOrder() {
  count++;

  var largestI = -1;
  for (var i = 0; i < order.length - 1; i++) {
    if (order[i] < order[i + 1])
      largestI = i;
  }
  if (largestI == -1) {
    noLoop();
    console.log('finished');
  }

  var largestJ = -1;
  for (var j = 0; j < order.length; j++) {
    if (order[largestI] < order[j])
      largestJ = j;
  }

  swap(order, largestI, largestJ);

  var endArray = order.splice(largestI + 1);
  endArray.reverse();
  order = order.concat(endArray);
}
