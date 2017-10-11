const numberOfCities = prompt('How many cities?')
let cities = []

function setup() {
  initializeScenario()
  let dist = calculateDistances()
  let route = terceiraEtapa(dist)
  drawRoutes(route)
}
