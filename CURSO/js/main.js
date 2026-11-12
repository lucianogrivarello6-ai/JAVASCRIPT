class Producto {
  constructor(id, nombre, precio, stock) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }

  sumarIva() {
    return this.precio * 1.21;
  }

  aplicarDescuento(porcentaje) {
    this.precio = this.precio - (this.precio * porcentaje) / 100;
  }

  vender(cantidad) {
    if (cantidad > 0 && cantidad <= this.stock) {
      this.stock -= cantidad;
      return true;
    }
    return false;
  }
}

const producto1 = new Producto(1, "Remera", 15000, 10);
const producto2 = new Producto(2, "Jean", 40000, 5);
const producto3 = new Producto(3, "Zapatillas", 80000, 3);

const catalogo = [producto1, producto2, producto3];

function mostrarCatalogo(lista) {
  console.log("--- CATÁLOGO ---");
  for (const producto of lista) {
    console.log(
      producto.id + ") " + producto.nombre +
      " | " + producto.precio + " pesos" +
      " | Stock: " + producto.stock
    );
  }
}

function buscarProducto(lista, id) {
  return lista.find((producto) => producto.id === id);
}

function simularCompra() {
  let seguirComprando = true;
  let total = 0;

  while (seguirComprando) {
    const id = Number(prompt("Ingresá el ID del producto (1-3):"));
    const producto = buscarProducto(catalogo, id);

    if (!producto) {
      alert("Producto inexistente.");
    } else {
      const cantidad = Number(
        prompt("¿Cuántas unidades de " + producto.nombre + "?")
      );

      if (producto.vender(cantidad)) {
        total += producto.sumarIva() * cantidad;
        console.log("Vendiste " + cantidad + " x " + producto.nombre);
      } else {
        alert("Stock insuficiente o cantidad inválida.");
      }
    }

    seguirComprando = confirm("¿Querés agregar otro producto?");
  }

  console.log("Total a pagar (IVA incluido): " + total.toFixed(2) + " pesos");
}

mostrarCatalogo(catalogo);

producto1.aplicarDescuento(10);
console.log(producto1.nombre + " con 10% off: " + producto1.precio + " pesos");
console.log(producto2.nombre + " con IVA: " + producto2.sumarIva() + " pesos");

simularCompra();
mostrarCatalogo(catalogo); 