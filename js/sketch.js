const numeroDePontos = prompt('Quantos pontos?')
let ilhas = []
let canvas

function setup() {
  crieAmbiente()
  carregueIlhas()

  // while(ilhas.length > 1) {
  //     acheMelhorDeCadaIlha()
  //     conecteOsQuePossuemMelhorEmComum()
  // }
  //
  // ilhas = ilhas[0].pontos
  // refinarConexoes()
  // desenharCaminho()
  canvas.mouseClicked(mouse);
}
