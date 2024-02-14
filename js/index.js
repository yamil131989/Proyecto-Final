const productosVenta = document.getElementById("productosVenta")
const verCompra = document.getElementById("verCompra")
const listasComprar = document.getElementById("listasComprar")
let valorBlue = ''
let valorDolar = ''
const cantItemsCarrito = document.getElementById("cantItemsCarrito")



//productos.json
const obtenerProductos = async () => {
  const response = await fetch("./js/productos.json")
  const data = await response.json()

  //render productos
  data.forEach((producto)=>{
    let tarjetas = document.createElement("div")
    tarjetas.className = "tarjeta"
    tarjetas.innerHTML = `
    <img class="imagenProducto" src="${producto.imagen}">
    <h3 class="nombreProducto">${producto.nombre}</h3>
    <h4 class="descProducto">${producto.descripcion}</h4>
    <p class="precioProducto">$ ${producto.precio}</p>
    <button class="idProducto" id= "${producto.id}">Agregar</button>
    `

    productosVenta.append(tarjetas)

    let btnComprar = document.createElement("button");
    btnComprar.innerText = "Comprar"
    btnComprar.className = "btnComprar"

    tarjetas.append(btnComprar)

    //notificacion agregado al carrito
    btnComprar.addEventListener("click", ()=>{
        Toastify({
            text: "Su producto fue agregado al carrito",
            gravity: "top", // `top` or `bottom`
            position: "right", 
            stopOnFocus: true, 
            className: "info",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onclick:
            
            prodRepetido(llenar_carrito,producto)
        }).showToast();
        
    });

});
contCarrito()

}

obtenerProductos()

//testeando prod repetido
function prodRepetido(llenar_carrito,producto) {
 
  const repetido = llenar_carrito.some((prodRepe) => prodRepe.id === producto.id)
  
  //validar si esta repetido el producto
  if (repetido) {
    llenar_carrito.map((prod) => {
      if(prod.id === producto.id){
        prod.cantidad++
      }
    })
  } else {
    llenar_carrito.push({
      id: producto.id,
      imagen: producto.imagen,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: producto.cantidad
    })
  }
  contCarrito()
  armarCarrito() 
}

//Traemos los productos del carrito en el localstorage si este tiene
let llenar_carrito = JSON.parse(localStorage.getItem('llenar_carrito'))|| [];


//Funcionalidad mostrar valor de referencia dolar 

const dolarhoy = document.querySelector(".contenedorApi")

fetch("https://dolarapi.com/v1/dolares/mayorista")
  .then(response => response.json())
  .then(data => mostrarApi(data) )
  .catch(error =>console.log("surgio un error"))
  

function mostrarApi(data){ 

    const div = document.createElement("div")
    div.className = "dolarHoy"
    div.innerHTML = `
    <h3> Dolar Oficial $ ${data.compra}</h3>`
    dolarhoy.append(div)
    valorDolar = parseInt(data.compra) 
}

fetch("https://dolarapi.com/v1/dolares/blue")
  .then(response => response.json())
  .then(data => mostrarApiB(data) )
  .catch(error =>console.log("surgio un error"+error))


function mostrarApiB(data){ 

  const div = document.createElement("div")
  div.className = "dolarHoy"
  div.innerHTML = `
  <h3> Dolar Blue $ ${data.compra}</h3>`
  dolarhoy.append(div)
  valorBlue = parseInt(data.compra)
}


// 


