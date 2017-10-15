function agrupamentoReciprocidade(dist) {
  dist.splice(0, 0, [Infinity])

  let groups = []
  for (let i = 0; i < dist.length; i++)
    groups.push([i])

  while (groups.length > 1) {
    let reciprocity = []
    for (let i = 0; i < groups.length; i++)
      reciprocity.push(findChosen(i, groups, dist))
    groups = acheParidades(reciprocity, groups)
  }

  return improveConnections(groups[0], dist)
}

function findChosen(i, groups, dist) {
  let menor = Infinity
  let comparacoes = [
    groups[i][0],
    groups[i][groups[i].length - 1]
  ]
  let linhaDesejada = [
    // índice da linha
    // por onde conectar (0 = inicio / 1 = final)
  ]

  for (let j = 0; j < groups.length; j++) {
    if (i != j) {
      comparacoes[2] = groups[j][0]
      comparacoes[3] = groups[j][groups[j].length - 1]

      for (let k = 0; k < 2; k++) {
        for (let w = 2; w < 4; w++) {
          let distAtual = getDist(comparacoes[k], comparacoes[w], dist)
          if (distAtual < menor) {
            linhaDesejada = [j, k]
            menor = distAtual
  } } } } }

  return linhaDesejada
}

function acheParidades(vet, groups) {
  let newGroup = []
  let listaUnidos = []

  for (let i = 0; i < vet.length; i++) {
    let want = vet[i][0]
    let newVet = []

    if (vet[want][0] == i && !contains(want, listaUnidos)) {
      switch (true) {
        case (vet[i][1] == 0 && vet[want][1] == 0):
          groups[i].reverse()
          newVet = groups[i].concat(groups[want])
          break;

        case (vet[i][1] == 0 && vet[want][1] == 1):
          newVet = groups[want].concat(groups[i])
          break;

        case (vet[i][1] == 1 && vet[want][1] == 0):
          newVet = groups[i].concat(groups[want])
          break;

        case (vet[i][1] == 1 && vet[want][1] == 1):
          groups[i].reverse()
          newVet = groups[want].concat(groups[i])
          break;
      }
      listaUnidos.push(i, want)
    }

    if (newVet.length > 0)
      newGroup.push(newVet)
  }

  for (let i = 0; i < groups.length; i++)
    if (!contains(i, listaUnidos))
      newGroup.push(groups[i])

  return newGroup
}

function improveConnections(path, dist) {
  for (let i = 1; i < path.length - 2; i++) {
    let pointAconec = path[i - 1]
    let pointA      = path[i]
    let pointB      = path[i + 1]
    let pointBconec = path[i + 2]

    if ((getDist(pointAconec, pointA, dist) +
         getDist(pointA, pointB, dist) +
         getDist(pointB, pointBconec, dist))
         >
        (getDist(pointAconec, pointB, dist) +
         getDist(pointB, pointA, dist) +
         getDist(pointA, pointBconec, dist)))
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
