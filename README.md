# **AHORRADAS**

## SOBRE EL PROYECTO

Este es nuetro tercer proyecto a entregar de la carrera de desarrollo FrontEnd para ADAITW. En este caso creamos un controlador de gastos personales. Lo que buscamos aplicar del programa en este trabajo es el conocimiento previamente adquirido de HTML, CSS y JavaScript junto al manejo de base de datos con el local storage y el manejo de objetos JSON. Además de implementar la lógica en la construcción, reutilización de funciones, utilización de frameworks de CSS y el trabajo en equipo utilizando ramas en GIT.

<img src="https://github.com/RomiRao/meme-generator/blob/main/style/image-examples/website.png" style="width: 60%;" alt="ejemplo visual de la pagina"/>

## Herramientas utilizadas

<img src="https://skillicons.dev/icons?i=git,css,html,js" alt="logotipos de git, html, css y javascript"/>

## ESTRUCTURA

### ✦ Header

En este caso nuestro "header" es una navbar por la cual se puede navegar entre las distintas secciones del proyecto. Las cuales son balance, categorias y reportes. También tiene un diseño responsive para que al visualizar el programa desde un dispositivo con pantalla más reducida, se agrupen los links de navegación dentro de un contenedor que solo va a ser visible al desplegar el menú hamburguesa de la misma navbar, el cual solo aparece en estas pantallas.

### ✦ Balance

En esta sección podemos encontrar los movimientos realizados por el usuario. Tenemos 3 paneles: el balance total (gasto y ganancia) de las operaciones mostradas en pantallas (no de las guardadas), las operaciones realizadas que se ven en forma de lista una vez el usuario las haya ingresado desde el mismo boton de "Nueva operación" (el cual es otra seccion oculta con un formulario de datos para agregar una operación) y por último un panel de filtros con el cual, como su nombre lo indica, podemos filtrar las operaciones mostradas en pantalla.

### ✦ Categorías

En esta sección se pueden crear, editar y eliminar las categorías deseadas para elegirlas posteriormente al agregar una operación o filtrarlas. Es importante recalcar que al eliminar una categoría, todas las operaciones bajo dicha categoría seran eliminadas también.

### ✦ Reportes

Esta solo es una sección de lectura que va a llevar un registro de los gastos/ganancias TOTALES de las operaciones registradas al momento. El mismo se actualiza con cada operación agregada.

## CONOCIMIENTO APLICADO

### ✦ HTML

Una estructura común con una navbar y 3 secciones las cuales se ocultan o muestran según lo deseado. También posee 3 modales ocultos que son los de agregar/editar operación y editar categoría.

### ✦ CSS

En este caso en vez de maquetar todo el proyecto como lo hacíamos anteriormente, incorporamos un framework llamado Bulma para la estilización del programa.

### ✦ JavaScript

Para este proyecto implementamos la reutilización de funciones, como por ejemplo cuando se ordenan los filtros de las operaciones, reutilizamos la funcion de mostrar operaciones previamente usada para agregarlas. Solo que en estas funciones no se aplica el manejo de local storage, para lo cual también tenemos declarada otra función que llamamos siempre que es necesario actualizarlo o traerlo para trabajar con el.

## RECURSOS

Para este sitio utilizamos los siguientes recursos:

-   Framework CSS -> [Bulma](https://bulma.io)
-   Ilustrationes -> Google (Son de uso libre)

## CONTACTO

En este proyecto colaboramos dos personas y estras son nuestras redes:

Marcela Duran:

-   [LinkedIn]()
-   []()
-   [Perfil de GitHub](https://github.com/Makorii)

Romina Rao

-   [LinkedIn](https://www.linkedin.com/in/romina-yazm%C3%ADn-rao-50a61a1ba/)
-   [raoromina96@gmail.com](mailto:raoromina96@gmail.com)
-   [Perfil de GitHub](https://github.com/RomiRao)
