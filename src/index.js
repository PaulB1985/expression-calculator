function eval() {
    return
}

function calculate(str) {
    // remove nasting brackets
    if (str[0] === '(') {
        str = str.substring(1, str.length - 1)
    }

    // split string to array by operators
    let digits = str.split(' ')

    // first loop for * and /
    for (let i = 0; i < digits.length; i++) {
        if (digits[i] === '*') {
            let calculated = Number(digits[i - 1]) * Number(+digits[i + 1])
            digits.splice(i - 1, 3, calculated)
            i = 0
        }
        if (digits[i] === '/') {
            if (digits[i + 1] == 0) {
                throw new Error('TypeError: Division by zero.')
            }
            let calculated = Number(+digits[i - 1]) / Number(+digits[i + 1])
            digits.splice(i - 1, 3, calculated)
            i = 0
        }
    }

    // second loop for + and -
    for (let i = 0; i < digits.length; i++) {
        if (digits[i] === '+') {
            let calculated = Number(digits[i - 1]) + Number(digits[i + 1])
            digits.splice(i - 1, 3, calculated)
            i = 0
        }
        if (digits[i] === '-') {
            let calculated = Number(digits[i - 1]) - Number(digits[i + 1])
            digits.splice(i - 1, 3, calculated)
            i = 0
        }
    }
    return digits[0]
}

function expressionCalculator(expr) {
    // check if brackets are paired
    let brackets = 0
    for (let i = 0; i < expr.length; i++) {
        if (expr[i] === '(') {
            brackets++
        }
        if (expr[i] === ')') {
            brackets--
        }
    }
    if (brackets != 0) {
        throw new Error('ExpressionError: Brackets must be paired')
    }

    // remove all spaces in string
    expr = expr
        .split(' ')
        .filter(i => i != '')
        .join('')

    // add spaces for all operators 
    expr = expr.replace(/[-]/g, ' - ')
    expr = expr.replace(/[+]/g, ' + ')
    expr = expr.replace(/[/]/g, ' / ')
    expr = expr.replace(/[*]/g, ' * ')

    // replace all expression in brackets by their calculated value
    while (expr.includes('(')) {
        expr = expr.replace(/\([^()]*\)/, calculate)
    }
    // calculate whole expression
    expr = calculate(expr)
    return Number(expr)
}

module.exports = {
    expressionCalculator
}