import {describe, expect, test} from '@jest/globals';
import {bubbleSort} from '../../src/helpers/sort';

describe('sort', () => {
  test('bubble sort numeric', () => {
    const sorted = bubbleSort([2,1,3]);
    expect(sorted).toEqual([1,2,3]);
  });
});

describe('sort', () => {
  test('bubble sort string', () => {
    const sorted = bubbleSort(['orange','apple','tangerine']);
    expect(sorted).toEqual(['apple','orange','tangerine']);
  });
});