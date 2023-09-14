//Definiendo generales
const randomId = () => self.crypto.randomUUID();
const $ = (selector) => document.getElementById(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const inicializar = () => {
    if (!traer("categorias")) {
        localStorage.setItem("categorias", JSON.stringify(categorias));
    }
    mostrarOperaciones(operaciones);
    calcularBalance(operaciones);
    crearLista(categorias);
    mostrarOpciones(categorias);
    cargarFechas();
    ordenarYBalance();
};

//Definiendo fecha actual
const cargarFechas = () => {
    let fechaHoy = new Date();
    let mes = fechaHoy.getMonth() + 1;
    let dia = fechaHoy.getDate();
    let anio = fechaHoy.getFullYear();
    if (dia < 10) dia = "0" + dia;
    if (mes < 10) mes = "0" + mes;
    $("fecha-nueva-op").value = anio + "-" + mes + "-" + dia;
    $("fecha-filtro").value = anio + "-" + mes + "-" + dia;
};


const traer = (clave) => {
    return JSON.parse(localStorage.getItem(`${clave}`));
};

//Para definir datos a nivel local
const actualizarInfo = (clave, datos) => {
    localStorage.setItem(`${clave}`, JSON.stringify(datos));
};

let operaciones = traer("operaciones") || [];

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
    });

    const balance = ganancias - gastos;

    $("balance-ganancias").innerHTML = `+${ganancias}`;
    $("balance-gastos").innerHTML = `-${gastos}`;
    $("balance-total").innerHTML = `${balance}`;
};

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
        monto: Number($("monto-nueva-op").value),
        tipo: $("tipo-nueva-op").value,
        fecha: $("fecha-nueva-op").value.replace(/-/g, "/"),
    };
    operaciones = [...operaciones, operacion];
    actualizarInfo("operaciones", operaciones);
    actualizarInfo("categorias", categorias);
    ordenarYBalance();
    mostrarVista("seccion-balance");
    limpiarVistaNuevaOP();
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

const eliminarOperacion = (id) => {
    operaciones = traer("operaciones").filter(
        (operacion) => operacion.id !== id
    );
    actualizarInfo("operaciones", operaciones);
    ordenarYBalance();
};

const obtenerOperacion = (idOperacion) => {
    return traer("operaciones").find(
        (operacion) => operacion.id === idOperacion
    );
};

const vistaEditarOperacion = (id) => {
    mostrarVista("editar-operacion");
    let { descripcion, monto, tipo, categoria, fecha } = obtenerOperacion(id);
    $("descripcion-op-editada").value = descripcion;
    $("monto-op-editada").value = monto;
    $("tipo-op-editada").value = tipo;
    $("categoria-op-editada").value = categoria;
    $("fecha-op-editada").valueAsDate = new Date(fecha);
    $("editar-op-btn").onclick = () => editarOperacion(id);
    $("cancelar-op-btn").onclick = () => mostrarVista("seccion-balance");
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
    let nuevasOperaciones = traer("operaciones").map((operacion) =>
        operacion.id === id ? { ...nuevaOperacion } : operacion
    );
    actualizarInfo("operaciones", nuevasOperaciones);
    ordenarYBalance();
    mostrarVista("seccion-balance");
};

