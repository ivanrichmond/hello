const isMultiple = (number, multiple) => {
    return number % multiple === 0;
}

/**
 * Checks if param1 is a multiple of param2 and returns param3 if so or '' if not.
 * EXAMPLE: multipleWord(33,3,'fizz') returns 'fizz', but multipleWord(34,4,'fizz') returns ''.
 * @param {int} number
 * @param {int} multiple
 * @param {string} word to print if number is a multiple of multiple
 * @return multiple | empty string
 */
const multipleWord = (number, multiple, word) => {
    return isMultiple(number, multiple) ? word : '';
}

const fizzWord = (number) => {
    return multipleWord(number, 3, 'Fizz');
}

const buzzWord = (number) => {
    return multipleWord(number, 5, 'Buzz');
}

export const fizzBuzz = (iterations) => {
    let output = [];
    for(let i = 1; i <= iterations; i++){
        let index = i - 1;
        let value = (fizzWord(i) + buzzWord(i)) || i;
        output[index] = value;
    }
    return output;
}