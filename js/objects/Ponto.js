class Ponto {
  constructor(posX, posY, num) {
    this.numero = num
    this.posicao = createVector(posX, posY)
    this.conexoes = []
    this.maisProximos = []
    this.tamanho = 10 //map(numeroDePontos, 250, 1, 3, 15)
  }

  exibe() {
    stroke(175)
    fill(255)
    ellipse(this.posicao.x, this.posicao.y, this.tamanho, this.tamanho)
    // text(this.numero, this.posicao.x - 20, this.posicao.y - 20)
  }

  qualDistanciaAte(outroPonto) {
    return this.posicao.dist(outroPonto.posicao)
  }

  liga(outroPonto) {
    line(this.posicao.x, this.posicao.y, outroPonto.posicao.x, outroPonto.posicao.y)
  }
}
