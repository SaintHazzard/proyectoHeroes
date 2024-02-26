
let bodyM = document.querySelector('body')
let dataHeroes;
const arrayHeroes = []
class ObjectHeroe {
  constructor(nombre, descripcion, fecha, foto, cardHtml) {
    this.nombre = nombre
    this.descripcion = descripcion
    this.fecha = fecha
    this.foto = foto
    this.cardHtml = cardHtml

    this.mostrarInfo = this.mostrarInfo.bind(this);

    this.cardHtml.querySelector(".botonVer").addEventListener('click', this.mostrarInfo);
  }
  mostrarInfo() {
    console.log(`Hola soy ${this.nombre}`);
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
      let tempContent = document.createElement('main')
      tempContent.classList.add(`${keyUniverso}`)
      let logo = document.createElement('div')
      logo.classList.add("logo")
      let img = document.createElement('img')
      img.src = `source/${keyUniverso}.svg`
      logo.appendChild(img)
      tempContent.appendChild(logo)
      let cajaCartas = document.createElement("div")
      cajaCartas.classList.add("cards")
      for (const heroe of dataHeroes[keyUniverso]) {
        // arrayHeroes.push(new ObjectHeroe(heroe.nombre, heroe.descripcion, heroe.fecha, heroe.foto))
        let baseCard = `
        <div class="card">
          <div class="imagen">
            <img src="${heroe.foto}" alt="heroe" />
          </div>
          <div class="info">
            <h2>${heroe.nombre}</h2>
            <button class="botonVer">Ver</button>
          </div>
        </div>`
        let tempDiv = document.createElement('div')
        // console.log(tempDiv);

        tempDiv.innerHTML = baseCard;

        let nodo = tempDiv.firstElementChild
        cajaCartas.appendChild(nodo)
        arrayHeroes.push(new ObjectHeroe(heroe.nombre, heroe.descripcion, heroe.fecha_lanzamiento, heroe.foto, nodo))
      }
      tempContent.appendChild(cajaCartas)
      bodyM.appendChild(tempContent)
    }
  } catch (error) {
    console.error('Error en la obtención de datos:', error);
  }
})();





