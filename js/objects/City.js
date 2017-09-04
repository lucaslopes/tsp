class City {
  constructor (index, x, y) {
    this.index = index
    this.pos = createVector(x, y)
    this.connections = 0
  }

  show() {
    fill(255)
    ellipse(this.pos.x, this.pos.y, 8, 8)
  }

  showNumber() {
    textSize(20);
    fill('purple');
    text(this.index, this.pos.x, this.pos.y);
  }
}
