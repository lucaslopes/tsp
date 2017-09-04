function createScenario() {
  createCanvas(windowWidth, windowHeight)
  background(51)
}

function initializeCities() {
  for (let i = 0; i < numOfCities; i++)
		cities[i] = new City(random(windowWidth), random(windowHeight))
}

function connectCities() {
  for (let i = 0; i < cities.length; i++) {
		for (let j = i + 1; j < cities.length; j++) {
				roads.push(new Road(cities[i], cities[j]));
				cities[i].connections++;
				cities[j].connections++;
		}
	}
  sortRoads()
}

function sortRoads() {
  roads.sort((a, b) => parseFloat(a.d) - parseFloat(b.d))
}

function showCities() {
  for (let i = 0; i < cities.length; i++)
		cities[i].show()
}

function showRoads() {
  for (let i = 0; i < roads.length; i++)
    roads[i].show()
}

function removeWorstConnections() {
  for (let i = roads.length - 1; i > 0; i--) {
		if (roads[i].cityA.connections > 2 && roads[i].cityB.connections > 2) {
      roads[i].cityA.connections -= 1;
      roads[i].cityB.connections -= 1;
      roads.splice(i, 1);
    }
	}
  removeTheLastConnection()
}

function removeTheLastConnection() {
  if (roads.length == numOfCities)
    roads.splice(roads.length - 1, 1)
}

// function showBestConnections() {
//   for (let i = 0; i < roads.length; i++) {
//     if (roads[i].cityA.connections > 2 && roads[i].cityB.connections > 2) {
//         roads[i].cityA.connections -= 1;
//         roads[i].cityB.connections -= 1;
//         roads[i].show();
//       }
//   }
// }
