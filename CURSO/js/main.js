class Vino {
  constructor(id, nombre, cepa, precio, stock) {
    this.id = id;
    this.nombre = nombre;
    this.cepa = cepa;
    this.precio = precio;
    this.stock = stock;
  }
}

const catalogoVinos = [
  new Vino(1, "Malbec Reserva", "Malbec", 15000, 10),
  new Vino(2, "Cabernet Franc Gran Puntuación", "Cabernet Franc", 22000, 4),
  new Vino(3, "Chardonnay Cosecha Especial", "Chardonnay", 12000, 0),
  new Vino(4, "Pinot Noir Edición Limitada", "Pinot Noir", 18500, 6),
  new Vino(5, "Blend de Autor", "Blend", 30000, 2)
];


let idBuscado = parseInt(prompt("Ingrese el ID del vino que desea consultar (1 al 5):"));
const vinoEncontrado = catalogoVinos.find(vino => vino.id === idBuscado);

if (vinoEncontrado) {
  console.log("=== VINO ENCONTRADO (find) ===");
  console.log(`Nombre: ${vinoEncontrado.nombre} | Precio: $${vinoEncontrado.precio} | Stock: ${vinoEncontrado.stock}`);
} else {
  console.log("No se encontró ningún vino con ese ID.");
}

const vinosDisponibles = catalogoVinos.filter(vino => vino.stock > 0);
console.log("=== CATÁLOGO DISPONIBLES (filter) ===");
console.log(vinosDisponibles);

const valorTotalStock = catalogoVinos.reduce((acumulador, vino) => acumulador + (vino.precio * vino.stock), 0);
console.log("=== VALORACIÓN DE INVENTARIO (reduce) ===");
console.log(`Capital total invertido en stock de vinos: $${valorTotalStock}`);