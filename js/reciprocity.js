function reciprocity(dist) {
  dist.splice(0, 0, [Infinity])

  let groups = []
  for (let i = 0; i < dist.length; i++)
    groups.push([i])

  while (groups.length > 1) {
    let reciprocity = []
    for (let i = 0; i < groups.length; i++)
      reciprocity.push(findClosest(i, groups, dist))
    groups = joinMutual(reciprocity, groups)
  }

  return improveConnections(groups[0], dist)
}

function findClosest(i, groups, dist) {
  let shorter = Infinity
  let comparisons = [
    groups[i][0],
    groups[i][groups[i].length - 1]
  ]
  let desiredIndex = [
    // index of the desired point
    // from where to connect (0 = beginning / 1 = end)
  ]

  for (let j = 0; j < groups.length; j++) {
    if (i != j) {
      comparisons[2] = groups[j][0]
      comparisons[3] = groups[j][groups[j].length - 1]

      for (let k = 0; k < 2; k++) {
        for (let w = 2; w < 4; w++) {
          let currentDist = getDist(comparisons[k], comparisons[w], dist)
          if (currentDist < shorter) {
            desiredIndex = [j, k]
            shorter = currentDist
  } } } } }

  return desiredIndex
}

function joinMutual(array, groups) {
  let newGroup = []
  let connectedList = []

  for (let i = 0; i < array.length; i++) {
    let want = array[i][0]
    let newArray = []

    if (array[want][0] == i && !contains(want, connectedList)) {
      switch (true) {
        case (array[i][1] == 0 && array[want][1] == 0):
          groups[i].reverse()
          newArray = groups[i].concat(groups[want])
          break;

        case (array[i][1] == 0 && array[want][1] == 1):
          newArray = groups[want].concat(groups[i])
          break;

        case (array[i][1] == 1 && array[want][1] == 0):
          newArray = groups[i].concat(groups[want])
          break;

        case (array[i][1] == 1 && array[want][1] == 1):
          groups[i].reverse()
          newArray = groups[want].concat(groups[i])
          break;
      }
      connectedList.push(i, want)
    }

    if (newArray.length > 0)
      newGroup.push(newArray)
  }

  for (let i = 0; i < groups.length; i++)
    if (!contains(i, connectedList))
      newGroup.push(groups[i])

  return newGroup
}

function improveConnections(path, dist) {
  for (let i = 1; i < path.length - 2; i++) {
    let pointAback  = path[i - 1]
    let pointA      = path[i]
    let pointB      = path[i + 1]
    let pointBfront = path[i + 2]

    if ((getDist(pointAback, pointA,      dist) +
         getDist(pointA,     pointB,      dist) +
         getDist(pointB,     pointBfront, dist))
         >
        (getDist(pointAback, pointB,      dist) +
         getDist(pointB,     pointA,      dist) +
         getDist(pointA,     pointBfront, dist)))
    [path[i], path[i + 1]] = [path[i + 1], path[i]]
  }
  return path
}


function getDist(x, y, dist) {
  let d
  x > y ?
    d = dist[x][y] :
    d = dist[y][x]
  return d
}

function contains(elem, list) {
  for (let i = 0; i < list.length; i++)
    if (elem == list[i])
        return true
  return false
}
