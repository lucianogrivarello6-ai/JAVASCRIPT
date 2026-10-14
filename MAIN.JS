
let continuar = true;
let totalCompra = 0;
let resumenProductos = "";

alert("¡Bienvenido a la Tienda Gamer! Vamos a simular tu compra.");

while (continuar) {
    
    let opcion = prompt(
        "Seleccioná un producto para agregar al carrito:\n\n" +
        "1. Teclado Mecánico RGB ($45.000)\n" +
        "2. Mouse Gamer Pro ($25.000)\n" +
        "3. Auriculares Surround ($60.000)\n\n" +
        "Escribe 'ESC' o 'salir' para finalizar y pagar."
    );

    if (opcion === null || opcion.toLowerCase() === "esc" || opcion.toLowerCase() === "salir") {
        continuar = false;
        break;
    }

    let precio = 0;
    let nombreProducto = "";

    if (opcion === "1") {
        nombreProducto = "Teclado Mecánico RGB";
        precio = 45000;
    } else if (opcion === "2") {
        nombreProducto = "Mouse Gamer Pro";
        precio = 25000;
    } else if (opcion === "3") {
        nombreProducto = "Auriculares Surround";
        precio = 60000;
    } else {
        alert("Opción no válida. Por favor, selecciona un número del 1 al 3 o escribe ESC para salir.");
        continue;
    }

    let cantidad = 0;
    do {
        let entradaCantidad = prompt(`¿Cuántas unidades de "${nombreProducto}" deseas llevar? (Debe ser mayor a 0):`);
        
        if (entradaCantidad === null) {
            cantidad = 0;
            break;
        }

        cantidad = parseInt(entradaCantidad);

        if (isNaN(cantidad) || cantidad <= 0) {
            alert("Error: Ingresa un número válido mayor a 0.");
        }
    } while (isNaN(cantidad) || cantidad <= 0);

    if (cantidad > 0) {
        let subtotal = precio * cantidad;

        if (subtotal > 100000) {
            let descuento = subtotal * 0.10; // 10% de descuento
            subtotal -= descuento;
            alert(`¡Promoción aplicada! Obtuviste un 10% de descuento en este producto. Te quedó en: $${subtotal}`);
        }

        totalCompra += subtotal;
        resumenProductos += `- ${cantidad}x ${nombreProducto} (Subtotal con desc. si aplica: $${subtotal})\n`;
        
        alert(`Se agregaron ${cantidad} unidad(es) de ${nombreProducto} al carrito.`);
    }
}

console.log("=== TICKET DE COMPRA ===");

if (totalCompra > 0) {
    console.log(resumenProductos);
    console.log(`Subtotal de productos: $${totalCompra}`);

    if (totalCompra >= 80000) {
        console.log("¡Envío bonificado gratis por superar los $80.000!");
    } else {
        let costoEnvio = 5000;
        console.log(`Costo de envío estándar: $${costoEnvio}`);
        totalCompra += costoEnvio;
    }

    console.log(`TOTAL FINAL A PAGAR: $${totalCompra}`);
    
    alert(
        "¡Compra finalizada con éxito!\n\n" +
        "Resumen:\n" + resumenProductos + "\n" +
        `Total Final (con envío si aplica): $${totalCompra}\n\n` +
        "Revisa la consola (F12) para ver el ticket detallado."
    );
} else {
    console.log("El carrito está vacío. No se realizaron compras.");
    alert("No seleccionaste ningún producto. ¡Vuelve pronto!");
}