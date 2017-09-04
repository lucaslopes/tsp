function createScenario() {
  createCanvas(windowWidth, windowHeight) // Cria o Canvas e delimita a área
  background(51) // Define a cor de fundo
}

// Cria X novas cidades e armazena no array de cidades
function initializeCities() {
  for (let i = 0; i < numOfCities; i++) { // Vai até o número de cidades definido
    cities[i] = new City(i, random(width), random(height)) // Cada cidade, um index e um lugar aleatório
    cities[i].show() // Mostra a cidade no Canvas
    cities[i].showNumber() // Mostra o número da Cidade
  }
}

// Armazena todas as possíveis rotas entre cidades no array de Roads
function connectCities() {
  for (let i = 0; i < cities.length - 1; i++) // Vai até a penúltima cidade
    for (let j = i + 1; j < cities.length; j++) // Para cada uma posterior a atual
      roads.push(new Road(cities[i], cities[j])) // Cria uma nova via ligando as cidades
  sortRoads()
}

// Organiza a posição das vias em ordem crescente, de acordo com a distância delas
function sortRoads() {
  roads.sort((a, b) => parseFloat(a.d) - parseFloat(b.d))
}

// Verifica se pode criar um caminho e o exibe
function createPath() {
  for (let i = 0; i < roads.length; i++) { // Para cada uma das possíveis vias
    if (roads[i].cityA.connections < 2 && // Se o número de conexões da primeira cidade for menor que 2
        roads[i].cityB.connections < 2 && // Se o número de conexões da segunda cidade for menor que 2
        itWillNotClose(roads[i].cityA.index, roads[i].cityB.index)) // Verifica se a via não vai retornar para si
    {
      roads[i].cityA.connections++ // add o número de conexões da primeira cidade
      roads[i].cityB.connections++ // add o número de conexões da segunda cidade
      roads[i].show() // Mostra a via no Canvas
    }
  }
}

// Recebe duas cidades e verifica se o caminho entre elas não vai fechar
function itWillNotClose(cityA, cityB) {
  let indices = [] // Rotas que possuem 1 cidade igual as cidades analisadas
  let pathsLength = paths.length

  if (pathsLength == 0) { // Se ainda não houver rotas
    paths.push([cityA, cityB]) // Adiciona a nova rota
    return true // Retorna verdadeiro
  } else { // Caso já tenhas rotas no array Path
    for (let i = 0; i < pathsLength; i++) { // Percorra cada um das rotas
      let count = paths[i].counter(cityA, cityB) // Guarde quantas repetições houveram no array da vez
      if (count == 2) return false // Se forem 2 repetições, interrompe a função e retorna falso
      if (count == 1) indices.push(i) // Se for uma, guarda o indice deste array
    }
  }

  let indicesLength = indices.length

  // Se em nenhum caminho houve repetição, cria um novo caminho com as cidades
  if (indicesLength == 0) {
    paths.push([cityA, cityB])
    return true
  }

  // Se apenas um array houve uma repetição, add a cidade neste array
  if (indicesLength == 1) {
    if (!add(indices[0], cityA, cityB)) return false
    else return true
  }

  // Se dois arrayes tiveram uma repetição, una-os
  if (indicesLength == 2) {
    if (!merge(indices[0], indices[1], cityA, cityB)) return false
    else return true
  }
}

function add(index, cityA, cityB) {
  let array = paths[index]

  if (cityA == array[0]) {
    paths[index].unshift(cityB)
    return true
  }

  if (cityB == array[0]) {
    paths[index].unshift(cityA)
    return true
  }

  let lastPosition = array.length - 1

  if (cityA == array[lastPosition]) {
    paths[index].push(cityB)
    return true
  }

  if (cityB == array[lastPosition]) {
    paths[index].push(cityA)
    return true
  }

  else return false
}

function merge(indexA, indexB, cityA, cityB) {
  let arrayA = paths[indexA]
  let arrayB = paths[indexB]

  if ((cityA == arrayA[0] && cityB == arrayB[0]) ||
      (cityB == arrayA[0] && cityA == arrayB[0]))
  {
    arrayB.reverse()
    paths[indexA] = arrayB.concat(arrayA)
    paths.splice(indexB, 1)
    return true
  }

  let lastPositionA = arrayA.length - 1
  let lastPositionB = arrayB.length - 1

  if ((cityA == arrayA[0] && cityB == arrayB[lastPositionB]) ||
      (cityB == arrayA[0] && cityA == arrayB[lastPositionB]))
  {
    paths[indexA] = arrayB.concat(arrayA)
    paths.splice(indexB, 1)
    return true
  }

  if ((cityA == arrayA[lastPositionA] && cityB == arrayB[0]) ||
      (cityB == arrayA[lastPositionA] && cityA == arrayB[0]))
  {
    paths[indexA] = arrayA.concat(arrayB)
    paths.splice(indexB, 1)
    return true
  }

  if ((cityA == arrayA[lastPositionA] && cityB == arrayB[lastPositionB]) ||
      (cityB == arrayA[lastPositionA] && cityA == arrayB[lastPositionB]))
  {
    arrayB.reverse() // Inverte a ordem do vetor
    paths[indexA] = arrayA.concat(arrayB)
    paths.splice(indexB, 1) // Remove o B
    return true
  }

  else return false
}

/*
  ALGORITMO OTIMIZADOR

  TROCA
  Indo de duas em duas cidades
    Compara a rota maior de ambas
      Se a maior de ambas nao for a que liga eles
        Troca as maiores entre essas cidades
          Compara a troca com a anterior
            Se for melhor mantem, se nao, volta

  MELHOR ROTA
  Caso duas linhas se cruzem
  Pegue as duas cidades da primeira linha e as duas da segunda
  dentre essas 4 cidades, verifique as que estao mais na extremidade do paths
  Pegue as duas cidades
    se entre elas tiver < 5 cidades aplica a formula
      Seguindo o fluxo (cidades após a primeira, cidades antes da segunda)
        liga cidadeA com a mais proxima dela
        liga cidadeB com a mais proxima dela
        completa a ligação usando o algoritmo padrao (valoriza menor rota)
*/
