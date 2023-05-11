const NumeroRandom = (max,min)=> {
    return Math.floor(Math.random() * (max-min +1) +(min) )
}
let nPistas = 0;
let dificultad = 28;
const ordenMostrarPistas = [3,4,5,0,1,2]
const tarjeta = document.querySelector(".tarjeta")
const listaCripto = document.querySelector(".listaCripto")
const input = document.querySelector("#ingresarCripto")
const mensajeJuego = document.querySelector(".mensajeJuego")
const pista = document.querySelector(".pista")
const reiniciar = document.querySelector(".reiniciar")
const criptoLista = listaCripto.children[0]
const BDificultad = document.querySelector(".dificultad")
dificultad = parseInt(BDificultad.value)
listaCripto.removeChild(criptoLista)
let respuestaJson
async function AsignarCripto() {
    if (!respuestaJson) {
        const respuesta = await fetch(`https://api.coinlore.net/api/tickers/?limit=28`)
        respuestaJson = await respuesta.json();
        respuestaJson = (respuestaJson.data)
    }
    console.log(respuestaJson)
    random = NumeroRandom(dificultad-1,0)
    cripto = respuestaJson[random]
    tarjeta.children[0].style.backgroundImage = `url("https://assets.coincap.io/assets/icons/${(cripto.symbol).toLowerCase()}@2x.png")`
    tarjeta.children[1].textContent= `${cripto.name}`
    tarjeta.children[2].textContent= `${cripto.symbol}`
    tarjeta.children[3].textContent = `Market cap: ${cripto.market_cap_usd}`
    tarjeta.children[4].textContent = `Ranking: ${cripto.rank}`
    tarjeta.children[5].textContent = `$${cripto.price_usd}`
    tarjeta.children[0].style.backgroundColor = "black"
    tarjeta.children[0].style.backgroundImage = ""
    tarjeta.children[1].style.backgroundColor = "black"
    tarjeta.children[2].style.backgroundColor = "black"
    tarjeta.children[3].style.backgroundColor = "black"
    tarjeta.children[4].style.backgroundColor = "black"
    tarjeta.children[5].style.backgroundColor = "black"
    tarjeta.children[5].style.color = "black"
    for(let i = 0; i<28;i++) {
        const nuevaLista = criptoLista.cloneNode(true)
        nuevaLista.children[0].src = `https://assets.coincap.io/assets/icons/${(respuestaJson[i].symbol).toLowerCase()}@2x.png`
        nuevaLista.children[1].textContent = respuestaJson[i].symbol
        nuevaLista.style.display = "none"
        nuevaLista.addEventListener("click",()=> {
            if (cripto.symbol == nuevaLista.children[1].textContent) {
                mensajeJuego.children[0].textContent = `¡Felicitaciones, la cripto era ${cripto.symbol}, acertaste!`
                mensajeJuego.children[0].style.color = "green"
            } else {
                mensajeJuego.children[0].textContent = `¡Error, no era esa cripto!`
                mensajeJuego.children[0].style.color = "red"
            }
        })
        listaCripto.appendChild(nuevaLista)
    }
}
function ListaInputs() {
    for (let i = 0;i<28;i++) {
        if ((respuestaJson[i].symbol).toLowerCase().startsWith(input.value.toLowerCase()) && input.value != "" ||  (respuestaJson[i].name).toLowerCase().startsWith(input.value.toLowerCase()) && input.value != "") {
            listaCripto.children[i].style.display = "flex"
        } else {
            listaCripto.children[i].style.display = "none"
        }
    }
}
function MostrarPista() {
    if (ordenMostrarPistas[nPistas] == 0) {
        tarjeta.children[ordenMostrarPistas[nPistas]].style.backgroundImage = `url("https://assets.coincap.io/assets/icons/${(cripto.symbol).toLowerCase()}@2x.png")`
        tarjeta.children[ordenMostrarPistas[nPistas]].style.backgroundColor = "transparent"
    } else if (nPistas == ordenMostrarPistas.length-2) {
        tarjeta.children[ordenMostrarPistas[nPistas]].style.backgroundColor = "transparent"
        tarjeta.children[ordenMostrarPistas[nPistas]+1].style.backgroundColor = "transparent"
        pista.removeEventListener("click",MostrarPista)
    } else {
        tarjeta.children[ordenMostrarPistas[nPistas]].style.backgroundColor = "transparent"
    }
    nPistas++
}
function ReiniciarCripto() {
    nPistas = 0;
    while(listaCripto.firstChild) {
        listaCripto.removeChild(listaCripto.firstChild)
    }
    pista.addEventListener("click",MostrarPista)
    AsignarCripto()
}
function CambiarDificultad() {
    dificultad = parseInt(BDificultad.value)
    console.log(dificultad)
}
AsignarCripto()
input.addEventListener("input",ListaInputs)
pista.addEventListener("click",MostrarPista)
reiniciar.addEventListener("click",ReiniciarCripto)
BDificultad.addEventListener("change",CambiarDificultad)