let continuar = true;
let total = 0;

while (continuar) {
    let opcion = prompt(
        "Elige un producto:\n" +
        "1. Producto A (1000)\n" +
        "2. Producto B (2000)\n" +
        "3. Salir"
    );

    if (opcion === "3" || opcion === null) {
        continuar = false;
        alert("Saliendo del simulador.");
    } else if (opcion === "1") {
        let cantidad = parseInt(prompt("Ingresa la cantidad:"));
        if (cantidad > 0) {
            let subtotal = 1000 * cantidad;
            if (subtotal > 5000) {
                subtotal = subtotal * 0.9;
                alert("Descuento aplicado. Subtotal con descuento: " + subtotal);
            } else {
                alert("Subtotal: " + subtotal);
            }
            total += subtotal;
        } else {
            alert("Cantidad inválida.");
        }
    } else if (opcion === "2") {
        let cantidad = parseInt(prompt("Ingresa la cantidad:"));
        if (cantidad > 0) {
            let subtotal = 2000 * cantidad;
            if (subtotal > 5000) {
                subtotal = subtotal * 0.9;
                alert("Descuento aplicado. Subtotal con descuento: " + subtotal);
            } else {
                alert("Subtotal: " + subtotal);
            }
            total += subtotal;
        } else {
            alert("Cantidad inválida.");
        }
    } else {
        alert("Opción incorrecta.");
    }
}

console.log("Total final de la compra: " + total);
alert("Compra finalizada. Total a pagar: " + total);




let numero1 = parseFloat(prompt("Ingresa el primer número:"));
let numero2 = parseFloat(prompt("Ingresa el segundo número:"));
sumar(numero1, numero2);

function sumar(numero1,numero2){
    alert("El resultado de la suma es: " + (numero1 + numero2));
}