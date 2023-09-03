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

const mostrarVista = (vistaAMostrar) => {
    $$(".vista").forEach((vista) => {
        vista.classList.add("is-hidden");
        $(`${vistaAMostrar}`).classList.remove("is-hidden");
    });
};

$("navbar-balance").addEventListener("click", () =>
    mostrarVista("seccion-balance")
);
$("navbar-categorias").addEventListener("click", () =>
    mostrarVista("seccion-categorias")
);
$("nueva-operacion-btn").addEventListener("click", () =>
    mostrarVista("nueva-operacion")
);
$("navbar-reportes").addEventListener("click", () =>
    mostrarVista("seccion-reportes")
);

//Menu hamburguesa

$("burger").addEventListener("click", () => {
    $("burger").classList.toggle("is-active");
    $("navbarLinks").classList.toggle("is-active");
});

// -----------------------
// SECCION BALANCE
// ----------------------

//Ocultar filtros
$("ocultar-filtros").addEventListener("click", () => {
    $("filtros").classList.toggle("is-hidden");
});

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
    let operacionFecha = new Date($("fecha").value);
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

        // $$(".editar-link").forEach((boton) =>
        //     boton.addEventListener("click", () => editarOperacion(boton.id))
        // );
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

//-------para editar una operacion

//const editarOperacion = (idBtn) => {};

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

//------Crear lista Categorias

//Mostrar options de los select (categorias)

const crearLista = (listaDeCategorias) => {
    $("lista-categorias").innerHTML = "";
    for (let { nombre, id } of listaDeCategorias) {
        $("lista-categorias").innerHTML += `
        <li class="is-flex is-justify-content-space-between">
            <span class="tag is-primary is-light mb-5">${nombre}</span>
        <div class="has-text-right">
            <button onclick="mostrarEditarCategoria('${id}')" id="${id}" class="button is-ghost is-size-7 mr-4 editarBtn">Editar</button>
            <button onclick="eliminarCategoria('${id}')" id="${id}" class="button is-ghost is-size-7 eliminarBtn">Eliminar</button>
        </div>
        </li>`;
    }
};

mostrarOperaciones(operaciones);

//----Mostrar opciones del select
const mostrarOpciones = (categorias) => {
    $$(".select-categorias").forEach((select) => {
        select.innerHTML = `<option value="Todas">Todas</option>`;
        for (let { id, nombre } of categorias) {
            select.innerHTML += `<option value="${id}">${nombre}</option>`;
        }
    });
};
mostrarOpciones(categorias);

//-----Agregar nueva Categoria

const agregarCategoria = () => {
    let nuevoObj = {
        id: randomId(),
        nombre: $("input-nueva-categoria").value,
    };
    let listaActualizada = [...categorias, nuevoObj];
    crearLista(listaActualizada);
    mostrarOpciones(listaActualizada);
};

$("boton-agregar-categoria").addEventListener("click", agregarCategoria);

//----Obtener categoria
const obtenerCategoria = (idCategoria, categorias) => {
    return categorias.find((categoria) => categoria.id === idCategoria);
};

//----Mostrar vista editar categoria
const mostrarEditarCategoria = (id) => {
    $("container-categorias").classList.add("is-hidden");
    $("editar-categoria").classList.remove("is-hidden");
    let categoriaAEditar = obtenerCategoria(id, categorias);
    $("input-editar").value = categoriaAEditar.nombre;
    $("boton-editar").addEventListener("click", () =>
        editarCategoria(categoriaAEditar.id)
    );
    ocultarEditarCategoria();
};

const ocultarEditarCategoria = () => {
    $("boton-cancelar").addEventListener("click", () => {
        $("container-categorias").classList.remove("is-hidden");
        $("editar-categoria").classList.add("is-hidden");
    });
};

const editarCategoria = (id) => {
    let nuevaCategoria = {
        id: id,
        nombre: $("input-editar").value,
    };
    let categoriasActualizadas = categorias.map((categoria) =>
        categoria.id === id ? { ...nuevaCategoria } : categoria
    );
    crearLista(categoriasActualizadas);
    mostrarOpciones(categoriasActualizadas);
};

const eliminarCategoria = (id) => {
    categorias = categorias.filter((categoria) => categoria.id !== id);
    crearLista(categorias);
    mostrarOpciones(categorias);
};

crearLista(categorias);
