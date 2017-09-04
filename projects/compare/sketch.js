var cities = [];
var record = [];
var routes = [];
var rtDist = [];

var frameOffset = 0;
var seconds = 0;

var fps = 60;
var cityCount = prompt("Digite o número de cidades:");
var genePool = 100;
var evolutionRate = 0.01;

var drawing = {
  w: 750,
  h: 500
};

record.route = [];
record.dist = Infinity;
record.time = 0;
record.cRoute = [];
record.cDist = Infinity;

//Lex Variables
var totalRoutes = 0;
var countRoutes = 1;
var croute = [];
record.lexRoute = [];
record.lexDist = Infinity;
record.lexTime = 0;

function setup() {
  createCanvas(drawing.w, drawing.h);
  frameRate(fps);
  //Create n Random Cities
  var route = [];
  for (var i = 0; i < cityCount; i++) {
    cities[i] = createVector(random(10, width - 10), random(10, height / 2 - 10));
    route[i] = i;
    croute[i] = i;
  }

  //Randomize Initial Route Into n Routes
  for (var i = 0; i < genePool; i++) {
    routes[i] = shuffle(route);
  }

  //Lex Support
  record.lexDist = calcDistance(cities, croute);
  lexRecordRoute(croute);

  totalRoutes = factorial(cityCount);
  loop();
}

function draw() {
  background(51);
  seconds = (frameCount - frameOffset) / fps;

  //Genetic Algorithm
  calcRouteDistance();
  normalizeRouteDistance();
  nextGeneration();

  //Sketch Current Time Record Route
  stroke(126);
  strokeWeight(1);
  noFill();
  beginShape();
  for (var i = 0; i < record.cRoute.length; i++) {
    var city = record.cRoute[i];
    vertex(cities[city].x, cities[city].y);
  }
  endShape();

  //Sketch All Time Record Route
  stroke(255,0,255);
  strokeWeight(1);
  noFill();
  beginShape();
  for (var i = 0; i < record.route.length; i++) {
    var city = record.route[i];
    vertex(cities[city].x, cities[city].y);
  }
  endShape();

	//Draw Cities
	fill(255);
	noStroke();
	for (var i = 0; i < cities.length; i++) {
		ellipse(cities[i].x, cities[i].y, 8, 8);
	}

  ////////////SCREEN DIVIDE////////////////
  translate(0, height / 2);
  /////////////////////////////////////////

  //Current Lex City
  stroke(126);
  strokeWeight(1);
  noFill();
  beginShape();
  for (var i = 0; i < croute.length; i++) {
    var city = croute[i];
    vertex(cities[city].x, cities[city].y);
  }
  endShape();

  //Record Lex Route
  stroke(255,0,255);
  strokeWeight(1);
  noFill();
  beginShape();
  for (var i = 0; i < record.lexRoute.length; i++) {
    var city = record.lexRoute[i];
    vertex(cities[city].x, cities[city].y);
  }
  endShape();

	//Draw Lex Cities
	fill(255);
	noStroke();
	for (var i = 0; i < cities.length; i++) {
		ellipse(cities[i].x, cities[i].y, 8, 8);
	}

  var d = calcDistance(cities, croute);
  if (d < record.lexDist) {
    record.lexDist = d;
    record.lexTime = seconds;
    lexRecordRoute(croute);
  }

  push();
  translate(0, -height / 2);
  //Genetic Labels
  textSize(32);
  fill(225);
  noStroke();
  text("Genético", 10, 35);
  textSize(15);
	fill(175);
  text("Record: " + nf(record.dist, 0, 3), 10, 55);
  text("Encontrado em: " + nf(record.time, 0, 2) + " seg", 10, 75);

  //Divider
  translate(0, height / 2);
  stroke(200);
  strokeWeight(1);
  noFill();
  beginShape();
  vertex(0, 0);
  vertex(drawing.w, 0);
  endShape();

  //Lex Labels
  textSize(32);
  fill(225);
  noStroke();
  text("Lexo", 10, 35);
  textSize(15);
	fill(175);
  text("Record: " + nf(record.lexDist, 0, 3), 10, 55);
  text("Encontrado em: " + nf(record.lexTime, 0, 2) + " seg", 10, 75);

  var percent = 100 * (countRoutes / totalRoutes);
  textSize(15);
  fill(225);
  noStroke();
  text(nf(percent, 0, 2) + "% completo", 10, height / 2 - 10);

  pop();
  nextRoute();

}

function lexRecordRoute(route) {
  record.lexRoute = [];
  record.lexRoute = route.slice();
}

function factorial(n) {
  if (n == 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

function nextRoute() {

  countRoutes++;

  //Step 1
  var largestI = -1;
  for (var i = 0; i < croute.length - 1; i++) {
    if (croute[i] < croute[i + 1]) {
      largestI = i;
    }
  }
  if (largestI == -1) {
    //Finished
    noLoop();
    // console.log('Finished');
  }

  //Step 2
  var largestJ = -1;
  for (var j = 0; j < croute.length; j++) {
    if (croute[largestI] < croute[j]) {
      largestJ = j;
    }
  }

  //Step 3
  array_swap(croute, largestI, largestJ);

  //step 4
  var endArray = croute.splice(largestI + 1);
  endArray.reverse();
  croute = croute.concat(endArray);
}
