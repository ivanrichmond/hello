//@flow

// --- Linked List --- //
export class LinkedListNode {
    data: string; 
    next: LinkedListNode | null;
    constructor(data: string){
        this.data = data
        this.next = null
    }

    toString(): string {
        let result: string = ''
        let temp = this
        result += this.data
        while (temp !== null && temp !== undefined && temp.next) {
            result += temp.next.data
            temp = temp?.next
        }
        return result
    }
}