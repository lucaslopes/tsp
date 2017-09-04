const numOfCities = prompt('How many cities?')
let cities = []
let roads = []

function setup() {
  createScenario()
  initializeCities()
  connectCities()
	showCities()
  removeWorstConnections()
  showRoads()
}
