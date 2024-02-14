//
const contenedorApiIP = document.querySelector(".contenedorApiIP")

let ipAddress = ''

//api obtener ip
fetch('https://api.ipify.org/?format=json')
    .then(result => result.json())
    .then(data => ObtenerIP(data))
    .catch(error => console.log("surgio un error "+error))

function ObtenerIP(data){
    ipAddress = data.ip
}



// obtener informacion sobre ip
 
let url = 'https://freeipapi.com/api/json/'+ipAddress // to get specific ip's info


fetch(url)
    .then(response => response.json())
    .then(data => infoIP(data))

    .catch(error =>console.log("surgio un error "+error))


function infoIP(data){
    const div = document.createElement("div")
    div.className = "infoIP"
    div.innerHTML = `
    <h2> Bienvenido Visitante </h2>
    <p> Tu ip es: ${data.ipAddress}</p>
    <p class="ipPais"> ${data.countryName}</p>
    <p class="ipCiudad"> ${data.cityName}</p>
    <p class="ipRegion"> ${data.regionName}</p>
    <p class="ipMap"> ${data.latitude} ${data.longitude}</p>
    `
    contenedorApiIP.append(div)
    
}



// Get the modal Login
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
