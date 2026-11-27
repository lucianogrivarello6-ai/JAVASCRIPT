const productos = [
  { id: 1, nombre: "Teclado mecánico", precio: 45000 },
  { id: 2, nombre: "Mouse inalámbrico", precio: 22000 },
  { id: 3, nombre: "Monitor 24''", precio: 180000 }
];

const formProducto = document.querySelector("#form-producto");
const inputNombre = document.getElementById("input-nombre");
const inputPrecio = document.getElementById("input-precio");
const inputBuscar = document.querySelector("#input-buscar");
const contenedorItems = document.getElementById("contenedor-items");
const feedbackEl = document.querySelector("#feedback");

let ultimoIdAgregado = null;
let timeoutFeedback = null;

function formatearPrecio(valor) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(valor);
}

function mostrarFeedback(mensaje, tipo = "info") {
  feedbackEl.textContent = mensaje;
  feedbackEl.className = `feedback feedback--visible feedback--${tipo}`;

  clearTimeout(timeoutFeedback);
  timeoutFeedback = setTimeout(() => {
    feedbackEl.className = "feedback";
    feedbackEl.textContent = "";
  }, 3000);
}

function obtenerSiguienteId() {
  if (productos.length === 0) return 1;
  return Math.max(...productos.map((item) => item.id)) + 1;
}

function renderizarProductos(lista = productos) {
  contenedorItems.innerHTML = "";

  if (lista.length === 0) {
    contenedorItems.innerHTML = `<li class="item-vacio">No hay productos para mostrar.</li>`;
    return;
  }

  lista.forEach((producto) => {
    const esReciente = producto.id === ultimoIdAgregado ? "item-producto--nuevo" : "";

    contenedorItems.innerHTML += `
      <li class="item-producto ${esReciente}" data-id="${producto.id}">
        <div class="item-producto__info">
          <h3>${producto.nombre}</h3>
          <p>${formatearPrecio(producto.precio)}</p>
        </div>
        <button type="button" class="btn btn--danger btn-eliminar" data-id="${producto.id}">
          Eliminar
        </button>
      </li>
    `;
  });

  if (ultimoIdAgregado !== null) {
    const idResaltado = ultimoIdAgregado;
    ultimoIdAgregado = null;
    setTimeout(() => {
      const elemento = contenedorItems.querySelector(`.item-producto[data-id="${idResaltado}"]`);
      if (elemento) {
        elemento.classList.remove("item-producto--nuevo");
      }
    }, 900);
  }

  asociarEventosEliminar();
}

function asociarEventosEliminar() {
  const botonesEliminar = document.getElementsByClassName("btn-eliminar");

  for (const boton of botonesEliminar) {
    boton.addEventListener("click", (evento) => {
      const idEliminar = Number(evento.currentTarget.dataset.id);
      const productoEncontrado = productos.find((item) => item.id === idEliminar);
      const indice = productos.findIndex((item) => item.id === idEliminar);

      if (indice !== -1) {
        productos.splice(indice, 1);
        filtrarYRenderizar();
        mostrarFeedback(
          `Se eliminó "${productoEncontrado.nombre}" de la lista.`,
          "info"
        );
      }
    });
  }
}

function filtrarYRenderizar() {
  const termino = inputBuscar.value.trim().toLowerCase();
  if (!termino) {
    renderizarProductos(productos);
    return;
  }

  const filtrados = productos.filter((item) =>
    item.nombre.toLowerCase().includes(termino)
  );
  renderizarProductos(filtrados);
}

formProducto.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nombreLimpio = inputNombre.value.trim();
  const precioNumero = Number(inputPrecio.value);

  if (!nombreLimpio || Number.isNaN(precioNumero) || precioNumero <= 0) {
    mostrarFeedback("Ingresá un nombre válido y un precio mayor a 0.", "error");
    return;
  }

  const nuevoProducto = {
    id: obtenerSiguienteId(),
    nombre: nombreLimpio,
    precio: precioNumero
  };

  productos.push(nuevoProducto);
  ultimoIdAgregado = nuevoProducto.id;

  formProducto.reset();
  inputNombre.focus();

  filtrarYRenderizar();
  mostrarFeedback(`Agregaste "${nuevoProducto.nombre}" al simulador.`, "exito");
});

inputBuscar.addEventListener("keyup", () => {
  filtrarYRenderizar();
});

renderizarProductos();