class Person {
  constructor(posX, posY, id) {
    this.position = createVector(posX, posY)
    this.id = id
    this.friends = []
    this.closestOnes = []
    this.size = 10 // map(people, 250, 1, 3, 15)
  }

  show() {
    stroke(175)
    fill(255)
    ellipse(this.position.x, this.position.y, this.size, this.size)
    // text(this.id, this.position.x - 20, this.position.y - 20)
  }

  howFarFrom(otherPerson) {
    return this.position.dist(otherPerson.position)
  }

  join(otherPerson) {
    line(
      this.position.x, this.position.y,
      otherPerson.position.x, otherPerson.position.y)
  }
}
