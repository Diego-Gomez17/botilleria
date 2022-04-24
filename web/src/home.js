//contenedor padre de filtro y listaProductos
let con = document.getElementById('con')
//contenedor de los productos
let contenedor = document.getElementById('listaProductos');
//input del buscador
let buscar= document.getElementById("buscar")
//contenedor de las categorias
let contCategoria = document.getElementById('filtro');

/*----------------- CATEGORIAS------------------------------ */
//categorias (obtiene los datos de la api)
urlCategory = "https://api-bsale-boti.herokuapp.com/categoria/"
fetch(urlCategory)
.then(data=> data.json())
.then(data=>{
    mostrarCategory(data)
})
.catch(error => console.log(error))

//rendereiza las categorias
function mostrarCategory(data){
    for (cat of data){
        //crea el div categoria
        const categoria = document.createElement("div");
        categoria.setAttribute("class","categoria");
        contCategoria.appendChild(categoria);

        //inserta la categoria
        const nombre = document.createElement("p")
        nombre.setAttribute("class","cate")
        nombre.setAttribute("id",cat.id)
        const textName = document.createTextNode(cat.name) 
        nombre.appendChild(textName)
        categoria.appendChild(nombre)
    }
}


/*--------------------PRODUCTOS-------------------------- */
//trae los datos de la BD sin filtrar
url="https://api-bsale-boti.herokuapp.com/producto/"
fetch(url)
.then(data=> data.json())
.then(data=>{
    mostrarDatos(data)
})
.catch(error => console.log(error))

//trae los datos por categoria
let click= document.querySelectorAll("#filtro").forEach(el => {
    el.addEventListener("click", e => {
      let cate = e.target.getAttribute("id");
      //remueve la lista de productos
      listaProductos.parentNode.removeChild(listaProductos)

        //busca los productos de que compartan la misma categoria seleccionada
        url=`https://api-bsale-boti.herokuapp.com/${cate}`
        fetch(url)
        .then(data=> data.json())
        .then(data=>{
            //usamos la funcion que renderiza la vista
            mostrarDatos(data)
            
        })
        .catch(error => console.log(error))
    }); 
    
});

//busca un item en espacifico
buscar.addEventListener('keydown', (e) => {
    if (e.key === "Enter"){ 
        //remueve la lista de productos
        listaProductos.parentNode.removeChild(listaProductos)
        //busca el elemento solicitado
        url=`https://api-bsale-boti.herokuapp.com/producto/${buscar.value}`
        fetch(url)
        .then(data=> data.json())
        .then(data=>{
            //usamos la funcion que renderiza la vista
            mostrarDatos(data)
            
        })
        .catch(error => console.log(error))
    }
})

//renderiza los datos por pantalla
function mostrarDatos(data){
    
    //valida que exista el div listaProducto de no existir lo creara
    if(!validado()){
        const listaProductos = document.createElement("div")
        listaProductos.setAttribute("id","listaProductos")
        con.appendChild(listaProductos)
        contenedor = document.getElementById('listaProductos')

    }
    //recorre el json, usando los datos de este para crear las vistas
    for (item of data){
        //crea el div produto
        const producto = document.createElement("div");
        producto.setAttribute("class","producto");
        contenedor.appendChild(producto);

        //inserta la imagen del producto
        //el if permite ingresar una imagen de no disponible si es que llegase a ver un problema con la img
        if (item.url_image==null || item.url_image== ""){
            const img = document.createElement("img");
            img.src = "/web/src/img/noDisponible.jpg"
            producto.appendChild(img)
        }else{
            const img = document.createElement("img");
            img.src = item.url_image
            producto.appendChild(img)
        }
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