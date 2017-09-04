var numOfCities = prompt("Digite o número de cidades:");
var cities = [];
var roads = [];

function setup() {
  createCanvas(750, 500);
  background(51);

  for (var i = 0; i < numOfCities; i++)
    cities[i] = new City(random(10, width - 10), random(10, height - 10));

  for (var i = 0; i < cities.length; i++)
    for (var j = i + 1; j < cities.length; j++)
      roads.push(new Road(cities[i], cities[j]));

  for (var i = 0; i < roads.length; i++)
    roads[i].show();

  for (var i = 0; i < cities.length; i++)
    cities[i].show();
}

function City(x, y) {
  this.pos = createVector(x, y);
  this.connections = 0;

  this.show = function() {
    fill(255, 0, 255);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 8, 8);
  }
}

function Road(a, b) {
  this.cityA = a;
  this.cityB = b;
  this.d = this.cityA.pos.dist(this.cityB.pos);

  this.show = function() {
    stroke(126, 126, 126, 100);
    strokeWeight(1);
    line(this.cityA.pos.x, this.cityA.pos.y, this.cityB.pos.x, this.cityB.pos.y)
  }
}
