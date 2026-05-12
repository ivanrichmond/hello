import { describe, test } from '@jest/globals'

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
})