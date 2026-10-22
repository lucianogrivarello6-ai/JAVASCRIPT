const calcularDescuento = (precio) => precio * 0.10;

function obtenerPrecioFinal(precio, descuento) {
    return precio - descuento;
}

function mostrarResultado(nombre, total) {
    alert("Hola " + nombre + "! El total a pagar es: " + total.toFixed(2));
    console.log("Cliente: " + nombre + " | Total con descuento: " + total.toFixed(2));
}

let nombre = prompt("Ingresa tu nombre:");
let activo = true;

while (activo) {
    let entrada = prompt("Ingresa el precio del producto o escribe 0 para salir:");
    let precio = parseFloat(entrada);

    if (precio === 0 || isNaN(precio)) {
        activo = false;
        alert("Simulador finalizado Gracias!");
    } else if (precio > 0) {
        let descuento = calcularDescuento(precio);
        let precioFinal = obtenerPrecioFinal(precio, descuento);
        mostrarResultado(nombre, precioFinal);
    } else {
        alert("Por favor, ingresa un numero valido.");
    }
}