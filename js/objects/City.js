class City {
  constructor(pos, num) {
    this.position = createVector(pos.x, pos.y)
    this.number = num
    this.connections = [
      // came from
      // go to
    ]
    this.bestOptions = []
  }

  show() {
    fill(255, 0, 255)
    ellipse(this.position.x, this.position.y, 10, 10)
    text(this.number, this.position.x + 5, this.position.y - 5)

    fill(255)
    for (var i = 0; i < numberOfCities; i++) {
      text(
        `${this.bestOptions[i]}`,
        this.position.x - 50, this.position.y + i * 10
      )
    }
  }

  listYourClosestCities() {
    let distances = []

    for (let i = 0; i < numberOfCities; i++) {
      distances.push([
        [i],
        [this.position.dist(cities[i].position)]])
    }

    distances.sort((a,b) => a[1] - b[1])

    for (let i = 0; i < numberOfCities; i++)
      this.bestOptions.push(distances[i][0][0])

    this.removeTheFirstOption()
  }

  removeTheFirstOption() {
    if (this.bestOptions.length > 1)
      this.bestOptions.splice(0, 1)
  }

  howManyConnectionsTheCityYouWantHave() {
    return cities[this.bestOptions[0]].connections.length
  }
}
