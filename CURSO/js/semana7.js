const productos = [
  { id: 1, nombre: "televisor", precio: 5000 },
  { id: 2, nombre: "lavarropas", precio: 8000 },
  { id: 3, nombre: "microondas", precio: 2000 },
  { id: 4, nombre: "secadora", precio: 4000 },
  { id: 5, nombre: "cocina", precio: 13000 }
];

let inputNombre = document.getElementById("input-nombre");
let inputPrecio = document.getElementById("input-precio");
let btnAgregar = document.getElementById("btn-agregar");
let inputBuscar = document.querySelector("#input-buscar");
let contenedorItems = document.getElementById("contenedor-items");
let feedback = document.querySelector("#feedback");

let ultimoIdAgregado = null;

function mostrarFeedback(mensaje) {
  feedback.innerHTML = mensaje;
  feedback.classList.add("activo");
}

function renderizarProductos(lista = productos) {
  contenedorItems.innerHTML = "";

  if (lista.length === 0) {
    contenedorItems.innerHTML = `<p>No se encontraron productos.</p>`;
    return;
  }

  lista.forEach((producto) => {
    let claseExtra = producto.id === ultimoIdAgregado ? "nuevo" : "";

    contenedorItems.innerHTML += `
      <div class="card-producto ${claseExtra}" data-id="${producto.id}">
        <div>
          <h3>${producto.nombre}</h3>
          <p>$${producto.precio}</p>
        </div>
        <button type="button" class="btn-eliminar" data-id="${producto.id}">Eliminar</button>
      </div>
    `;
  });

  if (ultimoIdAgregado !== null) {
    let idResaltado = ultimoIdAgregado;
    ultimoIdAgregado = null;
    setTimeout(() => {
      let tarjeta = contenedorItems.querySelector(`.card-producto[data-id="${idResaltado}"]`);
      if (tarjeta) {
        tarjeta.classList.remove("nuevo");
      }
    }, 800);
  }

  activarBotonesEliminar();
}

function activarBotonesEliminar() {
  let botonesEliminar = document.getElementsByClassName("btn-eliminar");

  for (let boton of botonesEliminar) {
    boton.addEventListener("click", (evento) => {
      let idEliminar = Number(evento.currentTarget.dataset.id);
      let productoEliminado = productos.find((prod) => prod.id === idEliminar);
      let indice = productos.findIndex((prod) => prod.id === idEliminar);

      if (indice !== -1) {
        productos.splice(indice, 1);
        filtrarProductos();
        mostrarFeedback(`Se eliminó "${productoEliminado.nombre}" de la lista.`);
      }
    });
  }
}

function filtrarProductos() {
  let texto = inputBuscar.value.trim().toLowerCase();

  if (texto === "") {
    renderizarProductos(productos);
    return;
  }

  let filtrados = productos.filter((prod) =>
    prod.nombre.toLowerCase().includes(texto)
  );
  renderizarProductos(filtrados);
}

btnAgregar.onclick = () => {
  let nombreIngresado = inputNombre.value.trim();
  let precioIngresado = Number(inputPrecio.value);

  if (nombreIngresado === "" || isNaN(precioIngresado) || precioIngresado <= 0) {
    mostrarFeedback("Completá un nombre y un precio mayor a 0.");
    return;
  }

  let nuevoId = productos.length > 0
    ? Math.max(...productos.map((prod) => prod.id)) + 1
    : 1;

  let nuevoProducto = {
    id: nuevoId,
    nombre: nombreIngresado,
    precio: precioIngresado
  };

  productos.push(nuevoProducto);
  ultimoIdAgregado = nuevoProducto.id;

  inputNombre.value = "";
  inputPrecio.value = "";
  inputNombre.focus();

  filtrarProductos();
  mostrarFeedback(`Se agregó "${nuevoProducto.nombre}" ($${nuevoProducto.precio}).`);
};

inputBuscar.onkeyup = () => {
  filtrarProductos();
};

renderizarProductos();