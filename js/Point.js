class Point {
  constructor(posX, posY) {
    this.pos = createVector(posX, posY)
    this.size = 3 // map(people, 250, 1, 3, 15)
  }

  show() {
    stroke(175)
    fill(255)
    ellipse(this.pos.x, this.pos.y, this.size, this.size)
    // text(this.id, this.pos.x - 20, this.pos.y - 20)
  }
}
