const armarCarrito = ()=>{
    //limpiamos el carrito
    listasComprar.innerHTML = ""

    //creamos el carrito
    listasComprar.style.display="flex"
    let listasProductosComprar =document.createElement("div")
    listasProductosComprar.className = "listaProductosComprar"
    listasProductosComprar.innerHTML = `<h1 class="titulo"> Carrito </h1>`

    listasComprar.append(listasProductosComprar)

    const listaBtnCerrar = document.createElement ("h2")
    listaBtnCerrar.innerText = "X"
    listaBtnCerrar.className ="cerrarLista"
    
    
    //cerrar carrito
    listaBtnCerrar.addEventListener('click',() =>{
        listasComprar.style.display = "none"
    })
    
    listasProductosComprar.append(listaBtnCerrar);
    

    //render carrito por cada producto comprado
    llenar_carrito.forEach((producto) =>{
        //validar si es el mismo item

        let contenidoDelCarrito = document.createElement("div")
        contenidoDelCarrito.className = "contenidoDelCarrito"
        contenidoDelCarrito.innerHTML =`
        <img class="imagenProductoCarrito" src="${producto.imagen}">
        <h3 class="nombreProductoCarrito">${producto.nombre}</h3>         
        <p class="precioProductoCarrito">$ ${producto.precio}</p>
        <p class="cantProductoCarrito">Cant: ${producto.cantidad}</p>
        <span class ="menosUnidad"> ➖ </span>
        <span class ="masUnidad"> ➕ </span>
        <p class="cantProductoCarrito">Total $ ${producto.cantidad*producto.precio}</p>
        <span class ="eliminarProducto"> ✖️ </span>
        `
    
        listasComprar.append(contenidoDelCarrito); 

        //Disminuir las cantidades del producto
        let dismCantidad = contenidoDelCarrito.querySelector(".menosUnidad")
        dismCantidad.addEventListener("click", () =>{
            if(producto.cantidad !== 1 ){
                producto.cantidad--
            }
            guardarDatos()
            armarCarrito()
        })

        //Aumentar la cantidad del producto
        let aumentCantidad = contenidoDelCarrito.querySelector(".masUnidad")
        aumentCantidad.addEventListener("click", () =>{            
            producto.cantidad++
            
            //cambiar el limite de unidades 
            guardarDatos()
            armarCarrito()
        })

        let eliminarProducto = contenidoDelCarrito.querySelector(".eliminarProducto")
        eliminarProducto.addEventListener('click', ()=>{
            eliminarProd(producto.id)
        })

    })

    //----VACIAR CARRITO
    
    const vaciarCarrito = document.createElement ("div");
    vaciarCarrito.innerHTML = `<buttom><p>Vaciar Carrito</p></buttom>`
    vaciarCarrito.innerText =" Vaciar "
    vaciarCarrito.className = "vaciarCarrito"
   
    listasComprar.append(vaciarCarrito);

    vaciarCarrito.addEventListener('click',() =>{
        console.log("logrado")
        llenar_carrito = []
        listasComprar.innerHTML = ""
        contCarrito()
        guardarDatos(llenar_carrito)
    })

    const total = llenar_carrito.reduce((acc,el) => acc + el.precio * el.cantidad, 0)

    const totalCarrito = document.createElement('div')
    totalCarrito.className = "totalCarrito"
    totalCarrito.innerHTML = `Total a pagar: $ ${total} - Dolar Blue💲: ${(total/valorBlue).toFixed(2)}`
    guardarDatos(llenar_carrito)
    listasComprar.append(totalCarrito)
    
};
verCompra.addEventListener('click', armarCarrito)

const eliminarProd = (id)=>{
    const encontrarId = llenar_carrito.find((element)=>element.id === id)

    llenar_carrito = llenar_carrito.filter((carritoId) => {
        return carritoId !== encontrarId

    });
    
    armarCarrito()
    contCarrito()
}


function guardarDatos(llenar_carrito){
    
    localStorage.setItem('llenar_carrito',JSON.stringify(llenar_carrito))    
}   

//carritoContador
const contCarrito = () => {
    cantItemsCarrito.style.display = "block"
    cantItemsCarrito.innerText = llenar_carrito.length
}


//funcionalidad dolar hacer un boton que pase valores a dolar blue
//tambien puede ser una api del clima