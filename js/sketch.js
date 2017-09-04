const numberOfCities = prompt('How many cities?')
let cities = []

function setup() {
  createScenario()
  initializeCities()
  connectCities()
}

// function draw() {
//   fill(255)
//   line(
//     initialCity.position.x,
//     initialCity.position.y,
//     cities[initialCity.connections[0]].position.x,
//     cities[initialCity.connections[0]].position.y
//   )
//
//   for (let i = 0; i < numberOfCities; i++) {
//
//   }
// }
