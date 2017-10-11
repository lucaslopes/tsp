function initializeScenario() {
  createScenario()
  createCities()
}

function createScenario() {
  createCanvas(windowWidth, windowHeight);
  background(51)
}

function createCities() {
  for (let i = 0; i < numberOfCities; i++) {
    let newCity = new City(
      random(20, width - 20),
      random(20, height - 20)
    )

    cities.push(newCity)
    cities[i].show()
  }
}

function calculateDistances() {
  let dist = []
  for (var i = 1; i < cities.length; i++) {
    let linhaAtual = []
    for (var j = 0; j < i; j++)
      linhaAtual.push(temp(i, j))
    dist.push(linhaAtual)
  }
  return dist
}

function temp(i, j) {
  return cities[i].position.dist(cities[j].position)
}


function drawRoutes(route) {
  stroke(255, 0, 255)
  noFill()

  beginShape()
  for (let i = 0; i < route.length; i++)
    vertex(cities[route[i]].position.x, cities[route[i]].position.y)
  endShape()
}
