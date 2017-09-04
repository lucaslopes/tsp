function createScenario() {
  createCanvas(windowWidth, windowHeight)
  background(51)
}

function initializeCities() {
  for (let i = 0; i < numberOfCities; i++) {
    cities.push(new City(
      createVector(
        random(20, width - 20),
        random(20, height - 20)
      ), i)
    )

    cities[i].show()
  }

  for (let i = 0; i < numberOfCities; i++)
    cities[i].listYourClosestCities()
}

function connectCities() {
  let initialCity = cities[findTheWorstBest()]
  // console.log(initialCity);
  conectTheCity(initialCity)
}

function findTheWorstBest() {
  let worstBestDistance = 0
  let indexOfTheCityWithTheWorstBest = 0

  for (let i = 0; i < numberOfCities; i++) {
      if (cities[i].bestOptions[0] > worstBestDistance) {
        worstBestDistance = cities[i].bestOptions[0]
        cityWithTheWorstBest = i
      }
  }

  return indexOfTheCityWithTheWorstBest
}

function conectTheCity(city) {
  push()
  if(thereIsCitiesWithNoConnections()) {
    switch (city.howManyConnectionsTheCityYouWantHave()) {
      case 0:
        let bestCity = cities[city.bestOptions[0]]
        bestCity.connections.push(city.number)
        city.connections.push(bestCity.number)
        city.removeTheFirstOption()
        conectTheCity(bestCity)
        pop()
        break

      case 1:
        city.removeTheFirstOption()
        conectTheCity(city)
        pop()
        break

      case 2:
        if (city.bestOptions[0] == city.connections[0]) {
          city.removeTheFirstOption()
          conectTheCity(city)
        } else {
          let previousCity = cities[city.connections[0]]
          previousCity.connections.pop()
          city.connections.pop()
          conectTheCity(previousCity)
        }
        pop()
        break

      default:
        console.log('Some city has wrong connections')
    }
  }
  else console.log('finish')
}

function thereIsCitiesWithNoConnections() {
  for (let i = 0; i < numberOfCities; i++)
    if (cities[i].connections.length == 0)
      return true
  return false
}
