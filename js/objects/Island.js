class Island {
  constructor(points) {
    this.islands = points
    this.close = false
  }

  doYouHaveThisPoint(point) {
    if (this.islands[0] == point)
      return 0
    if (this.islands[this.islands.length - 1] == point)
      return this.islands.length
    else
      return false
  }

  giveMeYourHabios() {
    let myHabios = []
    if (!this.close) {
      for (var i = 0; i < this.islands.length; i++)
        if (points[this.islands[i]].connections.length == 1)
          myHabios.push(this.islands[i])
      return myHabios
    } else
        return this.islands
  }
}
