//@flow
import { bubbleSort } from './sort'

describe('bubbleSort() numeric', () => {
    test('golden path', () => {
        const sorted = bubbleSort([3,1,2,1,2,3])
        expect(sorted).toStrictEqual([1,1,2,2,3,3])
    })

    test('empty', () => {
        const sorted = bubbleSort([])
        expect(sorted).toStrictEqual([])
    })

    test('already sorted', () => {
        const sorted = bubbleSort([1,2,3])
        expect(sorted).toStrictEqual([1,2,3])
    })

    test('all descending', () => {
        const sorted = bubbleSort([3,2,1])
        expect(sorted).toStrictEqual([1,2,3])
    })

    test('all the same', () => {
        const sorted = bubbleSort([1,1,1])
        expect(sorted).toStrictEqual([1,1,1])
    })

    test('sort ascending explicit', () => {
        const sorted = bubbleSort([3,1,2,1,2,3], 'ascending')
        expect(sorted).toStrictEqual([1,1,2,2,3,3])
    })

    test('sort descending', () => {
        const sorted = bubbleSort([3,1,2,1,2,3], 'descending')
        expect(sorted).toStrictEqual([3,3,2,2,1,1])
    })
})

describe('bubbleSort() string', () => {
    test('golden path', () => {
        const sorted = bubbleSort(['c','b','a','a','b','c'])
        expect(sorted).toStrictEqual(['a','a','b','b','c','c'])
    })

    test('already sorted', () => {
        const sorted = bubbleSort(['a','b','c'])
        expect(sorted).toStrictEqual(['a','b','c'])
    })

    test('all descending', () => {
        const sorted = bubbleSort(['c','b','a'])
        expect(sorted).toStrictEqual(['a','b','c'])
    })

    test('all the same', () => {
        const sorted = bubbleSort(['a','a','a'])
        expect(sorted).toStrictEqual(['a','a','a'])
    })

    test('sort ascending explicit', () => {
        const sorted = bubbleSort(['c','a','b','a','b','c'], 'ascending')
        expect(sorted).toStrictEqual(['a','a','b','b','c','c'])
    })

    test('sort descending', () => {
        const sorted = bubbleSort(['c','a','b','a','b','c'], 'descending')
        expect(sorted).toStrictEqual(['c','c','b','b','a','a'])
    })
})

