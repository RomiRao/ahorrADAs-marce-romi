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

// -----------------------
// SECCION BALANCE
// ----------------------

//Abre card de nueva operacion
const abrirNuevaOperacion = () => {
    $("seccion-balance").classList.add("is-hidden");
    $("nueva-operacion").classList.remove("is-hidden");
};

$("nueva-operacion-btn").addEventListener("click", () => abrirNuevaOperacion());
