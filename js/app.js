
let bodyM = document.querySelector('body')
let dataHeroes;
const arrayHeroes = []
class ObjectHeroe {
  constructor(nombre, descripcion, fecha, foto, cardHtml, universo) {
    this.nombre = nombre
    this.descripcion = descripcion
    this.fecha = fecha
    this.foto = foto
    this.cardHtml = cardHtml
    this.universo = universo
    this.mostrarInfo = this.mostrarInfo.bind(this);

    this.cardHtml.querySelector(".botonVer").addEventListener('click', this.mostrarInfo);
  }
  mostrarInfo() {
    document.getElementById('modalTitle').textContent = this.nombre;
    document.getElementById('modalDescription').textContent = this.descripcion;
    document.getElementById('modalFecha').textContent = this.fecha
    document.getElementById('myModal').style.display = 'flex';
    document.querySelector(".imgModal").src = this.foto
    document.querySelector('.close').classList.add(`${this.universo}`)
  }
}


function crearCartas(array, universo) {
  let cajaCartas = document.createElement("div")
  cajaCartas.classList.add("cards")
  for (const heroe of array) {
    let baseCard = `
        <div class="card">
          <div class="imagen">
            <img src="${heroe.foto}" alt="heroe" />
          </div>
          <div class="info">
            <h3>${heroe.nombre}</h3>
            <button class="botonVer">Ver</button>
          </div>
        </div>`
    let tempDiv = document.createElement('div')
    tempDiv.innerHTML = baseCard;

    let nodo = tempDiv.firstElementChild
    cajaCartas.appendChild(nodo)
    arrayHeroes.push(new ObjectHeroe(heroe.nombre, heroe.descripcion, heroe.fecha_lanzamiento, heroe.foto, nodo, universo))

  }
  return cajaCartas
}



async function getData() {
  const response = await fetch('./storage/empresas/datos.json');
  const universos = await response.json();
  return universos;
}

(async () => {
  try {
    dataHeroes = await getData();
    for (const keyUniverso in dataHeroes) {
      let tempContent = document.createElement('main')
      tempContent.classList.add(`${keyUniverso}`)
      if (keyUniverso == 'heroes_dc') {
        tempContent.classList.add('inactive')
      }
      let cajaCartas = crearCartas(dataHeroes[keyUniverso], keyUniverso)
      tempContent.appendChild(cajaCartas)
      bodyM.appendChild(tempContent)
    }
    addEventsUniverse()
  } catch (error) {
    console.error('Error en la obtención de datos:', error);
  }
  console.log('1');

})();


(async () => {
  try {
    document.querySelector('.close').addEventListener('click', function () {
      document.getElementById('myModal').style.display = 'none';
      let elemento = document.querySelector('.close')
      // Quitar todas las clases del elemento con clase 'close'
      elemento.classList.remove(...elemento.classList);
      elemento.classList.add('close')
    });

    window.addEventListener('click', function (event) {
      if (event.target === document.getElementById('myModal')) {
        document.getElementById('myModal').style.display = 'none';
      }
    });
  } catch (error) {
    console.error('Error en la obtención de datos:', error);
  }
  console.log('2');
})();


document.getElementById('inputBusqueda').addEventListener('input', buscar)

function buscar() {
  var input = document.getElementById('inputBusqueda');
  var filter = input.value.toUpperCase();

  for (let i = 0; i < arrayHeroes.length; i++) {

    if (arrayHeroes[i].nombre.toUpperCase().includes(filter)) {
      arrayHeroes[i].cardHtml.style.display = 'flex'
    } else {
      arrayHeroes[i].cardHtml.style.display = 'none'
    }
  }
}



function addEventsUniverse() {
  let divLogo = document.querySelector('.logo')
  let containerDC = document.querySelector('.heroes_dc')
  let containerMarvel = document.querySelector('.Marvel_Logo')
  // let headM = document.querySelector('header')
  let bodyM = document.querySelector('html')
  document.querySelector('.logoDC').addEventListener('click', () => {
    if (containerDC.classList.contains('inactive')) {
      divLogo.classList.toggle('logoReverse');
      containerMarvel.classList.toggle('inactive');
      containerDC.classList.toggle('inactive');
      // headM.classList.toggle('heroes_dc')
      bodyM.classList.add("DC")
      bodyM.classList.remove("Marvel")
    }
  });
  document.querySelector('.logoMarvel').addEventListener("click", () => {

    if (containerMarvel.classList.contains('inactive')) {
      divLogo.classList.toggle('logoReverse');
      containerMarvel.classList.toggle('inactive');
      containerDC.classList.toggle('inactive');
      bodyM.classList.add("Marvel")
      bodyM.classList.remove("DC")
    }
    // headM.classList.toggle('heroes_dc')


  });

}



