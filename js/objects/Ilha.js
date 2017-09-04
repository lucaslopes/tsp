class Ilha {
  constructor(ponto) {
    this.pontos = ponto
    this.extremidades = []
    this.foiConectada = false
    this.maisPerto = [
      // posicao do meu ponto
      // posicao da Ilha,
      // posicao do Ponto pertencente a ilha
    ]
  }

  definaSuasExtremidades() {
    this.extremidades = []
    for (let i = 0; i < this.pontos.length; i++) {
      if (this.pontos[i].conexoes.length < 2)
        this.extremidades.push(i)
    }

  }

  definaSeuMaisPerto() {
    let maisPerto = Infinity
    let pontoMaisPerto = []

    for (let i = 0; i < this.extremidades.length; i++) {
      for (let j = 0; j < ilhas.length; j++) {
        if (this != ilhas[j]) {
          for (let k = 0; k < ilhas[j].extremidades.length; k++) {
            let distancia =
              this.pontos[this.extremidades[i]].qualDistanciaAte(
                ilhas[j].pontos[ilhas[j].extremidades[k]])

            if (maisPerto > distancia) {
              maisPerto = distancia
              pontoMaisPerto = [this.extremidades[i], j, ilhas[j].extremidades[k]]
            }
          }
        }
      }
    }
    this.maisPerto = pontoMaisPerto
  }

  voceEhCorrespondido() {
    if ((ilhas.indexOf(this) == ilhas[this.maisPerto[1]].maisPerto[1]) &&
      (this.maisPerto[0] == ilhas[this.maisPerto[1]].maisPerto[2]))
      return true
    else
      return false
  }

  conecteComSeuMelhor() {
    let novaIlha = []
    let posicaoMeuPonto = this.maisPerto[0]
    let posicaoPontoDele = ilhas[this.maisPerto[1]].maisPerto[0]

    switch (true) {
      case (posicaoMeuPonto > 0 && posicaoPontoDele == 0): // A + B
        novaIlha = this.pontos.concat(ilhas[this.maisPerto[1]].pontos)
        break;

      case (posicaoMeuPonto == 0 && posicaoPontoDele == 0): // A' + B
        this.pontos.reverse()
        novaIlha = this.pontos.concat(ilhas[this.maisPerto[1]].pontos)
        this.pontos.reverse()
        break;

      case (posicaoMeuPonto == 0 && posicaoPontoDele > 0): // B + A
        novaIlha = ilhas[this.maisPerto[1]].pontos.concat(this.pontos)
        break;

      case (posicaoMeuPonto > 0 && posicaoPontoDele > 0): // B'+ A
        this.pontos.reverse()
        novaIlha = ilhas[this.maisPerto[1]].pontos.concat(this.pontos)
        this.pontos.reverse()
        break;
    }

    this.foiConectada = true
    ilhas[this.maisPerto[1]].foiConectada = true

    this.pontos[posicaoMeuPonto].conexoes.push(posicaoPontoDele)
    ilhas[this.maisPerto[1]].pontos[posicaoPontoDele].conexoes.push(posicaoMeuPonto)

    this.pontos[posicaoMeuPonto].liga(
      ilhas[this.maisPerto[1]].pontos[posicaoPontoDele]
    )

    return novaIlha
  }
}
