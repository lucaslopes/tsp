function crieAmbiente() {
  canvas = createCanvas(windowWidth, windowHeight);
  background(51)
}

function carregueIlhas() {
  for (let i = 0; i < numeroDePontos; i++) {
    ilhas.push(new Ilha([
      new Ponto(
        random(20, width - 20),
        random(20, height - 20), i
      )
    ]))
    ilhas[i].pontos[0].exibe()
  }
}

function acheMelhorDeCadaIlha() {
  for (let i = 0; i < ilhas.length; i++)
    ilhas[i].definaSuasExtremidades()
  for (let i = 0; i < ilhas.length; i++)
    ilhas[i].definaSeuMaisPerto()
}

function conecteOsQuePossuemMelhorEmComum() {
  let novasIlhas = []

  for (let i = 0; i < ilhas.length; i++) {
    if ((!ilhas[i].foiConectada) && (ilhas[i].voceEhCorrespondido())) {
      let vet = ilhas[i].conecteComSeuMelhor();
      novasIlhas.push(new Ilha(vet))
    }
  }

  for (let i = 0; i < ilhas.length; i++)
    if (!ilhas[i].foiConectada)
      novasIlhas.push(new Ilha(ilhas[i].pontos))

  ilhas = novasIlhas
}


function acheOndeComecaOPonto(ponto) {
  let numeroInicial = numeroDePontos
  let resultado = 0

  for (i = 0; i < ponto; i++)
    resultado += numeroInicial--

    return resultado
}

function qualqualDistanciaAteanciaEntre(pontoA, pontoB) {
  if (pontoA <= pontoB)
    return (acheOndeComecaOPonto(pontoA) + (pontoB - pontoA))
  else
    return (acheOndeComecaOPonto(pontoB) + (pontoA - pontoB))
}

function refinarConexoes() {
  for (let i = 1; i < ilhas.length - 2; i++) {
    let ilhaAnterior = ilhas[i - 1];
    let ilhaA = ilhas[i];
    let ilhaB = ilhas[i + 1];
    let ilhaPosterior = ilhas[i + 2];

    if ((ilhaAnterior.qualDistanciaAte(ilhaA) +
        ilhaA.qualDistanciaAte(ilhaB) +
        ilhaB.qualDistanciaAte(ilhaPosterior)) >
      (ilhaAnterior.qualDistanciaAte(ilhaB) +
        ilhaB.qualDistanciaAte(ilhaA) +
        ilhaA.qualDistanciaAte(ilhaPosterior))) {
      [ilhas[i], ilhas[i + 1]] = [ilhas[i + 1], ilhas[i]];
    }
  }
}

function desenharCaminho() {
  stroke(255)
  noFill()
  beginShape()
  for (var i = 0; i < ilhas.length; i++) {
    vertex(ilhas[i].posicao.x, ilhas[i].posicao.y)
  }
  endShape()
}

function mouse() {
  acheMelhorDeCadaIlha()
  conecteOsQuePossuemMelhorEmComum()
}

// function theyCross (points) {
//   let distA = points[1].dist(points[0]);
//   let distB = points[3].dist(points[2]);
//   let distances = [];
//
//   for (let i = 0; i < points.length - 1; i++)
//     for (let j = i + 1; j < points.length; j++)
//       distances.push(points[i].dist(points[j]));
//
//   distances.increase();
//
//   if ((distA == distances[distances.length - 1]) ||
//       (distB == distances[distances.length - 1]))
//        return true;
// }
//
// function crossLines (indices) {
//   let lesserIndex = indices[0];
//   let biggerIndex = indices[0];
//
//   for (var i = 1; i < indices.length; i++) {
//     if (lesserIndex > indices[i]) lesserIndex = indices[i];
//     if (biggerIndex < indices[i]) biggerIndex = indices[i];
//   }
//
//   let actualDist = 0;
//   for (var i = lesserIndex; i < biggerIndex; i++)
//     actualDist += cities[path[i + 1]].pos.dist(cities[path[i]].pos);
//
//   let partition = path.slice(lesserIndex + 1, biggerIndex);
//   partition.reverse();
//
//   let newArray = path.slice();
//   newArray.splice(lesserIndex + 1, (biggerIndex - lesserIndex) - 1, ...partition);
//
//   let newDist = 0;
//   for (var i = lesserIndex; i < biggerIndex; i++)
//     newDist += cities[newArray[i + 1]].pos.dist(cities[newArray[i]].pos);
//
//   if (newDist < actualDist)
//     path = newArray.slice();
// }


// Antes de Adicionar uma nova conexão
//   Verifique se a linha adicionada cruza com alguém
//     Se não cruzar
//       Adicione normalmente
//     Se cruzar:
//       Faça o Swap
//
// Swap:
//   Coloca normalmente
//   Inverte a posição dos extremos (mantém entre eles)
