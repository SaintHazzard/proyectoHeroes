
let mainC = document.querySelector('main')
let dataHeroes;
const arrayHeroes = []
class ObjectHeroe {
  constructor(nombre, descripcion, fecha, foto) {
    this.nombre = nombre
    this.descripcion = descripcion
    this.fecha = fecha
    this.foto = foto
  }
}



async function getData() {
  const response = await fetch('/storage/empresas/datos.json');
  const universos = await response.json();
  return universos;
}

(async () => {
  try {
    dataHeroes = await getData();
    for (const keyUniverso in dataHeroes) {
      let tempContent = document.createElement('div')
      tempContent.classList.add(`${keyUniverso}`)
      let logo = document.createElement('div')
      let img = document.createElement('img')
      img.src = `source/${keyUniverso}`
      logo.appendChild(img)
      tempContent.appendChild(logo)
      for (const heroe of dataHeroes[keyUniverso]) {
        // arrayHeroes.push(new ObjectHeroe(heroe.nombre, heroe.descripcion, heroe.fecha, heroe.foto))
        let baseCard = `<div class="card">
          <div class="imagen">
            <img src="${heroe.src}" alt="heroe" />
          </div>
          <div>
            <h2>${heroe.nombre}</h2>
            <button>Ver</button>
          </div>
        </div>`
        let tempDivCard = document.createElement('div')
        tempDivCard.innerHTML = baseCard
        let nodoCard = tempDivCard.firstChild
        tempContent.appendChild(nodoCard)
      }
      mainC.appendChild(tempContent)
    }
  } catch (error) {
    console.error('Error en la obtención de datos:', error);
  }
})();





