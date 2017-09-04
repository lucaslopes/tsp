class Road {
  constructor (a, b) {
    this.cityA = a;
    this.cityB = b;
    this.d = a.pos.dist(b.pos);
  }
}
