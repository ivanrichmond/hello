//@flow
import { LinkedListNode } from "./dataStructures";

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