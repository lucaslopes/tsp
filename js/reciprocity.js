let distances = []
let groups = []

function agrupamentoReciprocidade(dist) {
  dist.splice(0, 0, [Infinity])
  distances = dist
  for (let i = 0; i < distances.length; i++)
    groups.push([i])

  while (groups.length > 1) {
    let reciprocity = []
    for (let i = 0; i < groups.length; i++)
      reciprocity.push(findChosen(i))
    acheParidades(reciprocity)
  }

  return groups[0]
}

function findChosen(i) {
  let menor = Infinity
  let linhaDesejada = [
    // índice da linha
    // por onde conectar (0 = inicio / 1 = final)
  ]
  let comparacoes = [
    groups[i][0],
    groups[i][groups[i].length - 1]
  ]

  for (let j = 0; j < groups.length; j++) {
    comparacoes.splice(2, 2)

    if (i != j) {
      comparacoes.push(groups[j][0])
      comparacoes.push(groups[j][groups[j].length - 1])

      for (let k = 0; k < 2; k++) {
        for (let w = 2; w < 4; w++) {
          let distAtual = distanceBetween(comparacoes[k], comparacoes[w])
          if (distAtual < menor) {
            linhaDesejada = [j, k]
            menor = distAtual
    } } } } }

    return linhaDesejada
}

function distanceBetween(x, y) {
  let distAtual
  x > y ?
    distAtual = distances[x][y] :
    distAtual = distances[y][x]
  return distAtual
}

function acheParidades(vet) {
  let newGroup = []
  let listaUnidos = []

  for (let i = 0; i < vet.length; i++) {
    let want = vet[i][0]
    let newVet = []

    if (vet[want][0] == i && !pertence(want, listaUnidos)) {
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
    if (!pertence(i, listaUnidos))
      newGroup.push(groups[i])

  groups = newGroup
}

function pertence(elem, lista) {
  for (let i = 0; i < lista.length; i++)
    if (elem == lista[i])
        return true
  return false
}
