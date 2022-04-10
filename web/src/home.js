//contenedor padre de filtro y listaProductos
let con = document.getElementById('con')

//categorias
let bebidaEnergetica = document.getElementById('1');
let pisco = document.getElementById('2');
let ron = document.getElementById('3');
let bebida = document.getElementById('4');
let snack = document.getElementById('5');
let cerveza = document.getElementById('6');
let vodka = document.getElementById('7');
//contenedor de los productos
let contenedor = document.getElementById('listaProductos');
//input del buscador
let buscar= document.getElementById("buscar")

//trae los datos de la BD sin filtrar
url="http://localhost:3000/producto/"
fetch(url)
.then(data=> data.json())
.then(data=>{
    mostrarDatos(data)
})
.catch(error => console.log(error))

//trae los datos por categoria
let click= document.querySelectorAll(".tipo").forEach(el => {
    el.addEventListener("click", e => {
      let cate = e.target.getAttribute("id");
      console.log("Se ha clickeado el id "+cate);
      listaProductos.parentNode.removeChild(listaProductos)
    
        url=`http://localhost:3000/${cate}`
        fetch(url)
        .then(data=> data.json())
        .then(data=>{
            mostrarDatos(data)
            
        })
        .catch(error => console.log(error))
    }); 
    
});



//busca un item en espacifico
buscar.addEventListener('keydown', (e) => {
    if (e.key === "Enter"){ 
        listaProductos.parentNode.removeChild(listaProductos)
    
        url=`http://localhost:3000/producto/${buscar.value}`
        fetch(url)
        .then(data=> data.json())
        .then(data=>{
            mostrarDatos(data)
            
        })
        .catch(error => console.log(error))
    }
})



















//renderiza los datos por pantalla
function mostrarDatos(data){
    

    if(!validado()){
        console.log("estoy dentro del if")
        const listaProductos = document.createElement("div")
        listaProductos.setAttribute("id","listaProductos")
        con.appendChild(listaProductos)
        contenedor = document.getElementById('listaProductos')

    }
  
    for (item of data){
        
        //crea el div produto
        const producto = document.createElement("div");
        producto.setAttribute("class","producto");
        contenedor.appendChild(producto);

        //inserta la imagen del producto
        const img = document.createElement("img");
        img.src = item.url_image
        producto.appendChild(img)   

        
        //inserta nombre 
        const nombre = document.createElement("p")
        nombre.setAttribute("id","nombre")
        const textName = document.createTextNode(item.name) 
        nombre.appendChild(textName)
        producto.appendChild(nombre)

        //inserta descuento
        if (item.discount){
            const desc = document.createElement("p")
            desc.setAttribute("id","desc")
            const textDesc= document.createTextNode(item.discount+"%")
            desc.appendChild(textDesc)
            producto.appendChild(desc)
        }
        
        //inserta precio
        const precio = document.createElement("p")
        precio.setAttribute("id","precio");
        //aplicacion del descuento
        let valor = item.price
        if (item.discount){
            let descuento = (item.price/100)*item.discount;
            let precioDesc = item.price-descuento;
            valor= precioDesc
        }
        const textPrecio = document.createTextNode("$"+valor) 
        precio.appendChild(textPrecio)
        producto.appendChild(precio)
    }
    
}
//valida que exista el "div" de lista de productos
function validado(){
    validador=!!document.getElementById("listaProductos")
    return validador
}