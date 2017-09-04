function cleanNeighbors() {
  for (let i = 1; i < path.length - 2; i++) {
    let cityBefore = cities[path[i - 1]].pos;
    let cityA = cities[path[i]].pos;
    let cityB = cities[path[i + 1]].pos;
    let cityAfter = cities[path[i + 2]].pos;

    if ((cityBefore.dist(cityA) +
        cityA.dist(cityB) +
        cityB.dist(cityAfter))
        >
        (cityBefore.dist(cityB) +
        cityB.dist(cityA) +
        cityA.dist(cityAfter)))
    {
      [path[i], path[i + 1]] = [path[i + 1], path[i]];
    }
  }
  redraw();
}

function theyCross (points) {
  let distA = points[1].dist(points[0]);
  let distB = points[3].dist(points[2]);
  let distances = [];

  for (let i = 0; i < points.length - 1; i++)
    for (let j = i + 1; j < points.length; j++)
      distances.push(points[i].dist(points[j]));

  distances.increase();

  if ((distA == distances[distances.length - 1]) ||
      (distB == distances[distances.length - 1]))
       return true;
}

function crossLines (indices) {
  let lesserIndex = indices[0];
  let biggerIndex = indices[0];

  for (var i = 1; i < indices.length; i++) {
    if (lesserIndex > indices[i]) lesserIndex = indices[i];
    if (biggerIndex < indices[i]) biggerIndex = indices[i];
  }

  let actualDist = 0;
  for (var i = lesserIndex; i < biggerIndex; i++)
    actualDist += cities[path[i + 1]].pos.dist(cities[path[i]].pos);

  let partition = path.slice(lesserIndex + 1, biggerIndex);
  partition.reverse();

  let newArray = path.slice();
  newArray.splice(lesserIndex + 1, (biggerIndex - lesserIndex) - 1, ...partition);

  let newDist = 0;
  for (var i = lesserIndex; i < biggerIndex; i++)
    newDist += cities[newArray[i + 1]].pos.dist(cities[newArray[i]].pos);

  if (newDist < actualDist)
    path = newArray.slice();

  // redraw();
}
