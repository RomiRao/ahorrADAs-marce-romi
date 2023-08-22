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

// -------------------
// DATOS OPERACIONES
// ----------------------

const info = { operaciones: [], categorias: [] };

//agregar operacion al array de operaciones
const agregarOperacion = (objeto) => {
    info.operaciones.push(objeto);
    mostrarOperaciones();
};

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

$("agregar-btn").addEventListener("click", () =>
    armarOperacion(
        $("descripcion").value,
        $("categoria").value,
        $("monto").value,
        $("tipo").value,
        $("fecha").value
    )
);
//----------------

const mostrarOperaciones = () => {
    $("operaciones").classList.remove("is-hidden");
    $("sin-operaciones").classList.add("is-hidden");
    info.operaciones.forEach((operacion) => {
        //creacion de divs para cada operacion
        let liOperacion = document.createElement("div");
        liOperacion.classList.add("columns");
        let descripcionContenedor = document.createElement("div");
        let categoriaContenedor = document.createElement("div");
        let fechaContenedor = document.createElement("div");
        let montoContenedor = document.createElement("div");
        let accionesContenedor = document.createElement("div");

        //definir contenido de los divs
        let descripcion = document.createElement("h3");
        descripcion.innerText = operacion.descripcion;
        descripcion.classList.add("has-text-weight-bold");

        let categoria = document.createElement("span");
        categoria.innerText = operacion.cataegoria;
        categoria.classList.add("tag", "is-primary", "is-light");

        let fecha = document.createElement("span");
        fecha.innerText = operacion.fecha;

        let monto = document.createElement("span");
        monto.innerText = operacion.monto;

        let acciones = document.createElement("div");
        let editar = document.createElement("span");
        editar.innerText = "Editar";
        editar.classList.add("tag");
        let eliminar = document.createElement("span");
        eliminar.innerText = "Eliminar";
        eliminar.classList.add("tag");
        acciones.appendChild(editar);
        acciones.appendChild(eliminar);

        //asignar divs
        descripcionContenedor.appendChild(descripcion);
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
