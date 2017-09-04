const numOfCities = prompt("Number of Cities:")
const popTotal = 250

let cities = []
let roads = []
let path = []
let population = []
let recordDistance = Infinity

function setup() {
  createCanvas(windowWidth, windowHeight)

  for (let i = 0; i < numOfCities; i++)
    cities[i] = new City(i, random(10, width - 10), random(10, height - 10))

  for (let i = 0; i < cities.length - 1; i++) {
    for (let j = i + 1; j < cities.length; j++) {
      roads.push(new Road(cities[i], cities[j]))
    }
  }

  roads.increaseByDist()
  for (let i = 0; i < roads.length; i++) {
    if (roads[i].cityA.connections < 2 &&
      roads[i].cityB.connections < 2 &&
      addToPath(roads[i].cityA.index, roads[i].cityB.index)) {
      roads[i].cityA.connections++
      roads[i].cityB.connections++
    }
  }

  path = path[0].slice()

  // let i = 0
  // while (i < path.length - 3) {
  //   for (var j = i + 2; j < path.length - 1; j++) {
  //     if (theyCross([cities[path[i]].pos, cities[path[i + 1]].pos,
  //         cities[path[j]].pos, cities[path[j + 1]].pos])) {
  //         crossLines([path[i], path[i + 1], path[j], path[j + 1]])
  //         i = 0
  //     } else i++
  //   }
  // }

  cleanNeighbors()

  population[0] = new DNA(numOfCities, path)
  for (let i = 1; i < popTotal; i++) {
    let copy = path.slice()
    let x = floor(random(path.length - 1))
    let y = floor(random(path.length - 1))
    path.swap(x, y)

    population[i] = new DNA(numOfCities, path)
  }
}

function draw() {
  background(51)

  for (let i = 0; i < path.length - 3; i++) {
    for (var j = i + 2; j < path.length - 1; j++) {
      if (theyCross([cities[path[i]].pos, cities[path[i + 1]].pos,
          cities[path[j]].pos, cities[path[j + 1]].pos])) {
          crossLines([path[i], path[i + 1], path[j], path[j + 1]])
      }
    }
  }

  let minDist = Infinity
  let maxDist = 0

  let bestNow
  for (let i = 0; i < population.length; i++) {
    let d = population[i].calcDistance()

    if (d < recordDistance) {
      recordDistance = d
      path = population[i].path
    }
    if (d < minDist) {
      minDist = d
      bestNow = population[i]
    }
    if (d > maxDist)
      maxDist = d
  }

  stroke(126)
  noFill()
  beginShape()
  for (let i = 0; i < path.length; i++)
    vertex(cities[path[i]].pos.x, cities[path[i]].pos.y)
  endShape()

  for (let i = 0; i < cities.length; i++) {
    cities[i].show()
    // cities[i].showNumber()
  }

  let sum = 0
  for (let i = 0; i < population.length; i++)
    sum += population[i].mapFitness(minDist, maxDist)

  for (let i = 0; i < population.length; i++)
    population[i].normalizeFitness(sum)

  let newPop = []
  for (let i = 0; i < population.length; i++) {
    let index = 0
    let r = random(1)

    while (r > 0) {
      r -= population[index].fitness
      index += 1
    }

    index -= 1
    newPop[i] = new DNA(numOfCities, population[index].path)
  }

  population = newPop
}
