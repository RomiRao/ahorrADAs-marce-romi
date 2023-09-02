//Definiendo generales
const randomId = () => self.crypto.randomUUID();
const $ = (selector) => document.getElementById(selector);
const $$ = (selector) => document.querySelectorAll(selector);

//Para definir datos a nivel local
const actualizarInfo = (clave, datos) => {
    localStorage.setItem(clave, JSON.stringify(datos));
};

let operaciones = JSON.parse(localStorage.getItem("operaciones")) || [];

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

const agregarOperacion = (objeto) => {
    operaciones.push(objeto);
    mostrarOperaciones(operaciones);
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
        id: randomId(),
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
        fechaElegida()
    )
);
//----------------

//Funcion para mostrar la lista de operaciones en la seccion balance
const mostrarOperaciones = (operaciones) => {
    $("operaciones").innerHTML = "";
    iterarOperaciones(operaciones);
};

//recorre el array de operaciones para crear los elementos de la lista
const iterarOperaciones = (listaOperaciones) => {
    listaOperaciones.forEach((operacion) => {
        const monto = tipoMonto(operacion.monto, operacion.tipo);

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
        <div class="column is-2 has-text-right has-text-weight-bold ${colorMonto(
            operacion.tipo
        )}">
            <span>
                ${monto}
            </span>
        </div>
        <div class="column is-2 is-size-7 has-text-right pt-4">
            <a id='${operacion.id}' class='editar-link' href="#">Editar</a>
            <a id='${
                operacion.id
            }' class='eliminar-link' href="#" class="ml-3">Eliminar</a>
        </div>
    </div>`;

        $$(".editar-link").forEach((boton) =>
            boton.addEventListener("click", () => editarOperacion(boton.id))
        );
    });
    actualizarInfo("operaciones", listaOperaciones);
    noHayOperaciones();
};

$$(".eliminar-link").forEach((btn) =>
    btn.addEventListener("click", () => {
        console.log("asdasd");
        let nuevaListaOperaciones = operaciones.filter(
            (operacion) => operacion.id !== btn.id
        );
        mostrarOperaciones(nuevaListaOperaciones);
    })
);

const tipoMonto = (monto, tipo) => {
    if (tipo === "Gasto") {
        monto = `-$${monto}`;
    } else if (tipo === "Ganancia") {
        monto = `+$${monto}`;
    }
    return monto;
};

const colorMonto = (tipo) => {
    let color;
    if (tipo === "Gasto") {
        color = "has-text-danger";
    } else if (tipo === "Ganancia") {
        color = "has-text-success";
    }
    return color;
};

//para cuando no hay operaciones mostrar ilustracion
const noHayOperaciones = () => {
    if ($("operaciones").innerHTML === "") {
        $("ver-operaciones").classList.add("is-hidden");
        $("operaciones").classList.add("is-hidden");
        $("sin-operaciones").classList.remove("is-hidden");
    } else {
        $("ver-operaciones").classList.remove("is-hidden");
        $("operaciones").classList.remove("is-hidden");
        $("sin-operaciones").classList.add("is-hidden");
    }
};

// ------------Funcionabilidad Categorias------------------

let categorias = [
    {
        id: randomId(),
        nombre: "Comida",
    },
    {
        id: randomId(),
        nombre: "Servicios",
    },
    {
        id: randomId(),
        nombre: "Salidas",
    },
    {
        id: randomId(),
        nombre: "Educación",
    },
    {
        id: randomId(),
        nombre: "Transporte",
    },
    {
        id: randomId(),
        nombre: "Trabajo",
    },
];

//-----Agregar nueva Categoria
const agregarCategoria = () => {
    let nuevoObj = {
        id: randomId(),
        nombre: $("input-nueva-categoria").value,
    };
    categorias.push(nuevoObj);
    crearLista(categorias);
};

const crearLista = (listaDeCategorias) => {
    $("lista-categorias").innerHTML = "";
    listaDeCategorias.forEach((categoria) => {
        $("lista-categorias").innerHTML += `
        <li  class="is-flex is-justify-content-space-between">
            <span class="tag is-primary is-light mb-5">${categoria.nombre}</span>
            <div class="has-text-right">
            <a href="#" id="${categoria.id}" class="is-size-7 mr-4 editarBtn" >Editar</a>
            <a href="#" id="${categoria.id}" class="is-size-7 eliminarBtn">Eliminar</a>
            </div>
            </li>`;
        $$(".eliminarBtn").forEach((btn) =>
            btn.addEventListener("click", () => {
                categorias = categorias.filter(
                    (categoria) => categoria.id !== btn.id
                );
                crearLista(categorias);
            })
        );
    });
};
$("boton-agregar-categoria").addEventListener("click", agregarCategoria);

crearLista(categorias);
mostrarOperaciones(operaciones);
