let dia = prompt("¿Qué día de la semana es hoy?");
alert("Hoy es " + dia);

let numero = parseInt(prompt("Ingrese un número:"));
console.log(numero + 1);

const nombre = prompt("¿Cómo te llamas?");
const anioNacimiento = prompt("¿En qué año naciste?");
const ciudad = prompt("¿En qué ciudad vives?");

const anioActual = 2026;
const edad = anioActual - parseInt(anioNacimiento);

const mensajeFinal = `¡Hola, ${nombre}! Tienes aproximadamente ${edad} años y vives en la ciudad de ${ciudad}.`;

alert(mensajeFinal);
console.log(mensajeFinal);