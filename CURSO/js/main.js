const obtenerPrecioFinal = (precio, descuento) => precio - descuento;

const calcularDescuento = (precio) => precio * 0.10;

function mostrarResultado(nombre, producto, total) {
    alert("¡Hola " + nombre + "! Elegiste " + producto + ".\nEl total a pagar con descuento es: $" + total.toFixed(2));
}

let nombre = prompt("Ingresa tu nombre:");
let activo = true;

while (activo) {
    let opcion = prompt(
        "Hola " + nombre + ", elegí un producto:\n" +
        "1. Notebook Gamer - $1200\n" +
        "2. Auriculares Inalámbricos - $150\n" +
        "3. Mouse Ergonómico - $50\n" +
        "4. Salir"
    );

    let seleccion = parseInt(opcion);

    switch (seleccion) {
        case 1: {
            let precio = 1200;
            let descuento = calcularDescuento(precio);
            let precioFinal = obtenerPrecioFinal(precio, descuento);
            mostrarResultado(nombre, "Notebook Gamer", precioFinal);
            break;
        }
        case 2: {
            let precio = 150;
            let descuento = calcularDescuento(precio);
            let precioFinal = obtenerPrecioFinal(precio, descuento);
            mostrarResultado(nombre, "Auriculares Inalámbricos", precioFinal);
            break;
        }
        case 3: {
            let precio = 50;
            let descuento = calcularDescuento(precio);
            let precioFinal = obtenerPrecioFinal(precio, descuento);
            mostrarResultado(nombre, "Mouse Ergonómico", precioFinal);
            break;
        }
        case 4:
            activo = false;
            alert("Simulador finalizado. ¡Gracias por tu visita, " + nombre + "!");
            break;
        default:
            alert("Opción no válida. Por favor, ingresa un número del 1 al 4.");
            break;
    }
}