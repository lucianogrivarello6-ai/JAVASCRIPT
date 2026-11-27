const CLAVE_STORAGE = "productosSimulador";

const productosIniciales = [
  { id: 1, nombre: "televisor", precio: 5000 },
  { id: 2, nombre: "lavarropas", precio: 8000 },
  { id: 3, nombre: "microondas", precio: 2000 },
  { id: 4, nombre: "secadora", precio: 4000 },
  { id: 5, nombre: "cocina", precio: 13000 }
];

function leerProductosStorage() {
  const rawData = localStorage.getItem(CLAVE_STORAGE) ?? JSON.stringify(productosIniciales);
  return JSON.parse(rawData);
}

function guardarProductosStorage(lista) {
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(lista));
}

let productos = leerProductosStorage();
let ultimoIdAgregado = null;

const inputNombre = document.getElementById("input-nombre");
const inputPrecio = document.getElementById("input-precio");
const btnAgregar = document.getElementById("btn-agregar");
const inputBuscar = document.querySelector("#input-buscar");
const contenedorItems = document.getElementById("contenedor-items");
const feedback = document.querySelector("#feedback");

function mostrarFeedback(mensaje) {
  feedback.textContent = mensaje;
  feedback.classList.add("activo");
}

function obtenerEstadoLista(lista) {
  return lista.length === 0
    ? `<p class="estado-vacio">No hay productos para mostrar.</p>`
    : lista
        .map((producto) => {
          const { id, nombre, precio } = producto;
          const claseNuevo = id === ultimoIdAgregado ? "nuevo" : "";

          return `
            <div class="card-producto ${claseNuevo}" data-id="${id}">
              <div>
                <h3>${nombre}</h3>
                <p>$${precio}</p>
              </div>
              <button type="button" class="btn-eliminar" data-id="${id}">Eliminar</button>
            </div>
          `;
        })
        .join("");
}

function renderizarProductos(lista = productos) {
  contenedorItems.innerHTML = obtenerEstadoLista(lista);

  if (ultimoIdAgregado !== null) {
    const idResaltado = ultimoIdAgregado;
    ultimoIdAgregado = null;

    setTimeout(() => {
      const tarjeta = contenedorItems.querySelector(`.card-producto[data-id="${idResaltado}"]`);
      tarjeta?.classList.remove("nuevo");
    }, 800);
  }

  asociarEventosEliminar();
}

function asociarEventosEliminar() {
  const botonesEliminar = document.getElementsByClassName("btn-eliminar");

  for (const boton of botonesEliminar) {
    boton.addEventListener("click", (evento) => {
      const idEliminar = Number(evento.currentTarget.dataset.id);
      const productoEliminado = productos.find((prod) => prod.id === idEliminar);

      productos = productos.filter((prod) => prod.id !== idEliminar);
      guardarProductosStorage(productos);
      filtrarProductos();

      const { nombre: nombreEliminado } = productoEliminado ?? {};
      mostrarFeedback(`Se eliminó "${nombreEliminado ?? "el producto"}" y se actualizó el storage.`);
    });
  }
}

function filtrarProductos() {
  const termino = inputBuscar.value.trim().toLowerCase();

  const listaFiltrada = termino === ""
    ? productos
    : productos.filter((prod) => prod.nombre.toLowerCase().includes(termino));

  renderizarProductos(listaFiltrada);
}

btnAgregar.onclick = () => {
  const nombreIngresado = inputNombre.value.trim();
  const precioIngresado = Number(inputPrecio.value);

  const esValido = nombreIngresado !== "" && !Number.isNaN(precioIngresado) && precioIngresado > 0;

  if (!esValido) {
    mostrarFeedback("Ingresá un nombre válido y un precio mayor a 0.");
    return;
  }

  const nuevoId = productos.length > 0
    ? Math.max(...productos.map((prod) => prod.id)) + 1
    : 1;

  const nuevoProducto = {
    id: nuevoId,
    nombre: nombreIngresado,
    precio: precioIngresado
  };

  productos = [...productos, nuevoProducto];
  ultimoIdAgregado = nuevoProducto.id;

  guardarProductosStorage(productos);

  inputNombre.value = "";
  inputPrecio.value = "";
  inputNombre.focus();

  filtrarProductos();

  const { nombre, precio } = nuevoProducto;
  mostrarFeedback(`Se agregó "${nombre}" ($${precio}) y quedó guardado.`);
};

inputBuscar.onkeyup = () => {
  filtrarProductos();
};

renderizarProductos();