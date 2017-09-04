alert("Clique Ok para começar.")
var vals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function setup() {
  createCanvas(750, 500);
}

function draw() {
  var largestI = -1;
  for (var i = 0; i < vals.length - 1; i++) {
    if (vals[i] < vals[i + 1])
      largestI = i;
  }
  if (largestI == -1) {
    noLoop();
    console.log('finished');
  }

  var largestJ = -1;
  for (var j = 0; j < vals.length; j++) {
    if (vals[largestI] < vals[j])
      largestJ = j;
  }

  swap(vals, largestI, largestJ);

  var endArray = vals.splice(largestI + 1);
  endArray.reverse();
  vals = vals.concat(endArray);

  background(51);
  textSize(64);
  var s = '';
  for (var i = 0; i < vals.length; i++) {
    s += vals[i];
  }
  fill(255, 0, 255);
  text(s, 185, height / 2 + 15);
}

function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}
