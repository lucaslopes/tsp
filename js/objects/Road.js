class Road {
  constructor (a, b) {
    this.cityA = a
    this.cityB = b
    this.d = this.cityA.pos.dist(this.cityB.pos)
  }

  show() {
    stroke(126)
    line(
      this.cityA.pos.x, this.cityA.pos.y,
      this.cityB.pos.x, this.cityB.pos.y
    )
  }
}
