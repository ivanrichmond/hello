import {describe, expect, test} from '@jest/globals';
import {fizzBuzz} from '../../src/helpers/fizzbuzz';

describe('fizzbuzz', () => {
  test('15 iterations', () => {
    const output = fizzBuzz(15);
    expect(output).toEqual([1,2,'Fizz',4,'Buzz','Fizz',7,8,'Fizz','Buzz',11,'Fizz',13,14,'FizzBuzz']);
  });
});