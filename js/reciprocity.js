let distances = []
let groups = []

function terceiraEtapa(dist) {
  dist.splice(0, 0, [Infinity])
  distances = dist

  for (let i = 0; i < distances.length; i++)
    groups.push([i])

  return agrupamentoReciprocidade()
}

function agrupamentoReciprocidade() {
  while (groups.length > 1) {
    let reciprocity = []

    for (let i = 0; i < groups.length; i++)
      reciprocity.push(findChosen(i))

    acheParidades(reciprocity)
  }
}

function findChosen(i) {

  let linhaDesejada = [
    // índice da linha
    // por onde conectar (0 = inicio / 1 = final)
  ]
  let menor = Infinity
  let comparacoes = []

  comparacoes.push(groups[i][0])
  comparacoes.push(groups[i][groups[i].length - 1])

  for (let j = 0; j < groups.length; j++) {

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

function acheParidades(reciprocity) {
  // se casar
  // una()
}
