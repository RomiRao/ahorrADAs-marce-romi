const $ = (selector) => document.getElementById(selector);

//Definiendo fecha actual
window.onload = () => {
    let fechaHoy = new Date();
    let mes = fechaHoy.getMonth() + 1;
    let dia = fechaHoy.getDate();
    let anio = fechaHoy.getFullYear();
    if (dia < 10) dia = "0" + dia;
    if (mes < 10) mes = "0" + mes;
    $("fecha").value = anio + "-" + mes + "-" + dia;
    $("fecha-filtro").value = anio + "-" + mes + "-" + dia;
};

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

// -------------------
// DATOS OPERACIONES
// ----------------------

const info = { operaciones: [], categorias: [] };

//agregar operacion al array de operaciones
const agregarOperacion = (objeto) => {
    info.operaciones.push(objeto);
    mostrarOperaciones();
};

//definiendo el valor del input fecha
const fechaElegida = () => {
    operacionFecha = new Date($("fecha").value);
    let mes = operacionFecha.getMonth() + 1;
    let dia = operacionFecha.getDate();
    let anio = operacionFecha.getFullYear();
    if (dia < 10) dia = "0" + dia;
    if (mes < 10) mes = "0" + mes;
    return dia + "/" + mes + "/" + anio;
};

//Objeto operacion armado para luego pushearlo al array
const armarOperacion = (descripcion, categoria, monto, tipo, fecha) => {
    const operacion = {
        descripcion: descripcion,
        categoria: categoria,
        monto: monto,
        tipo: tipo,
        fecha: fecha,
    };

    agregarOperacion(operacion);
};

//agregar operacion
$("agregar-btn").addEventListener("click", () =>
    armarOperacion(
        $("descripcion").value,
        $("categoria").value,
        $("monto").value,
        $("tipo").value,
        fechaElegida()
    )
);
//----------------

//Funcion para mostrar la lista de operaciones en la seccion balance
const mostrarOperaciones = () => {
    $("ver-operaciones").classList.remove("is-hidden");
    $("operaciones").classList.remove("is-hidden");
    $("sin-operaciones").classList.add("is-hidden");
    $("operaciones").innerHTML = "";
    iterarOperaciones();
};

//recorre el array de operaciones para crear los elementos de la lista
const iterarOperaciones = () => {
    info.operaciones.forEach((operacion, indice) => {
        $("operaciones").innerHTML += `<div class="columns">
        <div class="column is-3">
            <h3 class="has-text-weight-semibold">
                ${operacion.descripcion}
            </h3>
        </div>
        <div class="column is-3">
            <span class="tag is-primary is-light">
                ${operacion.categoria}
            </span>
        </div>
        <div class="column is-2 has-text-right has-text-grey">
            <span>
                ${operacion.fecha}
            </span>
        </div>
        <div class="column is-2 has-text-right has-text-weight-bold">
            <span>
                ${operacion.monto}
            </span>
        </div>
        <div class="column is-2 is-size-7 has-text-right pt-4">
            <a href="#">Editar</a>
            <a href="#" class="ml-3">Eliminar</a>
        </div>
    </div>`;
    });
};

//-------para eliminar una operacion
const eliminarOperacion = (indice) => {
    info.operaciones.splice(indice, 1);
    mostrarOperaciones();
};

//  //monto
//  let monto = document.createElement("span");
//  if (operacion.tipo === "Gasto") {
//      monto.style.color = "red";
//      monto.innerText = `-$${operacion.monto}`;
//  } else if (operacion.tipo === "Ganancia") {
//      monto.style.color = "green";
//      monto.innerText = `$${operacion.monto}`;
//  }
