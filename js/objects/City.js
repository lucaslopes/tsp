class City {
  constructor(x, y) {
    this.pos = createVector(x, y)
  	this.connections = 0
  }

	show() {
		fill(255)
		ellipse(this.pos.x, this.pos.y, 8, 8)
	}
}
