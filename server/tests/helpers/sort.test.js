import {describe, expect, test} from '@jest/globals';
import {binarySearch} from '../../src/helpers/sort';
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

describe('binary search', () => {
  test('binary search with integers', () => {
    const index = binarySearch([1,2,3,4,5],2);
    expect(index).toBe(1);
  });
});

describe('binary search', () => {
  test('binary search with integers edge case: index 0', () => {
    const index = binarySearch([1,2,3,4,5],1);
    expect(index).toBe(0);
  });
});

describe('binary search', () => {
  test('binary search with integers edge case: index last', () => {
    const index = binarySearch([1,2,3,4,5,6],6);
    expect(index).toBe(5);
  });
});

describe('binary search', () => {
  test('binary search with strings', () => {
    const index = binarySearch(['apple','banana','guava','pear'],'banana');
    expect(index).toBe(1);
  });
});

describe('binary search', () => {
  test('binary search with empty array', () => {
    const index = binarySearch([],'banana');
    expect(index).toBe(-1);
  });
});