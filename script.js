function sumar(num1, num2) {
    return parseFloat(num1) + parseFloat(num2);
}
function restar(num1, num2) {
    return parseFloat(num1) - parseFloat(num2);
}
function multiplicar(num1, num2) {
    return parseFloat(num1) * parseFloat(num2);
}
function dividir(num1, num2) {
    if (parseFloat(num2) === 0) {
        return 'Error: División por cero';
    }
    return parseFloat(num1) / parseFloat(num2);
}

let primerNumero = 9;
let segundoNumero = 3;
let pruebaCero = 0;
console.log(sumar(primerNumero, segundoNumero));         // 8
console.log(restar(primerNumero, segundoNumero));       // 2
console.log(multiplicar(primerNumero, segundoNumero));  // 15
console.log(dividir(primerNumero, pruebaCero));    // Error: División por cero
console.log(dividir(primerNumero, segundoNumero));    // 2.5

