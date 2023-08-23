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
    $("operaciones").innerHTML = "";
    $("sin-operaciones").classList.add("is-hidden");

    iterarOperaciones();
};

//recorre el array de operaciones para crear los elementos de la lista
const iterarOperaciones = () => {
    info.operaciones.forEach((operacion) => {
        //cada lista de operacion
        let liOperacion = document.createElement("div");
        liOperacion.classList.add("columns");

        //creacion de divs para cada item de operacion
        let descripcionContenedor = document.createElement("div");
        let categoriaContenedor = document.createElement("div");
        let fechaContenedor = document.createElement("div");
        let montoContenedor = document.createElement("div");
        let accionesContenedor = document.createElement("div");

        //dandole clase a cada columna
        descripcionContenedor.classList.add("column", "is-3");
        categoriaContenedor.classList.add("column", "is-3");
        fechaContenedor.classList.add("column", "is-2", "has-text-grey");
        montoContenedor.classList.add(
            "column",
            "is-2",
            "has-text-right",
            "has-text-weight-bold"
        );
        accionesContenedor.classList.add("column", "is-2");

        //definir contenido de los divs
        let descripcion = document.createElement("h3");
        descripcion.innerText = operacion.descripcion;
        descripcion.classList.add("has-text-weight-semibold");

        //categoria
        let categoria = document.createElement("span");
        categoria.innerText = operacion.categoria;
        categoria.classList.add("tag", "is-primary", "is-light");

        //fecha
        let fecha = document.createElement("span");
        fecha.innerText = operacion.fecha;

        //monto
        let monto = document.createElement("span");
        if (operacion.tipo === "Gasto") {
            monto.style.color = "red";
            monto.innerText = `-$${operacion.monto}`;
        } else if (operacion.tipo === "Ganancia") {
            monto.style.color = "green";
            monto.innerText = `$${operacion.monto}`;
        }

        //acciones
        let acciones = document.createElement("div");
        //editar
        let editar = document.createElement("a");
        editar.innerText = "Editar";
        editar.setAttribute("href", "#");
        //eliminar
        let eliminar = document.createElement("a");
        eliminar.innerText = "Eliminar";
        eliminar.setAttribute("href", "#");
        acciones.appendChild(editar);
        acciones.appendChild(eliminar);

        //asignar divs
        descripcionContenedor.appendChild(descripcion);
        categoriaContenedor.appendChild(categoria);
        fechaContenedor.appendChild(fecha);
        montoContenedor.appendChild(monto);
        accionesContenedor.appendChild(acciones);
        liOperacion.appendChild(descripcionContenedor);
        liOperacion.appendChild(categoriaContenedor);
        liOperacion.appendChild(fechaContenedor);
        liOperacion.appendChild(montoContenedor);
        liOperacion.appendChild(accionesContenedor);
        $("operaciones").appendChild(liOperacion);
    });
};
