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

// const categorias = ["Comida", "Servicios", "Salidas", "Educación", "Transporte", "Trabajo"];
const randomId = () => self.crypto.randomUUID();

let categorias = [
    {
        id: randomId(),
        nombre: "Comida"
    },
    {
        id: randomId(),
        nombre: "Servicios"
    },
    {
        id: randomId(),
        nombre: "Salidas"
    },
    {
        id: randomId(),
        nombre: "Educación"
    },
    {
        id: randomId(),
        nombre: "Transporte"
    },
    {
        id: randomId(),
        nombre: "Trabajo"
    }
]

const $$ = (selector) => document.querySelectorAll(selector)

const crearLista = (listaDeCategorias) => {
    $("lista-categorias").innerHTML = "";
    for (let categoria of listaDeCategorias){
        $("lista-categorias").innerHTML += `
        <li  class="is-flex is-justify-content-space-between">
            <span class="tag is-primary is-light">${categoria.nombre}</span>
            <div class="has-text-right">
                <a href="#" id="${categoria.id}" class="is-size-7 mr-4 editarBtn" >Editar</a>
                <a href="#" id="${categoria.id}" class="is-size-7 eliminarBtn">Eliminar</a>
            </div>
        </li>`
    }
}

crearLista(categorias);

const eliminarCategoria = (id) => {
    let newArray = categorias.filter((categoria) => categoria.id !== id);
    crearLista(newArray);
    console.log(newArray);
}

const eliminarBtn = document.querySelectorAll(".eliminarBtn");

eliminarBtn.forEach((btn) =>
    btn.addEventListener("click", () => eliminarCategoria(btn.id))
);
