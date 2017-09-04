class Point {
  constructor(num, posX, posY) {
    this.number = num
    this.position = createVector(posX, posY)
    this.distances = [[]]
    this.closestOnes = []
    this.connections = []
  }

  show() {
    stroke(175)
    fill(255)
    ellipse(this.position.x, this.position.y, 10, 10)
    text(this.number, this.position.x - 20, this.position.y - 20)
  }

  whatTheDistanceTo(otherPoint) {
    return this.position.dist(otherPoint.position)
  }

  defineclosestOnes() {
    this.distances.sort((a, b) => {
      return a[1] - b[1]
    })

    this.distances.splice(this.distances.length - 1, 1)

    this.closestOnes = [
      this.distances[0][0],
      this.distances[1][0]
    ]
  }

  areBestieOf(otherPoint) {
    if ((this.closestOnes[0]       == otherPoint.number ||
         this.closestOnes[1]       == otherPoint.number) &&
        (otherPoint.closestOnes[0] == this.number ||
         otherPoint.closestOnes[1] == this.number)) {

      line(this.position.x, this.position.y,
           otherPoint.position.x, otherPoint.position.y)

      this.connections.push(otherPoint.number)
      otherPoint.connections.push(this.number)

      paths.insert(this.number, otherPoint.number)
    }
  }

  belongsToMyIsland(otherPoint) {
    let myIsland
    loop1:
    for (let i = 0; i < paths.paths.length; i++)
      for (let j = 0; j < paths.paths[i].islands.length; j++)
        if (this.number == paths.paths[i].islands[j]) {
          myIsland = i
          break loop1
        }

      console.log(myIsland);
        //   for (let i = 0; i < paths.paths[myIsland].length; i++)
        //     if (otherPoint == paths.paths[i])
        //       return true
        // }


    return false
  }
}
