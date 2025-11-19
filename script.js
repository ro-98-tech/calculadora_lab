function sumar(num1, num2) {
    return num1 + num2;
}
function restar(num1, num2) {
    return num1 - num2;
}
function multiplicar(num1, num2) {
    return num1 * num2;
}
function dividir(num1, num2) {
    if (num2 === 0) {
        return 'Error: División por cero';
    }
    return num1 / num2;
}
console.log(sumar(5, 3));         // 8
console.log(restar(5, 3));       // 2
console.log(multiplicar(5, 3));  // 15
console.log(dividir(5, 0));    // Error: División por cero
console.log(dividir(5, 2));    // 2.5

