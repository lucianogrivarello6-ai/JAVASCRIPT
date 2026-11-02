let tarea1 = "manzana";
let tarea2 = "banana";
let tarea3 = "naranja";
let tarea4 = "pera";
let tarea5 = "kiwi";

const tareas = ["manzana", "banana", "naranja", "pera", "kiwi"];
console.log(tareas);

tareas.push("mango");
console.log(tareas);

tareas.unshift("fresa");
console.log(tareas);

let elementoEliminado = tareas.pop();
console.log(tareas);
alert("Se ha eliminado el elemento: " + elementoEliminado);

let buscarTarea = prompt("Ingrese el nombre de la tarea que desea buscar:");
if (tareas.includes(buscarTarea)) {
    let indice = tareas.indexOf(buscarTarea);
    console.log("La tarea '" + buscarTarea + "' se encuentra en la posición: " + indice);
} else {
    console.log("La tarea '" + buscarTarea + "' no se encuentra en la lista.");
}

tareas.splice(2, 1, "uva");
console.log(tareas);

function mostrarTareas(array) {
    for (const tarea of array) {
        console.log("Producto: " + tarea);
    }
}

mostrarTareas(tareas);