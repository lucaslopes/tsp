let points = []

function setup() {
  let numPoints = prompt('How many points?') // Step 1
                  init(numPoints)            // Step 2
  let distances = setDist()                  // Step 3
  let route     = reciprocity(distances)     // Step 4
                  drawRoute(route)           // Step 5
}

function init(n) {
  createCanvas(windowWidth, windowHeight)
  background(51)

  for (let i = 0; i < n; i++) {
    let newPoint = new Point(
      random(20, width - 20),
      random(20, height - 20))
    newPoint.show()
    points.push(newPoint)
  }
}

function setDist() {
  let dist = []
  for (var i = 1; i < points.length; i++) {
    let currentRow = []
    for (var j = 0; j < i; j++)
      currentRow.push(
        points[i].pos.dist(points[j].pos))
    dist.push(currentRow)
  }
  return dist
}

function drawRoute(route) {
  stroke(255, 0, 255)
  noFill()

  beginShape()
  for (let i = 0; i < route.length; i++)
    vertex(points[route[i]].pos.x, points[route[i]].pos.y)
  endShape()
}
