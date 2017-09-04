class Path {
  constructor() {
    this.paths = []
  }

  insert(pointA, pointB) {
    let haveA = [Infinity, false]
    let haveB = [Infinity, false]

    for (let i = 0; i < this.paths.length; i++) {
      let a = this.paths[i].doYouHaveThisPoint(pointA)
      let b = this.paths[i].doYouHaveThisPoint(pointB)

      if (typeof(a) == "number")
        haveA = [i, a]

      if (typeof(b) == "number")
        haveB = [i, b]
    }

    switch (true) {
      // true and true
      case ((typeof(haveA[1]) == "number") && (typeof(haveB[1]) == "number")):
        if (haveA[0] == haveB[0])
          this.paths[haveA[0]].close = true
        else {
          switch (true) {
            // A' + B
            case (haveA[1] == 0 && haveB[1] == 0):
              this.paths[haveA[0]].islands.reverse()
              let newPath1 = this.paths[haveA[0]].islands.concat(this.paths[haveB[0]].islands)
              this.remove(haveA[0], haveB[0])
              this.paths.push(new Island(newPath1))
              break;

            // B + A
            case (haveA[1] == 0 && haveB[1] > 0):
              let newPath2 = this.paths[haveB[0]].islands.concat(this.paths[haveA[0]].islands)
              this.remove(haveA[0], haveB[0])
              this.paths.push(new Island(newPath2))
              break;

            // A + B
            case (haveA[1] > 0 && haveB[1] == 0):
              let newPath3 = this.paths[haveA[0]].islands.concat(this.paths[haveB[0]].islands)
              this.remove(haveA[0], haveB[0])
              this.paths.push(new Island(newPath3))
              break;

            // B'+ A
            case (haveA[1] > 0 && haveB[1] > 0):
              this.paths[haveB[0]].islands.reverse()
              let newPath4 = this.paths[haveB[0]].islands.concat(this.paths[haveA[0]].islands)
              this.remove(haveA[0], haveB[0])
              this.paths.push(new Island(newPath4))
              break;
          }
        }
        break;

      // true and false
      case ((typeof(haveA[1]) == "number") && (typeof(haveB[1]) != "number")):
        this.paths[haveA[0]].islands.splice(haveA[1], 0, pointB)
        break;

      // false and true
      case ((typeof(haveA[1]) != "number") && (typeof(haveB[1]) == "number")):
        this.paths[haveB[0]].islands.splice(haveB[1], 0, pointA)
        break;

      // false and false
      case ((typeof(haveA[1]) != "number") && (typeof(haveB[1]) != "number")):
        this.paths.push(new Island([pointA, pointB]))
        break;
    }
  }

  remove(islandA, islandB) {
    if (islandA < islandB) {
      this.paths.splice(islandA, 1)
      this.paths.splice(islandB - 1, 1)
    } else {
      this.paths.splice(islandB, 1)
      this.paths.splice(islandA - 1, 1)
    }
  }
}
