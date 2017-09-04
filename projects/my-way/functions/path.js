function addToPath(cityA, cityB) {
  let indices = [];

  if (path.length == 0) {
    path.push([cityA, cityB]);
    return true;
  } else {
    for (let i = 0; i < path.length; i++) {
      let count = path[i].counter(cityA, cityB);
      if (count == 2) return false;
      if (count == 1) indices.push(i);
    }
  }

  if (add(cityA, cityB, ...indices)) return true;
  else return false;
}

function add(cityA, cityB, indexA, indexB) {
  if(indexA == undefined) {
    path.push([cityA, cityB]);
    return true;
  }

  if(indexB == undefined) {
    let array = path[indexA];

    if (cityA == array[0]) {
      path[indexA].unshift(cityB);
      return true;
    }

    if (cityB == array[0]) {
      path[indexA].unshift(cityA);
      return true;
    }

    let lastPosition = array.length - 1;

    if (cityA == array[lastPosition]) {
      path[indexA].push(cityB);
      return true;
    }

    if (cityB == array[lastPosition]) {
      path[indexA].push(cityA);
      return true;
    }

    else return false;
  }

  else {
    let arrayA = path[indexA];
    let arrayB = path[indexB];

    if ((cityA == arrayA[0] && cityB == arrayB[0]) ||
        (cityB == arrayA[0] && cityA == arrayB[0]))
    {
      arrayB.reverse();
      path[indexA] = arrayB.concat(arrayA);
      path.splice(indexB, 1);
      return true;
    }

    let lastPositionA = arrayA.length - 1;
    let lastPositionB = arrayB.length - 1;

    if ((cityA == arrayA[0] && cityB == arrayB[lastPositionB]) ||
        (cityB == arrayA[0] && cityA == arrayB[lastPositionB]))
    {
      path[indexA] = arrayB.concat(arrayA);
      path.splice(indexB, 1);
      return true;
    }

    if ((cityA == arrayA[lastPositionA] && cityB == arrayB[0]) ||
        (cityB == arrayA[lastPositionA] && cityA == arrayB[0]))
    {
      path[indexA] = arrayA.concat(arrayB);
      path.splice(indexB, 1);
      return true;
    }

    if ((cityA == arrayA[lastPositionA] && cityB == arrayB[lastPositionB]) ||
        (cityB == arrayA[lastPositionA] && cityA == arrayB[lastPositionB]))
    {
      arrayB.reverse();
      path[indexA] = arrayA.concat(arrayB);
      path.splice(indexB, 1);
      return true;
    }

    else return false;
  }
}
