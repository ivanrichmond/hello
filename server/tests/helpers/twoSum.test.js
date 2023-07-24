import twoSum from '../../src/helpers/twoSum'

describe('twoSum', () => {
  test('twoSum test 1', () => {
    const output = twoSum([3,2,4,7,5,4,2,9,8,7,13,42,23,3],8);
    expect(output).toEqual([0,4]);
  });
});