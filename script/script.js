const $ = (selector) => document.getElementById(selector);

// *****************
// NAVBAR
// ***************
//Cambio de seccion

//Mostrar seccion balance
$("navbar-balance").addEventListener("click", () => {
    $("seccion-balance").classList.remove("is-hidden");
    $("nueva-operacion").classList.add("is-hidden");
    $("seccion-categorias").classList.add("is-hidden");
    $("seccion-reportes").classList.add("is-hidden");
});

//Mostrar seccion categorias
$("navbar-categorias").addEventListener("click", () => {
    $("seccion-balance").classList.add("is-hidden");
    $("nueva-operacion").classList.add("is-hidden");
    $("seccion-categorias").classList.remove("is-hidden");
    $("seccion-reportes").classList.add("is-hidden");
});

//Mostrar seccion reportes
$("navbar-reportes").addEventListener("click", () => {
    $("seccion-balance").classList.add("is-hidden");
    $("nueva-operacion").classList.add("is-hidden");
    $("seccion-categorias").classList.add("is-hidden");
    $("seccion-reportes").classList.remove("is-hidden");
});

//Menu hamburguesa

$("burger").addEventListener("click", () => {
    $("burger").classList.toggle("is-active");
    $("navbarLinks").classList.toggle("is-active");
});

// -----------------------
// SECCION BALANCE
// ----------------------

//Abre card de nueva operacion
const abrirNuevaOperacion = () => {
    $("seccion-balance").classList.add("is-hidden");
    $("nueva-operacion").classList.remove("is-hidden");
};

$("nueva-operacion-btn").addEventListener("click", () => abrirNuevaOperacion());


// ------------Funcionabilidad Categorias------------------

const categorias = ["Comida", "Servicios", "Salidas", "Educación", "Transporte", "Trabajo"];

const crearLista = (listaDeCategorias) => {
    $("lista-categorias").innerHTML = "";
    for (let categoria of listaDeCategorias){
        $("lista-categorias").innerHTML += `
        <li class="is-flex is-justify-content-space-between">
            <span class="tag is-primary is-light">${categoria}</span>
            <div class="has-text-right">
                <a href="#" class="is-size-7 mr-4 editarBtn" >Editar</a>
                <a href="#" class="is-size-7 eliminarBtn">Eliminar</a>
            </div>
        </li>`
    }
}

crearLista(categorias);
