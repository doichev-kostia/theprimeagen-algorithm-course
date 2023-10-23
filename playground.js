const assert = require("node:assert");
/**
 *
 * @param {number} number
 * @returns {number}
 */
function add(number) {
    if (number === 1) return 1;

    const result = number + add(number - 1);

    return result;
}

assert.equal(add(5), 15)

function factorial(number) {
    if (number === 0) return 1;

    return number * factorial(number - 1);
}

assert.equal(factorial(5), 120);

function fib(number) {
    if (number === 1 || number === 2) {
        return 1;
    }

    return fib(number - 1) + fib(number - 2);
}

assert.equal(fib(8), 21)

/**
 *
 * @param {string} str
 * @returns {string}
 */
function reverse(str) {
    if (str.length <= 1) {
        return str[0]
    }

    const reversed = reverse(str.slice(1));
    return reversed.concat(str[0]);
}

assert.strictEqual(reverse('hello'), 'olleh')
