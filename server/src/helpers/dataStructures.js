//@flow

// --- Linked List --- //
export class LinkedListNode {
    data: any; // any is appropriate, because we don't know what all will be linked
    next: any;
    constructor(data: any){
        this.data = data
        this.next = null
    }
}