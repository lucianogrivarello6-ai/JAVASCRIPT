class Vino {
  constructor(id, nombre, cepa, precio, stock) {
    this.id = id;
    this.nombre = nombre;
    this.cepa = cepa;
    this.precio = precio;
    this.stock = stock;
  }

  descontarStock(cantidad) {
    this.stock -= cantidad;
  }
}

const catalogoVinos = [
  new Vino(1, "Malbec Reserva", "Malbec", 15000, 10),
  new Vino(2, "Cabernet Franc Gran Puntuación", "Cabernet Franc", 22000, 4),
  new Vino(3, "Chardonnay Cosecha Especial", "Chardonnay", 12000, 0),
  new Vino(4, "Pinot Noir Edición Limitada", "Pinot Noir", 18500, 6),
  new Vino(5, "Blend de Autor", "Blend", 30000, 2)
];

const carrito = [];


function mostrarCatalogoDisponible() {
  const disponibles = catalogoVinos.filter(vino => vino.stock > 0);
  console.log("=== VINOS DISPONIBLES EN TIENDA ===");
  disponibles.forEach(v => {
    console.log(`ID: ${v.id} | ${v.nombre} (${v.cepa}) - $${v.precio} [Stock: ${v.stock}]`);
  });
}

function filtrarPorPresupuesto() {
  const maxPrecio = parseFloat(prompt("Ingrese su presupuesto máximo por botella ($):"));
  if (isNaN(maxPrecio) || maxPrecio <= 0) {
    alert("Por favor, ingrese un monto válido.");
    return;
  }

  const opcionesEnPresupuesto = catalogoVinos.filter(vino => vino.precio <= maxPrecio && vino.stock > 0);

  if (opcionesEnPresupuesto.length > 0) {
    console.log(`=== VINOS DISPONIBLES HASTA $${maxPrecio} ===`);
    opcionesEnPresupuesto.forEach(v => console.log(`ID: ${v.id} | ${v.nombre} - $${v.precio}`));
  } else {
    alert("No tenemos vinos disponibles dentro de ese presupuesto.");
  }
}

function agregarAlCarrito() {
  mostrarCatalogoDisponible();
  const idElegido = parseInt(prompt("Ingrese el ID del vino que desea agregar al carrito:"));
  
  const vinoEncontrado = catalogoVinos.find(vino => vino.id === idElegido);

  if (!vinoEncontrado) {
    alert("El ID ingresado no corresponde a ningún vino.");
    return;
  }

  if (vinoEncontrado.stock <= 0) {
    alert(`Lo sentimos, no queda stock de ${vinoEncontrado.nombre}.`);
    return;
  }

  const cantidad = parseInt(prompt(`¿Cuántas botellas de "${vinoEncontrado.nombre}" desea llevar? (Disponible: ${vinoEncontrado.stock})`));

  if (isNaN(cantidad) || cantidad <= 0 || cantidad > vinoEncontrado.stock) {
    alert("Cantidad inválida o superior al stock disponible.");
    return;
  }

  const itemEnCarrito = carrito.find(item => item.id === vinoEncontrado.id);
  
  if (itemEnCarrito) {
    itemEnCarrito.cantidad += cantidad;
  } else {
    carrito.push({
      id: vinoEncontrado.id,
      nombre: vinoEncontrado.nombre,
      precio: vinoEncontrado.precio,
      cantidad: cantidad
    });
  }

  vinoEncontrado.descontarStock(cantidad);
  alert(`¡Agregaste ${cantidad}x ${vinoEncontrado.nombre} al carrito!`);
}

function finalizarCompra() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío. Agregá algún vino antes de finalizar.");
    return;
  }

  const resumenDetalle = carrito.map(item => {
    return {
      producto: item.nombre,
      cantidad: item.cantidad,
      subtotal: item.precio * item.cantidad
    };
  });

  const totalAPagar = resumenDetalle.reduce((acc, item) => acc + item.subtotal, 0);

  console.log("=== RESUMEN DE TU COMPRA ===");
  resumenDetalle.forEach(linea => {
    console.log(`${linea.cantidad}x ${linea.producto} -> Subtotal: $${linea.subtotal}`);
  });
  console.log(`TOTAL FINAL A PAGAR: $${totalAPagar}`);
  
  alert(`¡Gracias por tu compra! El total es de $${totalAPagar}. Revisá el ticket detallado en la consola.`);
}

function iniciarSimulador() {
  alert("¡Bienvenido a Club Vino! Abrí la consola (F12) para ver el catálogo y el detalle de tus operaciones.");
  let opcion = "";

  while (opcion !== "5") {
    opcion = prompt(
      "Seleccione una opción:\n" +
      "1 - Ver catálogo de vinos disponibles\n" +
      "2 - Buscar vinos por presupuesto máximo\n" +
      "3 - Agregar vino al carrito\n" +
      "4 - Finalizar compra y ver resumen\n" +
      "5 - Salir"
    );

    switch (opcion) {
      case "1":
        mostrarCatalogoDisponible();
        break;
      case "2":
        filtrarPorPresupuesto();
        break;
      case "3":
        agregarAlCarrito();
        break;
      case "4":
        finalizarCompra();
        break;
      case "5":
        alert("¡Gracias por visitar Club Vino!");
        break;
      case null: 
        opcion = "5";
        break;
      default:
        alert("Opción no válida. Por favor, elegí del 1 al 5.");
        break;
    }
  }
}

iniciarSimulador();