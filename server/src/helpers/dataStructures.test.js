//@flow
import { BinaryTree, LinkedListNode } from "./dataStructures";

import before from "lodash/before";

describe('Linked List', () => {
    test('golden path', () => {
        const head = new LinkedListNode('a')
        // To keep Flow happy, we can't just assign head.next.next, because it will
        // complain that that might be null.  Below code is clearer anyway.
        const node2 = new LinkedListNode('b')
        head.next = node2
        const node3 = new LinkedListNode('c');
        node2.next = node3
        const result = head.toString()
        expect(result).toBe('abc')
    })

    test('only head', () => {
        const head = new LinkedListNode('a')
        const result = head.toString()
        expect(result).toBe('a')
    })
})

describe('Binary Tree', () => {
    test('golden path', () => {
        const tree = new BinaryTree()
        expect(tree.find(5)).toBeFalsy() // Tests no root condition
        tree.insert(5)
        tree.insert(2)
        tree.insert(1)
        tree.insert(3)
        tree.insert(4)
        expect(tree.insert(4)).toBeFalsy() // Tests insert existing value condition
        expect(tree.contains(2)).toBeTruthy() // Tests contains golden path
        expect(tree.find(5)?.data).toBe(5) // Tests find golden path
        expect(tree.find(6)?.data).toBeFalsy() // Tests not found condition
    })
})