const mostrarOperaciones = (listaOperaciones) => {
    $("operaciones").innerHTML = "";
    listaOperaciones.forEach(
        ({ monto, id, descripcion, tipo, fecha, categoria }) => {
            let contenedorOperacion = document.createElement("div");
            contenedorOperacion.innerHTML = `<div class="columns py-2">
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
                ${new Date(fecha).getDate()}/${
                new Date(fecha).getMonth() + 1
            }/${new Date(fecha).getFullYear()}
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
            <a id='link-editar' href="#">Editar</a>
            <a id='link-eliminar' href="#" class="ml-3">Eliminar</a>
        </div>
    </div>`;
            let irAEditar = contenedorOperacion.querySelector("#link-editar");
            let irAEliminar =
                contenedorOperacion.querySelector("#link-eliminar");
            irAEditar.onclick = () => {
                vistaEditarOperacion(id);
            };
            irAEliminar.onclick = () => {
                eliminarOperacion(id);
            };
            $("operaciones").appendChild(contenedorOperacion);
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

let categorias = traer("categorias") || [
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
        if (select.id === "filtro-categoria") {
            select.innerHTML += `<option value="Todas">Todas</option>`;
        }
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
    return traer("categorias").find((categoria) => categoria.id === idCategoria);
};

//----Mostrar vista editar categoria
const mostrarEditarCategoria = (id) => {
    $("container-categorias").classList.add("is-hidden");
    $("editar-categoria").classList.remove("is-hidden");
    let categoriaAEditar = obtenerCategoria(id, categorias);
    $("input-editar").value = categoriaAEditar.nombre;
    $("boton-editar").onclick = () => editarCategoria(categoriaAEditar.id)
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
    let categoriasActualizadas = traer("categorias").map((categoria) =>
        categoria.id === id ? { ...nuevaCategoria } : categoria
    );
    crearLista(categoriasActualizadas);
    mostrarOpciones(categoriasActualizadas);
    $("container-categorias").classList.remove("is-hidden");
    $("editar-categoria").classList.add("is-hidden");
    actualizarInfo("categorias", categoriasActualizadas);
};

const eliminarCategoria = (id) => {
    categorias = traer("categorias").filter((categoria) => categoria.id !== id);
    crearLista(categorias);
    mostrarOpciones(categorias);
    operacionesCategoriaEliminada(id);
    actualizarInfo("categorias", categorias);
};

const operacionesCategoriaEliminada = (id) => {
    operaciones = traer("operaciones").filter(
        (operacion) => operacion.categoria !== id
    );
    actualizarInfo("operaciones", operaciones);
    ordenarYBalance();
};

//------------------------FILTROS ----------------------
//Segun TIPO
const filtroGastoGanancia = (operaciones) => {
    if ($("filtro-tipo").value !== "Todos") {
        let operacionesAMostrar = operaciones.filter(
            (operacion) => operacion.tipo === $("filtro-tipo").value
        );
        return operacionesAMostrar;
    } else {
        return operaciones;
    }
};

//Ordenar por...
const filtroOrdenar = (operaciones) => {
    switch ($("filtro-ordenar").value) {
        case ($("filtro-ordenar").value = "A/Z"):
            operaciones = operaciones.sort((a, b) => {
                return a.descripcion.localeCompare(b.descripcion, {
                    ignorePunctuation: true,
                });
            });
            return operaciones;
            break;
        case ($("filtro-ordenar").value = "Z/A"):
            operaciones = operaciones
                .sort((a, b) => {
                    return a.descripcion.localeCompare(b.descripcion, {
                        ignorePunctuation: true,
                    });
                })
                .reverse();
            return operaciones;
            break;
        case ($("filtro-ordenar").value = "Mayor monto"):
            operaciones = operaciones
                .sort((a, b) => {
                    return a.monto - b.monto;
                })
                .reverse();
            return operaciones;
            break;
        case ($("filtro-ordenar").value = "Menor monto"):
            operaciones = operaciones.sort((a, b) => {
                return a.monto - b.monto;
            });
            return operaciones;
            break;
        case ($("filtro-ordenar").value = "Menos reciente"):
            operaciones = operaciones.sort((a, b) => {
                return (
                    new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
                );
            });
            return operaciones;
            break;
        case ($("filtro-ordenar").value = "Mas reciente"):
            operaciones = operaciones
                .sort((a, b) => {
                    return (
                        new Date(a.fecha).getTime() -
                        new Date(b.fecha).getTime()
                    );
                })
                .reverse();
            return operaciones;
            break;
    }
};

//Segun CATEGORIA
const filtroCategoria = (operaciones) => {
    if ($("filtro-categoria").value !== "Todas") {
        let operacionesAMostrar = operaciones.filter(
            (operacion) => operacion.categoria === $("filtro-categoria").value
        );
        return operacionesAMostrar;
    } else {
        return operaciones;
    }
};

//Segun desde-Fecha
const filtroDesdeFecha = (operaciones) => {
    return operaciones.filter(
        (operacion) =>
            new Date(operacion.fecha) >= new Date($("fecha-filtro").value)
    );
};

const ordenarOperaciones = () => {
    let operacionesSegunGasto = filtroGastoGanancia(traer("operaciones"));
    let operacionesSegunCategoria = filtroCategoria(operacionesSegunGasto);
    let operacionesSegunFecha = filtroDesdeFecha(operacionesSegunCategoria);
    return filtroOrdenar(operacionesSegunFecha);
};

const ordenarYBalance = () => {
    let operacionesOrdenadas = ordenarOperaciones();
    calcularBalance(operacionesOrdenadas);
    mostrarOperaciones(operacionesOrdenadas);
};

$("fecha-filtro").addEventListener("change", () => ordenarYBalance());

$("filtro-categoria").addEventListener("change", () => ordenarYBalance());

$("filtro-tipo").addEventListener("change", () => ordenarYBalance());

$("filtro-ordenar").addEventListener("change", () => ordenarYBalance());



//----Reportes

// Mayor ganancia por categoria
const mayorGananciaPorCategorias = (operaciones) => {
    let categoriaConMayorGanancia = "";
    let montoMayorGanancia = 0;
    for (let { nombre, id } of categorias) {
        let operacionesPorCategoria = operaciones.filter((operacion) => operacion.categoria === id);
        let gananciasPorCategoria = operacionesPorCategoria.filter((operacion) => operacion.tipo !== "Gasto");
        let totalGanancias = gananciasPorCategoria.reduce((acum, ganancia) =>
            acum + Number(ganancia.monto)
            , 0)
        if (categoriaConMayorGanancia === "" && montoMayorGanancia === 0) {
            categoriaConMayorGanancia = nombre
            montoMayorGanancia = totalGanancias
        } else if (totalGanancias > montoMayorGanancia) {
            categoriaConMayorGanancia = nombre
            montoMayorGanancia = totalGanancias
        }
    }
    $("categoria-mayor-ganancia").innerHTML = `${categoriaConMayorGanancia}`
    $("monto-mayor-ganancia").innerHTML = `+$${montoMayorGanancia}`
}
mayorGananciaPorCategorias(operaciones)

// Mayor gasto por categoria
const mayorGastosPorCategorias = (operaciones) => {
    let categoriaConMayorGasto = "";
    let montoMayorGasto = 0;
    for (let { nombre, id } of categorias) {
        let operacionesPorCategoria = operaciones.filter((operacion) => operacion.categoria === id);
        let gastosPorCategoria = operacionesPorCategoria.filter((operacion) => operacion.tipo === "Gasto");
        let totalGastos = gastosPorCategoria.reduce((acum, gasto) =>
            acum + Number(gasto.monto)
            , 0)
        if (categoriaConMayorGasto === "" && montoMayorGasto === 0) {
            categoriaConMayorGasto = nombre
            montoMayorGasto = totalGastos
        } else if (totalGastos > montoMayorGasto) {
            categoriaConMayorGasto = nombre
            montoMayorGasto = totalGastos
        }
    }
    $("categoria-mayor-gasto").innerHTML = `${categoriaConMayorGasto}`
    $("monto-mayor-gasto").innerHTML = `-$${montoMayorGasto}`
}

mayorGastosPorCategorias(operaciones)

//Mayor balance

const categoriaMayorBalance = (operaciones) => {
    let categoriaConMayorBalance = "";
    let mayorBalance = 0;
    let mayorGanancia = 0;
    for (let { nombre, id } of categorias) {
        let operacionesPorCategoria = operaciones.filter((operacion) => operacion.categoria === id);
        let gananciasPorCategoria = operacionesPorCategoria.filter((operacion) => operacion.tipo !== "Gasto");
        let totalGanancias = gananciasPorCategoria.reduce((acum, ganancia) =>
            acum + Number(ganancia.monto)
            , 0)
        let gastosPorCategoria = operacionesPorCategoria.filter((operacion) => operacion.tipo === "Gasto");
        let totalGastos = gastosPorCategoria.reduce((acum, gasto) =>
            acum + Number(gasto.monto)
            , 0)
        if (totalGanancias > mayorGanancia) {
            categoriaConMayorBalance = nombre
            mayorBalance = totalGanancias - totalGastos
        }
    }
    $("categoria-mayor-balance").innerHTML = `${categoriaConMayorBalance}`
    $("monto-mayor-balance").innerHTML = `$${mayorBalance}`
}
categoriaMayorBalance(operaciones)

//Mes con mayor ganancia
const mesMayorGanancia = (operaciones) => {
    let categoriaConMayorGanancia = "";
    let montoMayorGanancia = 0;
    let fechaMayorGanancia;
    let dia;
    let mes;
    let anio;
    for (let { nombre, id } of categorias) {
        let operacionesPorCategoria = operaciones.filter((operacion) => operacion.categoria === id);
        let gananciasPorCategoria = operacionesPorCategoria.filter((operacion) => operacion.tipo !== "Gasto");
        let totalGanancias = gananciasPorCategoria.reduce((acum, ganancia) =>
            acum + ganancia.monto
            , 0)
        if (categoriaConMayorGanancia === "" && montoMayorGanancia === 0) {
            categoriaConMayorGanancia = nombre
            montoMayorGanancia = totalGanancias
        } else if (totalGanancias > montoMayorGanancia) {
            categoriaConMayorGanancia = nombre
            montoMayorGanancia = totalGanancias
            fechaMayorGanancia = new Date(gananciasPorCategoria[0].fecha)
            dia = fechaMayorGanancia.getDate()
            mes = fechaMayorGanancia.getMonth() + 1
            anio = fechaMayorGanancia.getFullYear()
        }
    }
    $("mes-mayor-ganancia").innerHTML = `${dia}/${mes}/${anio}`
    $("monto-mes-mayor-ganancia").innerHTML = `+$${montoMayorGanancia}`
}

mesMayorGanancia(operaciones)

inicializar();