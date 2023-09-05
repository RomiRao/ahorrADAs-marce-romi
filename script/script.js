//Definiendo generales
const randomId = () => self.crypto.randomUUID();
const $ = (selector) => document.getElementById(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const inicializar = () => {
    mostrarOperaciones(operaciones);
    crearLista(categorias);
    mostrarOpciones(categorias);
};

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
    $("fecha-nueva-op").value = anio + "-" + mes + "-" + dia;
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

//-----Funcionabilidad 
const calcularBalance = (operaciones) => {
    let ganancias = 0;
    let gastos = 0;

    operaciones.forEach((operacion) => {
        if (operacion.tipo !== "Gasto") {
            ganancias += Number(operacion.monto);
        } else if (operacion.tipo === "Gasto") {
            gastos += Number(operacion.monto);
        }
    })

    const balance = ganancias - gastos
    
    $("balance-ganancias").innerHTML = `+ ${ganancias}`
    $("balance-gastos").innerHTML = `- ${gastos}`
    $("balance-total").innerHTML = `${balance}`
}


// -------------------
// DATOS OPERACIONES
// ----------------------

// ---------------------Nueva Operacion---------------------

//Objeto operacion armado para luego pushearlo al array
const agregarOperacion = () => {
    const operacion = {
        id: randomId(),
        descripcion: $("descripcion-nueva-op").value,
        categoria: $("categoria-nueva-op").value,
        monto: $("monto-nueva-op").value,
        tipo: $("tipo-nueva-op").value,
        fecha: new Date($("fecha-nueva-op").value),
    };
    operaciones = [...operaciones, operacion];
    mostrarOperaciones(operaciones);
    actualizarInfo("operaciones", operaciones);
    mostrarVista("seccion-balance");
    limpiarVistaNuevaOP();
    calcularBalance(operaciones);
};

$("agregar-btn-nueva-op").addEventListener("click", () => agregarOperacion());

$("cancelar-btn-nueva-op").addEventListener("click", () => {
    mostrarVista("seccion-balance");
});

//limpiar vista nueva-op
const limpiarVistaNuevaOP = () => {
    $("descripcion-nueva-op").value = "";
    $("monto-nueva-op").value = 0;
    $("tipo-nueva-op").value = "Gasto";
    $("categoria-nueva-op").value = categorias[0].id;
    $("fecha-nueva-op").valueAsDate = new Date();
};

//Iterar y mostrar
const mostrarOperaciones = (operaciones) => {
    $("operaciones").innerHTML = "";
    iterarOperaciones(operaciones);
};

const eliminarOperacion = (id) => {
    operaciones = operaciones.filter((operacion) => operacion.id !== id);
    mostrarOperaciones(operaciones);
    actualizarInfo("operaciones", operaciones);
};

const obtenerOperacion = (idOperacion) => {
    return operaciones.find((operacion) => operacion.id === idOperacion);
};

const vistaEditarOperacion = (id) => {
    mostrarVista("editar-operacion");
    let { descripcion, monto, tipo, categoria, fecha } = obtenerOperacion(id);
    $("descripcion-op-editada").value = descripcion;
    $("monto-op-editada").value = monto;
    $("tipo-op-editada").value = tipo;
    $("categoria-op-editada").value = categoria;
    $("fecha-op-editada").valueAsDate = new Date(fecha);
    $("editar-op-btn").addEventListener("click", () => editarOperacion(id));
    $("cancelar-op-btn").addEventListener("click", () =>
        mostrarVista("seccion-balance")
    );
};

const editarOperacion = (id) => {
    let nuevaOperacion = {
        id: id,
        descripcion: $("descripcion-op-editada").value,
        categoria: $("categoria-op-editada").value,
        monto: $("monto-op-editada").value,
        tipo: $("tipo-op-editada").value,
        fecha: $("fecha-op-editada").value.replace(/-/g, "/"),
    };
    let nuevaListaOperaciones = operaciones.map((operacion) =>
        operacion.id === id ? { ...nuevaOperacion } : operacion
    );
    mostrarVista("seccion-balance");
    mostrarOperaciones(nuevaListaOperaciones);
    actualizarInfo("operaciones", nuevaListaOperaciones);
};

const iterarOperaciones = (listaOperaciones) => {
    listaOperaciones.forEach(
        ({ monto, id, descripcion, tipo, fecha, categoria }) => {
            $("operaciones").innerHTML += `<div class="columns">
        <div class="column is-3">
            <h3 class="has-text-weight-semibold">
                ${descripcion}
            </h3>
        </div>
        <div class="column is-3">
            <span class="tag is-primary is-light">
                ${obtenerCategoria(categoria, categorias).nombre}
            </span>
        </div>
        <div class="column is-2 has-text-right has-text-grey">
            <span>
                ${fecha.getDate() + 1}/${
                fecha.getMonth() + 1
            }/${fecha.getFullYear()}
            </span>
        </div>
        <div class="column is-2 has-text-right has-text-weight-bold ${colorMonto(
            tipo
        )}">
            <span>
                ${tipoMonto(monto, tipo)}
            </span>
        </div>
        <div class="column is-2 is-size-7 has-text-right pt-4">
            <a id="${id}" onclick="vistaEditarOperacion('${id}')" href="#">Editar</a>
            <a id="${id}" onclick="eliminarOperacion('${id}')" href="#" class="ml-3">Eliminar</a>
        </div>
    </div>`;
        }
    );
    noHayOperaciones();
};

//Definiendo como se muestra el mondo
const tipoMonto = (monto, tipo) => {
    return tipo === "Gasto" ? `-$${monto}` : `+$${monto}`;
};

const colorMonto = (tipo) => {
    return tipo === "Gasto" ? "has-text-danger" : "has-text-success";
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

let categorias = JSON.parse(localStorage.getItem("categorias")) || [
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

//----Mostrar opciones del select
const mostrarOpciones = (categorias) => {
    $$(".select-categorias").forEach((select) => {
        select.innerHTML = "";
        for (let { id, nombre } of categorias) {
            select.innerHTML += `<option value="${id}">${nombre}</option>`;
        }
    });
};

//-----Agregar nueva Categoria

const agregarCategoria = () => {
    let nuevoObj = {
        id: randomId(),
        nombre: $("input-nueva-categoria").value,
    };
    categorias = [...categorias, nuevoObj];
    crearLista(categorias);
    mostrarOpciones(categorias);
    actualizarInfo("categorias", categorias);
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
    $("container-categorias").classList.remove("is-hidden");
    $("editar-categoria").classList.add("is-hidden");
    actualizarInfo("categorias", categoriasActualizadas);
};

const eliminarCategoria = (id) => {
    categorias = categorias.filter((categoria) => categoria.id !== id);
    crearLista(categorias);
    mostrarOpciones(categorias);
    operacionesCategoriaEliminada(id);
    actualizarInfo("categorias", categorias);
};

const operacionesCategoriaEliminada = (id) => {
    operaciones = operaciones.filter((operacion) => operacion.categoria !== id);
    mostrarOperaciones(operaciones);
    actualizarInfo("operaciones", operaciones);
};

const filtroGastoGanancia = () => {
    if ($("filtro-tipo").value !== "Todos") {
        let operacionesAMostrar = operaciones.filter(
            (operacion) => operacion.tipo === $("filtro-tipo").value
        );
        mostrarOperaciones(operacionesAMostrar);
    } else {
        mostrarOperaciones(operaciones);
    }
};

$("filtro-tipo").addEventListener("change", () => filtroGastoGanancia());

inicializar();
