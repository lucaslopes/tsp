class City {
  constructor (index, x, y) {
    this.index = index
    this.pos = createVector(x, y)
    this.connections = 0
  }

  show() {
    fill(255)
    ellipse(this.pos.x, this.pos.y, 6, 6)
  }

  showNumber() {
    textSize(12);
    fill('purple');
    noStroke()
    text(this.index, this.pos.x, this.pos.y);
  }
}
