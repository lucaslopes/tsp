const numberOfCities = prompt('How many cities?')
let cities = []

function setup() {
  initializeScenario()
  let dist = calculateDistances()
  let route = agrupamentoReciprocidade(dist)
  drawRoutes(route)

}

function initializeScenario() {
  createCanvas(windowWidth, windowHeight);
  background(51)

  for (let i = 0; i < numberOfCities; i++) {
    let newCity = new City(
      random(20, width - 20),
      random(20, height - 20), i
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
      linhaAtual.push(
        cities[i].position.dist(cities[j].position))
    dist.push(linhaAtual)
  }
  return dist
}

function drawRoutes(route) {
  stroke(255, 0, 255)
  noFill()

  beginShape()
  for (let i = 0; i < route.length; i++)
    vertex(cities[route[i]].position.x, cities[route[i]].position.y)
  endShape()
}
