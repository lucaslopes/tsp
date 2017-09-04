const numOfCities = prompt('How many cities?')  // Quantidade de cidades a percorrer
let paths = [] // array que armazena os caminhos já percorridos
let cities = [] // array que armazena as cidades
let roads = [] // array que armazena todas as vias possíveis

// Função principal
function setup() {
  createScenario()
  initializeCities()
  connectCities()
  createPath()
}
