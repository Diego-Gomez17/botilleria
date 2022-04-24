# Botilleria
aplicación web que obtiene datos de los productos que oferta una botelleria a través de una BD, la app obtiene **nombre**, **precio**, **descuento**, una **imagen referencial** de esta a través de un **json**, el cual se utiliza para finalmente renderizar la vista al cliente, este **json** es obtenido  gracias a una pequeña **API** que realiza las consultas a la BD y se las entrega al frontend.
## API
la **API** posee 4 rutas las cuales nos permite obtener datos de la **Base de Datos**

 1. **/categoria**
 este retorna las categorías de los productos existentes en la BD
 
 2. **/producto**
 esta retorna todos los productos existentes en la BD 
 
 3. **/producto/:name**
 retorna un producto especifico cuyo nombre sea igual o similar al ingresado
 4. **/:id**
retorna los productos que posean la misma categoria, **:id** es igual al **id** de la categoría en la BD

## Front-end
el front-end posee un **js** llamado **home.js** el cual contiene todas las interacciones con la **API**, que son realizadas atreves del método **fetch** el cual obtendrá los datos de la BD y los transformara en un **json**.
**home.js** posee 4 ***funciones*** encargadas de renderizar los productos en pantallas, según la interacción del usuario sobre la misma
 

 1. **click**
 es una variable que almacena la **id** de una categoría seleccionada por el usuario, para renderizar los productos que posean el mismo id que a sido seleccionado.
 
 2. **buscar**
es una variable que esta escuchando un input de búsqueda, el cual tras ser presionada la tecla **"Enter"** enviara lo escrito dentro del input a la **API** para que esta finalmente consulte a la **BD** si lo enviado coincide con el nombre de alguno de los productos registrado dentro de esta.

 3. **mostrarDatos**
es la **function** que se encargara de renderizar los elementos obtenidos a través del **json**  adicional a esto también esta encargada de eliminar en primera instancia todos los productos previos a su ejecución, de esta manera limpiara la vista antes de insertar los nuevos elementos. 
Todos los elementos *(productos)* son creados en un **div** dentro de un **div** padre llamado **listaProducto**

 4. **validado**
es una pequeña función que sirve simplemente para saber si existe algún producto previo en la vista.

 5. **mostrarCategory**
es similar al **mostrarDatos** solo que esta esta encargada solamente de mostrar las categoría que existen dentro de la base de datos
