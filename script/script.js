const $ = (selector) => document.getElementById(selector);

//Cambio de seccion

//Mostrar seccion balance
$("navbar-balance").addEventListener("click", () => {
    $("seccion-balance").classList.remove("is-hidden");
    $("nueva-operacion").classList.add("is-hidden");
    $("seccion-categorias").classList.add("is-hidden");
    $("seccion-reportes").classList.add("is-hidden");
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
