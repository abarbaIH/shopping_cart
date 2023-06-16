// Variables

const carrito = document.querySelector("#lista-carrito")
const contenedorCarrito = document.querySelector("#lista-carrito tbody")
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito")
const listaCursos = document.querySelector("#lista-cursos")
let articulosCarrito = []

// Registrar los eventos
cargarEventListeners();

function cargarEventListeners() {

    listaCursos.addEventListener("click", agregarCurso);
    carrito.addEventListener("click", eliminarCurso)
    vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

}

// Funciones
function agregarCurso(e) {
    e.preventDefault()
    if (e.target.classList.contains("agregar-carrito")) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}
// // Función para eliminar cursos del carrito
function eliminarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains("borrar-curso")) {
        const cursoId = e.target.getAttribute("data-id");
        articulosCarrito = articulosCarrito.filter(elemento => elemento.id !== cursoId)
        carritoHTML();
    }

}

function leerDatosCurso(curso) {

    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }

    const existe = articulosCarrito.some(elemento => elemento.id === infoCurso.id);
    if (existe) {
        const cursos = articulosCarrito.map(elemento => {
            if (elemento.id === infoCurso.id) {
                elemento.cantidad++;
                return elemento;
            } else {
                return elemento;
            }
        });
        articulosCarrito = [...cursos];
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();
}

function carritoHTML() {
    limpiarHTML();
    articulosCarrito.forEach((elemento) => {
        const filaCarrito = document.createElement("tr");
        filaCarrito.innerHTML = `
        <td><img src= "${elemento.imagen}" width = "100"></td>
        <td>${elemento.titulo}</td>
        <td>${elemento.precio}</td>
        <td>${elemento.cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${elemento.id}" > X </a>
        </td>
        `
            ;

        contenedorCarrito.appendChild(filaCarrito)
    })
}

function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

function vaciarCarrito() {
    articulosCarrito = []
    limpiarHTML();
}

