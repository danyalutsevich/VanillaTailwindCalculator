export function calculate(input) {
    let numbers = input.split(/[\+\-\*\/√\^]+/g).map(Number);
    let operators = input.replace(/[0-9]|\./g, "").split("");

    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        let operator = operators[i];
        let number = numbers[i + 1];
        if (operator === "+") {
            result += number;
        } else if (operator === "-") {
            result -= number;
        } else if (operator === "*") {
            result *= number;
        } else if (operator === "/") {
            result /= number;
        } else if (operator === "√") {
            result = Math.sqrt(number);
        } else if (operator === "^") {
            result = Math.pow(result, number);
        }
    }

    return result;
}
