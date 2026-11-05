let tareas = [];

function agregarTarea() {
    let nuevaTarea = prompt("Ingrese el nombre de la tarea/producto a agregar:");
    if (nuevaTarea && nuevaTarea.trim() !== "") {
        tareas.push(nuevaTarea.trim());
        alert(`'${nuevaTarea}' fue agregada con éxito al final.`);
    } else {
        alert("No ingresaste un nombre válido.");
    }
}

function buscarTarea() {
    if (tareas.length === 0) {
        alert("La lista está vacía.");
        return;
    }
    let busqueda = prompt("Ingrese el nombre de la tarea que desea buscar:");
    
    if (tareas.includes(busqueda)) {
        let indice = tareas.indexOf(busqueda);
        alert(`La tarea '${busqueda}' se encuentra en la posición (índice) ${indice}.`);
    } else {
        alert(`La tarea '${busqueda}' no se encuentra en la lista.`);
    }
}

function actualizarTarea() {
    if (tareas.length === 0) {
        alert("La lista está vacía, no hay elementos para actualizar.");
        return;
    }
    
    let tareaAReemplazar = prompt("Ingrese el nombre exacto de la tarea que desea actualizar:");
    let indice = tareas.indexOf(tareaAReemplazar);

    if (indice !== -1) {
        let nuevoNombre = prompt(`Encontrada en la posición ${indice}. Ingrese el nuevo valor/nombre:`);
        if (nuevoNombre && nuevoNombre.trim() !== "") {
            tareas.splice(indice, 1, nuevoNombre.trim());
            alert("Tarea actualizada correctamente con splice.");
        } else {
            alert("Nombre no válido. Operación cancelada.");
        }
    } else {
        alert("La tarea ingresada no existe en la lista.");
    }
}

function eliminarUltimaTarea() {
    if (tareas.length === 0) {
        alert("La lista está vacía, no hay nada que eliminar.");
        return;
    }
    let elementoEliminado = tareas.pop();
    alert(`Se ha eliminado el elemento: ${elementoEliminado}`);
}

function mostrarTareas(array) {
    if (array.length === 0) {
        alert("La lista de tareas está vacía.");
        console.log("Lista vacía.");
        return;
    }
    
    console.log("--- LISTA DE TAREAS ---");
    let mensaje = "Lista de Tareas Actuales:\n";
    let contador = 0;
    
    for (const tarea of array) {
        console.log(`Posición ${contador} - Producto: ${tarea}`);
        mensaje += `[${contador}] Producto: ${tarea}\n`;
        contador++;
    }
    alert(mensaje);
}


function iniciarSimulador() {
    let opcion = "";

    while (opcion !== "6") {
        opcion = prompt(
            "--- SIMULADOR DE TAREAS INTERACTIVO ---\n" +
            "1. Agregar tarea (push)\n" +
            "2. Buscar tarea (includes / indexOf)\n" +
            "3. Actualizar tarea por índice (splice)\n" +
            "4. Eliminar último elemento (pop)\n" +
            "5. Listar tareas (for...of)\n" +
            "6. Salir\n\n" +
            "Ingrese el número de la opción deseada:"
        );

        switch (opcion) {
            case "1":
                agregarTarea();
                break;
            case "2":
                buscarTarea();
                break;
            case "3":
                actualizarTarea();
                break;
            case "4":
                eliminarUltimaTarea();
                break;
            case "5":
                mostrarTareas(tareas);
                break;
            case "6":
                alert("Saliendo del simulador. ¡Hasta luego!");
                break;
            default:
                alert("Opción no válida. Por favor, ingrese un número del 1 al 6.");
                break;
        }
    }
}

iniciarSimulador();