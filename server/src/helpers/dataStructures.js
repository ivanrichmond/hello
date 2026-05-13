//@flow

// --- Linked List --- //
export class LinkedListNode {
    data: any; 
    next: LinkedListNode | null;
    constructor(data: any){
        this.data = data
        this.next = null
    }

    toString(): string {
        let result: string = ''
        let temp = this
        result += this.data
        while (temp !== null && temp !== undefined && temp.next) {
            result += String(temp.next.data)
            temp = temp?.next
        }
        return result
    }
}
