const points = []
const numberOfPoints = 10
const paths = new Path()

function setup() {
  createCanvas(800, 600)
  background(51)

  // Create the Points and show them
  for (let i = 0; i < numberOfPoints; i++) {
    points.push(new Point(i,
      random(20, width - 20),
      random(20, height - 20)
    ))
    points[i].show()
  }

  // Calculate the distances between them
  for (let i = 0; i < numberOfPoints; i++) {
    for (let j = i; j < numberOfPoints; j++) {
      if (i != j)
        points[i].distances[j] = [
          j, points[i].whatTheDistanceTo(points[j])]
      else
        points[i].distances[j] = [j, Infinity]
    }
  }

  // Sets the remaining distances
  let ultimo = numberOfPoints - 1
  for (let i = numberOfPoints - 1; i >= 0; i--) {
    for (let j = 0; j < numberOfPoints; j++) {
      if (i != j) {
        let distance = points[j].distances[ultimo][1]
        points[i].distances[j] = [j, distance]
      }
    }
    ultimo -= 1
  }

  // Take the 2 closest of each
  for (let i = 0; i < numberOfPoints; i++)
    points[i].defineclosestOnes()

  // Create the islands
  for (let i = 0; i < numberOfPoints; i++)
    for (let j = i; j < numberOfPoints; j++)
      if (i != j)
        points[i].areBestieOf(points[j])

  // Filter the habios
  let habios = []

  for (let i = 0; i < paths.paths.length; i++){
    habios = habios.concat(paths.paths[i].giveMeYourHabios())
  }

  for (let i = 0; i < numberOfPoints; i++) {
    if (points[i].connections.length == 0) {
      paths.paths.push(new Island(points[i].number))
      habios.push(points[i].number)
    }
  }

  loop1:
    for (let i = 0; i < numberOfPoints; i++) {
  loop2:
      for (let j = 0; j < habios.length; j++)
        if (i == habios[j])
          continue loop1
      points[i].distances = []
      points[i].closestOnes = []
  }

  loop1:
    for (let i = 0; i < habios.length; i++) {
  loop2:
    for (let j = points[habios[i]].distances.length - 1; j >= 0; j--) {
  loop3:
      for (let k = 0; k < habios.length; k++)
        if (points[habios[i]].belongsToMyIsland(habios[k]))
          // points[habios[i]].distances.splice(j, 1)
        if (points[habios[i]].distances[j][0] == habios[k])
          continue loop2
      points[habios[i]].distances.splice(j, 1)
    }
  }

  for (let i = 0; i < habios.length; i++) {
    points[habios[i]].defineclosestOnes()
  }

  // for (let i = 0; i < habios.length; i++)
  //   for (let j = 0; j < habios.length; j++)
  //     if (i != j)
  //       points[habios[i]].areBestieOf(points[habios[j]])







}

// function draw() {
//
// }
