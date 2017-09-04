Array.prototype.swap = function (i, j) {
  [this[i], this[j]] = [this[j], this[i]];
}

Array.prototype.increase = function () {
  this.sort((a, b) => a - b)
}

Array.prototype.increaseByDist = function () {
  this.sort((a, b) => parseFloat(a.d) - parseFloat(b.d))
}

Array.prototype.counter = function (numA, numB) {
  let count = 0
  for (let i = 0; i < this.length; i++) {
    if (this[i] == numA || this[i] == numB)
      count++
  }
  return count
};
